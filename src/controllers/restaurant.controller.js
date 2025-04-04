import { catchAsyncError } from "../utils/catchAsyncError.js";
import { AppError } from "../middlewares/error.middleware.js";
import Restaurant from "../models/restaurant.model.js";



// get all restaurants
export const getAllRestaurants = catchAsyncError(async (req, res, next) => {

  const restaurants = await Restaurant.find();
  if (!restaurants) {
    return next(new AppError("No restaurants found", 404));
  }

  res.status(200).json({
    status: "success",
    results: restaurants.length,
    data: {
      restaurants,
    },
  });
});


// create restaurant
export const createRestaurant = catchAsyncError (async (req, res, next)=>{

  const { name, location, cuisine, capacity } = req.body;

  if (!name || !location || !cuisine || !capacity) {
    return next(new AppError("Please provide all required fields", 400));
  }

  const restaurant = await Restaurant.create({
    name,
    location,
    cuisine,
    capacity,
  });

  res.status(201).json({
    status: "success",
    data: {
      restaurant,
    },
  });
})

