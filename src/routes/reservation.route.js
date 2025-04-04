import { Router } from "express";
import {
  cancelReservation,
  getAllReservations,
} from "../controllers/reservation.controller.js";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", isAuthenticatedUser, getAllReservations);

router.delete("/:id", isAuthenticatedUser, cancelReservation);


export default router;