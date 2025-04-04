import { Router } from "express";
import { 
createReservation
}from "../controllers/reserve.controller.js" 
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";

const router = Router();


router.post("/", isAuthenticatedUser, createReservation);

export default router;