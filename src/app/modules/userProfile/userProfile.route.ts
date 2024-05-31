import express from "express";
import auth from "../../middleWare/auth";
import { USER_ROLE } from "../Auth/auth.constant";
import { UserProfileController } from "./userProfile.controller";

const router = express.Router();

router.get(
  "/profile",
  auth(USER_ROLE.admin, USER_ROLE.user),

  UserProfileController.GetUserProfile
);
router.put(
  "/profile",
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserProfileController.UpdateUserProfile
);

export const UserProfileRoutes = router;
