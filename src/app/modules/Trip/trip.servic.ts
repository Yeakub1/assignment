import { Prisma, PrismaClient, TravelBuddyRequest, Trip } from "@prisma/client";
import { IPaginationOption } from "../../Interface/pagination";
import { tripSearchAbleFields } from "./trip.constant";
import { ITripFilterRequest } from "./tripInterface";
import { paginatinHelpers } from "../../helpars/paginatinHelpers";

const prisma = new PrismaClient();

const createTrip = async (
  userId: string,
  destination: string,
  startDate: string,
  endDate: string,
  budget: number,
  activities: string[]
): Promise<Trip> => {
  const trip = await prisma.trip.create({
    data: {
      userId,
      destination,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      budget,
      activities,
    },
  });

  return trip;
};


const  getAllTripsFormDB = async (
  params: ITripFilterRequest,
  options: IPaginationOption
) => {
  const { limit, page, skip } = paginatinHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andCondition: Prisma.TripWhereInput[] = [];

  if (params.searchTerm) {
    andCondition.push({
      OR: tripSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }


  const whereConditon: Prisma.TripWhereInput = { AND: andCondition };

  const result = await prisma.trip.findMany({
    where: whereConditon,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.trip.count({
    where: whereConditon,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};



const sendTripTravelBuddy = async (
  tripId: string,
  userId: string
): Promise<TravelBuddyRequest> => {
  const request = await prisma.travelBuddyRequest.create({
    data: {
      tripId,
      userId,
      status: "PENDING",
    },
  });

  return request;
};

const getPotentialTravel = async (
  tripId: string
): Promise<TravelBuddyRequest[]> => {
  const potentialBuddies = await prisma.travelBuddyRequest.findMany({
    where: {
      tripId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return potentialBuddies;
};

const respondTripToTravelBuddy = async (
  buddyId: string,
  status: string
): Promise<TravelBuddyRequest | null> => {
  const updatedRequest = await prisma.travelBuddyRequest.update({
    where: {
      id: buddyId,
    },
    data: {
      status,
      updatedAt: new Date(),
    },
  });

  return updatedRequest;
};

export const tripServices = {
  createTrip,
  getAllTripsFormDB,
  sendTripTravelBuddy,
  getPotentialTravel,
  respondTripToTravelBuddy,
};
