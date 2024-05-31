import prisma from "../../shared/prism";

const GetTravelBuddyRequestDB = async (payload: any) => {
  console.log(payload);
  const result = await prisma.travelBuddy.findMany({
    where: {
      userId: payload,
    },
    include: {
      trip: {
        select: {
          destination: true,
          startDate: true,
          endDate: true,
          travelType: true,
          location: true,
        },
      },
    },
  });
  return result;
};
const CreateTravelBuddyRequestDB = async (payload: any) => {
  console.log(payload);
  const result = await prisma.travelBuddy.create({
    data: payload,
  });
  return result;
};

export const TravelBuddyRequestServices = {
  CreateTravelBuddyRequestDB,
  GetTravelBuddyRequestDB,
};
