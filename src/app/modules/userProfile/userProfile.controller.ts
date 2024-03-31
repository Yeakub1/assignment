import { Request, Response } from "express";
import { userProfileService } from "./userProfile.services";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";

const getUserProfileController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.user; 
    const userProfile = await userProfileService.getUserProfile(userId);

    if (!userProfile) {
      res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "User profile not found.",
      });
      return;
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile retrieved successfully",
      data: userProfile,
    });
  }
);

const updateUserProfile = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.user;
    const { name, email } = req.body;

    const updatedProfile = await userProfileService.updateUserProfile(
      userId,
      name,
      email
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile updated successfully",
      data: updatedProfile,
    });
  }
);

export const userProfileController = {
  getUserProfileController,
  updateUserProfile,
};
