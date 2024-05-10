import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { StatisticService } from "./statistics.service.js";

const getStatistic = catchAsync(async (req, res) => {
  const result = await StatisticService.getStatistic();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fetch successful",
    data: result,
  });
});

const getDailyBooking = catchAsync(async (req, res) => {
  const result = await StatisticService.getDailyBooking();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fetch successful",
    data: result,
  });
});

const latestTransaction = catchAsync(async (req, res) => {
  const result = await StatisticService.latestTransaction();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fetch successful",
    data: result,
  });
});

const getChartData = catchAsync(async (req, res) => {
  const result = await StatisticService.getChartData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fetch successful",
    data: result,
  });
});
const chartBoxProduct = catchAsync(async (req, res) => {
  const result = await StatisticService.chartBoxProduct();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fetch successful",
    data: result,
  });
});
const chartBoxMedicine = catchAsync(async (req, res) => {
  const result = await StatisticService.chartBoxMedicine();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fetch successful",
    data: result,
  });
});
const chartBoxTotalSold = catchAsync(async (req, res) => {
  const result = await StatisticService.chartBoxTotalSold();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fetch successful",
    data: result,
  });
});
const calculateTotalVisitsLast12Months = catchAsync(async (req, res) => {
  const result = await StatisticService.calculateTotalVisitsLast12Months();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Fetch successful",
    data: result,
  });
});

export const StatisticController = {
  getStatistic,
  getDailyBooking,
  latestTransaction,
  getChartData,
  chartBoxProduct,
  chartBoxMedicine,
  chartBoxTotalSold,
  calculateTotalVisitsLast12Months,
};
