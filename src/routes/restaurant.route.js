import { Router } from "express";
import {
  createRestaurant,
  getAllRestaurants,
} from "../controllers/restaurant.controller.js";
import  { isAuthenticatedUser } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/")
  .get(getAllRestaurants)
  .post(isAuthenticatedUser, createRestaurant);




export default router;