import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import hpp from "hpp";
import { errorHandler } from "./middlewares/error.middleware.js";
const app = express();

// basic security
app.use(helmet());
app.use(hpp());

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({ limit: "16kb", extended: true }));


app.use(cookieParser());
app.use(express.static("public"));


// Import routes
import  authRouter  from "./routes/user.route.js";



// route declarations
app.use("/api/v1/user", authRouter);



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