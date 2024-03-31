import { notFound } from './../../middleWare/notFound';
import { Request, RequestHandler, Response } from "express";
import { tripServices } from "./trip.servic";
import catchAsync from "../../shared/catchAsync";
import pick from "../../shared/pick";
import { tripFilterAbleFields } from "./trip.constant";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";

const createTrip = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.user;
    if (!userId) {
      res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Unauthorized User ID not found",
      });
      return;
    }

    const { destination, startDate, endDate, budget, activities } = req.body;

    const trip = await tripServices.createTrip(
      userId,
      destination,
      startDate,
      endDate,
      budget,
      activities
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Trip created successfully",
      data: trip,
    });
  }
);


const getTripsController: RequestHandler = catchAsync(async (req, res) => {
  const filter = pick(req.query, tripFilterAbleFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await tripServices.getAllTripsFormDB(filter, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Data Fetched Successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const sendTripRequest = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { tripId } = req.params;
    const { userId } = req.body;

    const request = await tripServices.sendTripTravelBuddy(tripId, userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Travel buddy request sent successfully",
      data: request,
    });
  }
);

const getPotentialTripBuddies = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { tripId } = req.params;
    const potentialBuddies = await tripServices.getPotentialTravel(tripId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Potential travel buddies retrieved successfully",
      data: potentialBuddies,
    });
  }
);

const respondToBuddyRequestController = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { buddyId } = req.params;
    const { status } = req.body;

    const updatedRequest = await tripServices.respondTripToTravelBuddy(
      buddyId,
      status
    );

    if (!updatedRequest) {
      res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Travel buddy request not found.",
      });
      return;
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Travel buddy request responded successfully",
      data: updatedRequest,
    });
  }
);

export const tripController = {
  createTrip,
  getTripsController,
  sendTripRequest,
  getPotentialTripBuddies,
  respondToBuddyRequestController,
};
