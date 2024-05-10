import express from "express";
import cors from "cors";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middleware/globalErrorHandler.js";
import routers from "./app/routers/index.js";

const app = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// access static file
app.use(express.static("src/uploads"));
app.use("/images", express.static("images"));
app.use("/news", express.static("news"));
app.use("/events", express.static("events"));
app.use("/banners", express.static("banners"));

app.use("/api/v1/", routers);

app.get("/", (req, res) => {
  res.send("Welcome to test route");
});

app.use(globalErrorHandler);

app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
