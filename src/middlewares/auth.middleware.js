import jwt from "jsonwebtoken";
import { AppError } from "./error.middleware.js";
import  User  from "../models/user.model.js";
import { catchAsyncError } from "../utils/catchAsyncError.js"


// Middleware to check if the user is authenticated
export const isAuthenticatedUser = catchAsyncError(async (req, res, next)=> {
  const { token } = req.cookies;
  if (!token) {
    throw new AppError("Please login to access this resource", 401);
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id).select("-password");
  next();
})

