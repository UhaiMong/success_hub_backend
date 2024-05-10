import express from "express";
import { StatisticController } from "./statistics.controller.js";

const router = express.Router();

router.get("/", StatisticController.getStatistic);
router.get("/daily-booking", StatisticController.getDailyBooking);
router.get("/latest-transaction", StatisticController.latestTransaction);
router.get("/getChartData", StatisticController.getChartData);
router.get("/getChartBoxProduct", StatisticController.chartBoxProduct);
router.get("/getChartBoxMedicine", StatisticController.chartBoxMedicine);
router.get("/totalSold", StatisticController.chartBoxTotalSold);
router.get(
  "/visitedUser",
  StatisticController.calculateTotalVisitsLast12Months
);

export const StatisticRoutes = router;
