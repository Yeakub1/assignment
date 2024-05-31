import express from "express";
import { TripController } from "./trip.controller";
import { TripValidation } from "./trip.validation";
import auth from "../../middleWare/auth";
import { USER_ROLE } from "../Auth/auth.constant";
import zodValidation from "../../shared/zodValidation";

const router = express.Router();

router.post(
  "/trips",
  auth(USER_ROLE.user),
  zodValidation(TripValidation.TripSchema),
  TripController.CreateTrip
);
router.get("/trips", TripController.GetTrips);
router.get(
  "/tripsForAdmin",
  auth(USER_ROLE.admin),
  TripController.getAllTripeForAdmin
);
router.get("/trips/:id", TripController.GetSingleTrips);
router.put(
  "/trips/update/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  TripController.UpdateTrip
);
router.delete(
  "/trips/delete/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  TripController.DeleteTrip
);
router.get("/tripsPosted", auth(USER_ROLE.user), TripController.GetPostedTrips);

export const TripsRoutes = router;
