import Reservation from "../models/reservation.model.js";
import Restaurant from "../models/restaurant.model.js";
import { AppError } from "../middlewares/error.middleware.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";

export const createReservation = catchAsyncError(async (req, res, next) => {
  
  console.log("Creating reservation...")
  console.log(req.body)
  console.log(req.user)
  const userId = req.user._id; 
  const { restaurantId, date, time, numberOfGuests } = req.body;

  if(!restaurantId || !date || !time || !numberOfGuests) {
    return next(new AppError("Please provide all required fields", 400));
  }

  const restaurant = await Restaurant.findById(restaurantId);

  if (!restaurant) {
    return next(new AppError("Restaurant not found", 404));
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
