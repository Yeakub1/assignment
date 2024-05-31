import express from "express";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import { USER_ROLE } from "./auth.constant";
import auth from "../../middleWare/auth";
import zodValidation from "../../shared/zodValidation";

const router = express.Router();

router.post(
  "/register",
  zodValidation(AuthValidation.RegisterValidation),
  AuthController.createUser
);
router.post(
  "/login",
  zodValidation(AuthValidation.loginValidation),
  AuthController.loginUser
);
router.put(
  "/changePassword",
  auth(USER_ROLE.admin, USER_ROLE.user),
  zodValidation(AuthValidation.changePassword),
  AuthController.ChangePassword
);

export const AuthRoutes = router;
