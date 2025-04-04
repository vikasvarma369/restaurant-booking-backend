import Reservation from "../models/reservation.model.js";
import Restaurant from "../models/restaurant.model.js";
import { AppError } from "../middlewares/error.middleware.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";


export const cancelReservation = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id; 

  const reservation = await Reservation.findById({
    _id: id,
    user: userId,
  });

  if (!reservation) {
    return next(new AppError("Reservation not found", 404));
  }

  if (reservation.user.toString() !== userId.toString()) {
    return next(new AppError("You are not authorized to cancel this reservation", 403));
  }

  reservation.status = "cancelled";
  await reservation.save();

  res.status(200).json({
    status: true,
    message: "Reservation cancelled successfully",
    data: {
      reservation,
    },
  });
});



export const getAllReservations = catchAsyncError(async (req, res, next) => {

  const userId = req.user._id;

  const userAllReservations = await Reservation.find({ user: userId })
    .populate("restaurant")
    .populate("user")
    .sort({ createdAt: -1 }
  );

  if (!userAllReservations) {
    return next(new AppError("No reservations found", 404));
  }
  res.status(200).json({
    status: true,
    message: "All reservations fetched successfully",
    data: {
      reservations: userAllReservations,
    },
  });
});




