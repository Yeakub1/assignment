import express from "express";
import { TravelBuddyController } from "./travelBuddy.controller";

const router = express.Router();

router.get("/:tripId", TravelBuddyController.GetTravelBuddies);

router.put("/:buddyId/respond", TravelBuddyController.UpdateTravelBuddy);

export const TravelBuddyRoutes = router;
