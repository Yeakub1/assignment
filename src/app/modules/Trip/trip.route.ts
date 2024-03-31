import express from "express";
import { tripController } from "./trip.controller";
import auth from "../../middleWare/auth";
import validateRequest from "../../middleWare/validateRequest";
import { tripValidation } from "./trip.validation";

const router = express.Router();

router.post(
  "/trips",
  auth(),
  validateRequest(tripValidation.createTripValidation),
  tripController.createTrip
);
router.get("/trips", tripController.getTripsController);

router.post("/trip/:tripId/request", auth(), tripController.sendTripRequest);

router.get(
  "/travel-buddies/:tripId",
  auth(),
  tripController.getPotentialTripBuddies
);

router.put(
  "/travel-buddies/:buddyId/respond",
  auth(),
  tripController.respondToBuddyRequestController
);
export const tripRoutes = router;
