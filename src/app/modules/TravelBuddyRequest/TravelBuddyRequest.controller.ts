import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import Config from "../../Config";
import prisma from "../../shared/prism";
import { TravelBuddyRequestServices } from "./TravelBuddyRequest.servic";
import sendResponse from "../../shared/sendResponse";
import { jswHelpers } from "../../helpars/jwtHelpers";
import httpStatus from "http-status";

const CreateTravelBuddyRequest = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;

    const tripId = req?.params?.tripId;
    const body = req?.body;

    if (!token) {
      throw new Error("Unauthorized Access");
    }

    const { email } = jswHelpers.verifyToken(
      token,
      Config.jwt.jwt_secret as string
    );

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new Error("Unauthorized Access");
    }
    const { userStatus } = user;

    if (userStatus !== "Activate") {
      throw new Error("Your id is blocked");
    }
    body.tripId = tripId;

    const result = await TravelBuddyRequestServices.CreateTravelBuddyRequestDB(
      body
    );
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Travel buddy request sent successfully",
      data: result,
    });
  }
);

const GetTravelBuddyRequest = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;

    if (!token) {
      throw new Error("Unauthorized Access");
    }

    const { email } = jswHelpers.verifyToken(
      token,
      Config.jwt.jwt_secret as string
    );

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new Error("Unauthorized Access");
    }
    const { userStatus } = user;

    if (userStatus !== "Activate") {
      throw new Error("Your id is blocked");
    }

    const result = await TravelBuddyRequestServices.GetTravelBuddyRequestDB(user?.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Travel buddy request data retrieved successfully",
      data: result,
    });
  }
);



export const TravelBuddyRequestController = {
  CreateTravelBuddyRequest,
  GetTravelBuddyRequest,
};
