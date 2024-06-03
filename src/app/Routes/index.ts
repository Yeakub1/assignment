import express from "express";
import { UsersRoutes } from "../modules/User/user.route";
import { TripsRoutes } from "../modules/Trip/trip.route";
import { UserProfileRoutes } from "../modules/userProfile/userProfile.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { TravelBuddyRoutes } from "../modules/TravelBuddy/travelBuddy.route";
import { TravelBuddyRequestRoutes } from "../modules/TravelBuddyRequest/TravelBuddyRequest.route";


const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UsersRoutes,
  },
  {
    path: "/",
    route: TripsRoutes,
  },
  {
    path: "/",
    route: UserProfileRoutes,
  },
  {
    path: "/travel-buddies",
    route: TravelBuddyRoutes,
  },
  {
    path: "/trip",
    route: TravelBuddyRequestRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
