import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import Config from "../../Config";
import prisma from "../../shared/prism";
import { UserProfileServices } from "./userProfile.services";
import sendResponse from "../../shared/sendResponse";
import { jswHelpers } from "../../helpars/jwtHelpers";
import httpStatus from "http-status";

const GetUserProfile = catchAsync(async (req: Request, res: Response) => {
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
  const result = await UserProfileServices.GetUserProfileDB(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const UpdateUserProfile = catchAsync(async (req: Request, res: Response) => {
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
  const result = await UserProfileServices.UpdateUserProfileDB(
    email,
    req?.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});

export const UserProfileController = {
  GetUserProfile,
  UpdateUserProfile,
};
