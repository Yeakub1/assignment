import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import Config from "../../Config";
import { jswHelpers } from "../../helpars/jwtHelpers";
import prisma from "../../shared/prism";
import { TravelBuddyServices } from "./travelBuddy.servic";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";


const GetTravelBuddies = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const tripId = req?.params?.tripId;

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

  const result = await TravelBuddyServices.GetTravelBuddiesDB(tripId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Potential travel buddies retrieved successfully",
    data: result,
  });
});

const UpdateTravelBuddy = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const id = req?.params?.buddyId;

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

  const result = await TravelBuddyServices.UpdateTravelBuddiesDB(id, req?.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Travel buddy request responded successfully",
    data: result,
  });
});

export const TravelBuddyController = {
  GetTravelBuddies,
  UpdateTravelBuddy,
};
