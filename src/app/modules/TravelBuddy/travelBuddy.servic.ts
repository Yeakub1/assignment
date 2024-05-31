import prisma from "../../shared/prism";

const GetTravelBuddiesDB = async (tripId: string) => {
  const result = await prisma.travelBuddy.findMany({
    where: { tripId: tripId },
    select: {
      id: true,
      tripId: true,
      userId: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      user: true,
    },
  });

  return result;
};

const UpdateTravelBuddiesDB = async (id: string, payload: any) => {
  const result = await prisma.travelBuddy.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

export const TravelBuddyServices = {
  GetTravelBuddiesDB,
  UpdateTravelBuddiesDB,
};
