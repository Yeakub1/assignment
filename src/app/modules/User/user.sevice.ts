import bcrypt from "bcrypt";
import { createToken } from "./user.utils";
import Config from "../../Config";
import prisma from "../../shared/prism";
import { User, UserProfile } from "@prisma/client";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";


const createUser = async (payload: User, profile: UserProfile) => {
  const isUserExits = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isUserExits) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "This user is alrady registered"
    );
  }

  const hashedPassword = await bcrypt.hash(payload.password, 12);
  const userData = {
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
  };

  const result = await prisma.user.create({
    data: userData,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  await prisma.userProfile.create({
    data: { userId: result.id, bio: profile.bio, age: profile.age },
  });

  return result;
};



const loginUser = async (email: string, password: string): Promise<any> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password.");
  }

  const jwtPayload = {
    name: user.name,
    email: user.email,
    userId: user.id,
  };

  const token = createToken(
    jwtPayload,
    Config.jwt.jwt_secret as string,
    Config.jwt.expires_in as string
  );
  const { password: _, ...userData } = user;

  return { ...userData, token };
};


export const userServices = {
  createUser,
  loginUser,
};
