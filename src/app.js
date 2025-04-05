import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import { xss } from "express-xss-sanitizer";
import { rateLimit } from "express-rate-limit";
import { errorHandler } from "./middlewares/error.middleware.js";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 100, 
  message: "Too may requests from this IP, please try later.",
});


const app = express();

app.use(helmet());

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({ limit: "16kb", extended: true }));


app.use(cookieParser());
app.use(express.static("public"));


app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use("/api", limiter);

// Import routes
import  authRouter  from "./routes/user.route.js";
import restaurantRouter from "./routes/restaurant.route.js";
import createReserveRouter from "./routes/reserve.route.js";
import reservationRouter from "./routes/reservation.route.js";


// route declarations
app.use("/api/v1/user", authRouter);
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/reserve", createReserveRouter);
app.use("/api/v1/reservations", reservationRouter);


// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});



// Global error handler
app.use(errorHandler);

export { app };