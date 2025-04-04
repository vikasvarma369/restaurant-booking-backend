import { catchAsyncError } from "../utils/catchAsyncError.js";
import User from "../models/user.model.js";
import { AppError } from "../middlewares/error.middleware.js"



const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
}


export const registerUser = catchAsyncError( async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
      return next(new AppError("Please provide all fields", 400));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if(existingUser) {
      return next(new AppError("User already exists", 400));
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (!user) {
      return next(new AppError("User registration failed, please try again", 400));
    }

    const token = user.generateJwtToken();
    user.password = undefined;

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user
    });
}
)


export const loginUser = catchAsyncError(async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
      return next(new AppError("Please provide all fields", 400));
    }

    // Check if user exists
    const user = await User.findOne({ email }).select("+password");

    if(!user) {
      return next(new AppError("Invalid credentials", 401));
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password);

    if(!isMatch) {
      return next(new AppError("Invalid credentials", 401));
    }
    
    user.password = undefined; // Remove password from response

    const token = user.generateJwtToken();

    res.cookie("token", token, cookieOptions);


    res.status(200).json({
        success: true,
        message: 'User loggedin successfully',
        user
    });
})


export const logoutUser = catchAsyncError(async (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  })

  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});