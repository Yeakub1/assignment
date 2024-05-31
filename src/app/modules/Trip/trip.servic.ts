import { paginatinHelpers } from "../../helpars/paginatinHelpers";
import prisma from "../../shared/prism";

const CreateTripeDB = async (email: string, payload: any) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

  payload.userId = user?.id;
  const result = await prisma.trip.create({ data: payload });
  return result;
};

const GetTripsDB = async (searchTerm: any, params: any, options: any) => {
  const { ...filterData } = params;
  const { page, limit, skip } = paginatinHelpers.calculatePagination(options);

  console.log(page);
  let whereConditions: any = { AND: [], status: true };

  if (searchTerm) {
    const orConditions = [];
    if (typeof searchTerm === "string" && searchTerm.trim().length > 0) {
      orConditions.push({
        destination: { contains: searchTerm, mode: "insensitive" },
      });
      orConditions.push({
        startDate: { contains: searchTerm, mode: "insensitive" },
      });
      orConditions.push({
        endDate: { contains: searchTerm, mode: "insensitive" },
      });
      orConditions.push({
        travelType: { contains: searchTerm, mode: "insensitive" },
      });
      orConditions.push({
        description: { contains: searchTerm, mode: "insensitive" },
      });
    }

    if (orConditions.length > 0) {
      whereConditions.AND.push({ OR: orConditions });
    }
  }

  if (filterData) {
    const andConditions = [];

    if (filterData.travelType) {
      andConditions.push({
        travelType: { equals: filterData.travelType },
      });
    }
    if (filterData.destination) {
      andConditions.push({
        destination: { contains: filterData.destination, mode: "insensitive" },
      });
    }

    if (filterData.startDate) {
      andConditions.push({
        startDate: { equals: filterData.startDate },
      });
    }

    if (filterData.endDate) {
      andConditions.push({
        endDate: { equals: filterData.endDate },
      });
    }
    if (andConditions.length > 0) {
      whereConditions.AND.push(...andConditions);
    }
  }

  const result = await prisma.trip.findMany({
    where: whereConditions,
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
    where: whereConditions,
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


const getSingleTripeDB = async (id: string) => {
  const whereCondition: any = {
    id,
    status: true,
  };
  const result = await prisma.trip.findUnique({
    where: whereCondition,
  });
  return result;
};

const UpdateTripeDB = async (id: string, data: any) => {
  console.log(id, "id");
  const result = await prisma.trip.update({
    where: { id },
    data: data,
  });
  return result;
};

const DeleteTripeDB = async (id: string) => {
  console.log(id, "id");

  const data: any = {
    status: false,
  };
  const result = await prisma.trip.update({
    where: { id },
    data: data,
  });
  return result;
};


const getPostedTripeDB = async (id: string) => {
  const whereCondition: any = {
    userId: id,
    status: true,
  };
  try {
    const result = await prisma.trip.findMany({
      where: whereCondition,
    });
    return result;
  } catch (error) {
    return error;
  }
};

const getAllTripeForAdminDB = async () => {
  const whereCondition: any = {
    status: true,
  };
  try {
    const result = await prisma.trip.findMany({
      where: whereCondition,
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const TripServices = {
  CreateTripeDB,
  GetTripsDB,
  getSingleTripeDB,
  getPostedTripeDB,
  UpdateTripeDB,
  DeleteTripeDB,
  getAllTripeForAdminDB,
};
