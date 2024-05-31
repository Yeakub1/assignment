import express from "express";
import auth from "../../middleWare/auth";
import { USER_ROLE } from "../Auth/auth.constant";
import { UsersController } from "./user.controller";

const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  UsersController.GeTAllUsers
);
router.put("/:id", auth(USER_ROLE.admin), UsersController.UpdateUserStatus);

export const UsersRoutes = router;
