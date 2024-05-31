import { z } from "zod";

const RegisterValidation = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password is required" }),
});
const loginValidation = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password is required" }),
});
const changePassword = z.object({
  oldPassword: z.string({ required_error: "Old password is required" }),
  newPassword: z.string({ required_error: "New password is required" }),
});
export const AuthValidation = {
  RegisterValidation,
  loginValidation,
  changePassword,
};
