import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middleWare/validateRequest";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidation.UserSchema),
  userController.createUser
);
router.post(
  "/login",
  validateRequest(userValidation.loginSchema),
  userController.loginUser
);

export const userRoutes = router;
