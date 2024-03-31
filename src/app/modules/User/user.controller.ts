import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { userServices } from "./user.sevice";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userdata = req.body;

  const result = await userServices.createUser(userdata, userdata.profile);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User Created Successfully!",
    data: result,
  });
});

const loginUser = catchAsync(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await userServices.loginUser(email, password);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User logged in successfully",
      data: user,
    });
  }
);

export const userController = {
  createUser,
  loginUser,
};
