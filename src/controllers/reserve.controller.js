import Reservation from "../models/reservation.model.js";
import Restaurant from "../models/restaurant.model.js";
import { AppError } from "../middlewares/error.middleware.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";

export const createReservation = catchAsyncError(async (req, res, next) => {
  
  const userId = req.user._id; 
  const { restaurantId, date, time, numberOfGuests } = req.body;

  if(!restaurantId || !date || !time || !numberOfGuests) {
    return next(new AppError("Please provide all required fields", 400));
  }

  const restaurant = await Restaurant.findById(restaurantId);

  if (!restaurant) {
    return next(new AppError("Restaurant not found", 404));
  }

  const allExistingReservations = await Reservation.find({
    restaurant: restaurantId,
    date,
    time,
    status: "confirmed",
  });

  const totalReserveTables = allExistingReservations.reduce((acc, reservation) => {
    return acc + reservation.numberOfGuests;
  }, 0);

  if ( numberOfGuests > restaurant.capacity || (totalReserveTables + numberOfGuests) > restaurant.capacity) {
    return next(new AppError("Sorry, not enough seats available at this time.", 400));
  }

  const reservation = await Reservation.create({
    restaurant: restaurantId,
    user: userId,
    date,
    time,
    numberOfGuests,
  });

  res.status(201).json({
    status: true,
    message: "Table reserved successfully",
    data: {
      reservation,
    },
  })

});
