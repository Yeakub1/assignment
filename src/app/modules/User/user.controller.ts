import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import Config from "../../Config";
import prisma from "../../shared/prism";
import { UsersServices } from "./user.sevice";
import sendResponse from "../../shared/sendResponse";
import { jswHelpers } from "../../helpars/jwtHelpers";
import httpStatus from "http-status";


const GeTAllUsers = catchAsync(async (req: Request, res: Response) => {
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

  const result = await UsersServices.GetAllUsersDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const UpdateUserStatus = catchAsync(async (req: Request, res: Response) => {
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

  const result = await UsersServices.UpdateUserStatusDB(
    req?.params?.id,
    req?.body
  );
  sendResponse(res, {
    statusCode: httpStatus.NON_AUTHORITATIVE_INFORMATION,
    success: true,
    message: "User Status updated successfully",
    data: result,
  });
});

export const UsersController = {
  GeTAllUsers,
  UpdateUserStatus,
};
