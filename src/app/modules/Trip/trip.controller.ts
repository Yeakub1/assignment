import { Request, Response } from "express";
import { userFilterableFields } from "./trip.constant";
import catchAsync from "../../shared/catchAsync";
import { jswHelpers } from "../../helpars/jwtHelpers";
import Config from "../../Config";
import prisma from "../../shared/prism";
import { TripServices } from "./trip.servic";
import sendResponse from "../../shared/sendResponse";
import pick from "../../shared/pick";
import httpStatus from "http-status";

const CreateTrip = catchAsync(async (req: Request, res: Response) => {
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
  const { userStatus, password } = user;

  if (userStatus !== "Activate") {
    throw new Error("Your id is blocked");
  }
  const result = await TripServices.CreateTripeDB(email, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Trip created successfully",
    data: result,
  });
});

const GetTrips = catchAsync(async (req: Request, res: Response) => {
  const { searchTerm } = req?.query;
  const filters = pick(req?.query, userFilterableFields);
  const options = pick(req?.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await TripServices.GetTripsDB(searchTerm, filters, options);
  console.log(req?.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trips retrieved successfully",
    data: result,
  });
});

const GetSingleTrips = catchAsync(async (req: Request, res: Response) => {
  const result = await TripServices.getSingleTripeDB(req?.params?.id);
  console.log("hello");

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trips retrieved successfully",
    data: result,
  });
});
const GetPostedTrips = catchAsync(async (req: Request, res: Response) => {
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

  const result = await TripServices.getPostedTripeDB(user?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Posted Trips retrieved successfully",
    data: result,
  });
});

const UpdateTrip = catchAsync(async (req: Request, res: Response) => {
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
  const result = await TripServices.UpdateTripeDB(req?.params?.id, req?.body);

  sendResponse(res, {
    statusCode: httpStatus.ACCEPTED,
    success: true,
    message: "Trip  update successfully",
    data: result,
  });
});
const DeleteTrip = catchAsync(async (req: Request, res: Response) => {
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
  const result = await TripServices.DeleteTripeDB(req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.NON_AUTHORITATIVE_INFORMATION,
    success: true,
    message: "Trips delete successfully",
    data: result,
  });
});
const getAllTripeForAdmin = catchAsync(async (req: Request, res: Response) => {
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
  const result = await TripServices.getAllTripeForAdminDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trips retrieved  successfully",
    data: result,
  });
});
export const TripController = {
  CreateTrip,
  GetTrips,
  GetSingleTrips,
  GetPostedTrips,
  UpdateTrip,
  DeleteTrip,
  getAllTripeForAdmin,
};
