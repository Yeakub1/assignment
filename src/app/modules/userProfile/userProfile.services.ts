import prisma from "../../shared/prism";
import { TUser } from "./user.interface";

const getUserProfile = async (
  userId: string | undefined
): Promise<TUser | null> => {
  if (!userId) {
    return null; 
  }

  const userProfile = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return userProfile;
};

const updateUserProfile = async (
  userId: string,
  name: string,
  email: string
): Promise<TUser | null> => {
  try {
    const updatedProfile = await prisma.user.update({
      where: { id: userId },
      data: { name, email },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return updatedProfile;
  } catch (error) {
    return null;
  }
};

export const userProfileService = {
  getUserProfile,
  updateUserProfile,
};
