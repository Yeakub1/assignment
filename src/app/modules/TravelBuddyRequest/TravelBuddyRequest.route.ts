import express from "express";
import auth from "../../middleWare/auth";
import { USER_ROLE } from "../Auth/auth.constant";
import { TravelBuddyRequestController } from "./TravelBuddyRequest.controller";
import zodValidation from "../../shared/zodValidation";
import { TravelBuddyRequestValidation } from "./TravelBuddyRequest.validation";


const router = express.Router();
router.post(
  "/:tripId/request",
  auth(USER_ROLE.user),
  zodValidation(TravelBuddyRequestValidation.RequestValidation),
  TravelBuddyRequestController.CreateTravelBuddyRequest
);
router.get(
  "/request",
  auth(USER_ROLE.user),

  TravelBuddyRequestController.GetTravelBuddyRequest
);


export const TravelBuddyRequestRoutes = router;
