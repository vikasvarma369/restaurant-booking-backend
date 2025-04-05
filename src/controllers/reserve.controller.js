import Reservation from "../models/reservation.model.js";
import Restaurant from "../models/restaurant.model.js";
import { AppError } from "../middlewares/error.middleware.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import { sendEmail } from "../utils/email.utils.js";

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

  // check duplicate reservation
  const existingReservation = await Reservation.findOne({
    restaurant: restaurantId,
    user: userId,
    date,
    time,
  });

  if (existingReservation) {
    return next(new AppError("You already have a reservation at this time", 400));
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

  if (!reservation) {
    return next(new AppError("Failed to create reservation", 500));
  }

  // Send email notification to the user 
  const sendEmailResponse = await sendEmail({
    userName: req.user.name,
    userEmail: req.user.email,
    restaurantName: restaurant.name,
    restaurantLocation: restaurant.location,
    date,
    time,
    numberOfGuests,
  })

  if (!sendEmailResponse.success) {
    return next(new AppError("Failed to send reservation confirmation email", 500));
  }

  res.status(201).json({
    status: true,
    message: "Table reserved successfully",
    data: {
      reservation,
    },
  })

});
