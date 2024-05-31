import { Request, Response } from "express";
import bcrypt from "bcrypt";
import catchAsync from "../../shared/catchAsync";
import prisma from "../../shared/prism";
import Config from "../../Config";
import { AuthServices } from "./auth.servic";
import sendResponse from "../../shared/sendResponse";
import { jswHelpers } from "../../helpars/jwtHelpers";
import httpStatus from "http-status";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.createUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User Created successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUserDB(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const ChangePassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const { oldPassword, newPassword } = req?.body;

  if (!token) {
    throw new Error("Unauthorized Access");
  }

  const { email, id } = jswHelpers.verifyToken(
    token,
    Config.jwt.jwt_secret as string
  );

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new Error("Unauthorized Access");
  }
  const { userStatus, password } = user;

  if (userStatus !== "Activate") {
    throw new Error("Your id is blocked");
  }
  const match = await bcrypt.compare(oldPassword, password);

  if (!match) {
    throw new Error("wrong password");
  }
  const result = await AuthServices.ChangePasswordDB(id, newPassword);

  sendResponse(res, {
    statusCode: httpStatus.NON_AUTHORITATIVE_INFORMATION,
    success: true,
    message: "User Password Change successfully",
    data: result,
  });
});

export const AuthController = {
  createUser,
  loginUser,
  ChangePassword,
};
