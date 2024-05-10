import ApiError from "../../../errors/ApiError.js";
import { BikeRent } from "../bike-rent/bike.model.js";
import { Parcel } from "../parcel/parcel.model.js";
import moment from "moment";
import httpStatus from "http-status";
import { MedicineOrder } from "../medicineOrder/medicineOrder.model.js";
import { MediatorOrder } from "../mediatorOrder/mediatorOrder.model.js";
import { User } from "../users/user.model.js";
import { Mediator } from "../mediator/product/product.model.js";

const getStatistic = async () => {
  const bikeRentCount = await BikeRent.countDocuments();
  const parcelCount = await Parcel.countDocuments();
  const product = await MediatorOrder.countDocuments();

  const data = [
    { name: "Bike Rent", value: bikeRentCount, color: "#0088FE" },
    { name: "Parcel", value: parcelCount, color: "#00C49F" },
    { name: "Product", value: product, color: "#FF8042" },
  ];

  return data;
};
const getDailyBooking = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const bikeRentData = await BikeRent.aggregate([
    {
      $match: {
        createdAt: { $gte: sevenDaysAgo },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        bike_rent: { $sum: "$total_amount" },
      },
    },
  ]);

  const parcelData = await Parcel.aggregate([
    {
      $match: {
        createdAt: { $gte: sevenDaysAgo },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        parcel: { $sum: "$total_amount" },
      },
    },
  ]);
  const mediatorData = await MediatorOrder.aggregate([
    {
      $match: {
        createdAt: { $gte: sevenDaysAgo },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        product: { $sum: "$totalPrice" },
      },
    },
  ]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const combinedData = {};

  daysOfWeek.forEach((day) => {
    combinedData[day] = {
      name: day,
      bike_rent: 0,
      parcel: 0,
      medicine: 0,
      product: 0,
    };
  });

  function mergeData(sourceData, sourceKey) {
    sourceData.forEach((item) => {
      const day = moment(item._id).format("dddd").slice(0, 3);
      const totalAmount = item[sourceKey];
      if (combinedData[day]) {
        combinedData[day][sourceKey] = totalAmount;
      }
    });
  }

  mergeData(bikeRentData, "bike_rent");
  mergeData(parcelData, "parcel");
  mergeData(mediatorData, "product");

  const data = Object.values(combinedData);

  return data;
};

const latestTransaction = async () => {
  try {
    const lastTwoBikeTransaction = await BikeRent.find()
      .sort({ createdAt: -1 })
      .limit(2)
      .populate("user");
    const lastTwoParcelTransaction = await Parcel.find()
      .sort({ createdAt: -1 })
      .limit(2)
      .populate("user");
    const lastTwoMedicineTransaction = await MedicineOrder.find()
      .sort({ createdAt: -1 })
      .limit(2)
      .populate("user");
    const lastTwoProductTransaction = await MediatorOrder.find()
      .sort({ createdAt: -1 })
      .limit(2)
      .populate("user");

    const bikeTransactionData = lastTwoBikeTransaction.map((transaction) => ({
      id: transaction._id,
      email: transaction.user.email,
      photoURL: transaction.user.photoURL,
      name: transaction.user.name,
      total_amount: transaction.total_amount,
      transaction: "bike",
    }));

    const parcelTransactionData = lastTwoParcelTransaction.map(
      (transaction) => ({
        id: transaction._id,
        email: transaction.user.email,
        photoURL: transaction.user.photoURL,
        name: transaction.user.name,
        total_amount: transaction.total_amount,
        transaction: "parcel",
      })
    );

    const medicineTransactionData = lastTwoMedicineTransaction.map(
      (transaction) => ({
        id: transaction._id,
        email: transaction.user.email,
        photoURL: transaction.user.photoURL,
        name: transaction.user.name,
        total_amount: transaction.totalPrice,
        transaction: "medicine",
      })
    );
    const productTransactionData = lastTwoProductTransaction.map(
      (transaction) => ({
        id: transaction._id,
        email: transaction.user.email,
        photoURL: transaction.user.photoURL,
        name: transaction.user.name,
        total_amount: transaction.totalPrice,
        transaction: "product",
      })
    );

    const combinedTransactionData = bikeTransactionData
      .concat(parcelTransactionData)
      .concat(medicineTransactionData)
      .concat(productTransactionData);

    return combinedTransactionData;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST);
  }
};

const getChartData = async () => {
  const totalUsers = await User.countDocuments();

  const chartData = [
    { name: "Sun", users: 0 },
    { name: "Mon", users: 0 },
    { name: "Tue", users: 0 },
    { name: "Wed", users: 0 },
    { name: "Thu", users: 0 },
    { name: "Fri", users: 0 },
    { name: "Sat", users: 0 },
  ];

  const usersByDay = await User.aggregate([
    {
      $group: {
        _id: { $dayOfWeek: "$createdAt" },
        count: { $sum: 1 },
      },
    },
  ]);

  usersByDay.forEach((day) => {
    const dayOfWeek = day._id === 1 ? 7 : day._id - 1;
    chartData[dayOfWeek - 1].users = day.count;
  });

  const percentage =
    (totalUsers / chartData.reduce((sum, day) => sum + day.users, 0)) * 100;

  const chartBoxUser = {
    color: "#8884d8",
    icon: "/userIcon.svg",
    title: "Total Users",
    number: totalUsers.toString(),
    dataKey: "users",
    percentage: Math.round(percentage),
    chartData,
  };
  return chartBoxUser;
};

const chartBoxProduct = async () => {
  const totalProducts = await Mediator.countDocuments();

  const chartData = [
    { name: "Sun", products: 0 },
    { name: "Mon", products: 0 },
    { name: "Tue", products: 0 },
    { name: "Wed", products: 0 },
    { name: "Thu", products: 0 },
    { name: "Fri", products: 0 },
    { name: "Sat", products: 0 },
  ];

  const usersByDay = await Mediator.aggregate([
    {
      $group: {
        _id: { $dayOfWeek: "$createdAt" },
        count: { $sum: 1 },
      },
    },
  ]);

  usersByDay.forEach((day) => {
    const dayOfWeek = day._id === 1 ? 7 : day._id - 1;
    chartData[dayOfWeek - 1].products = day.count;
  });

  const percentage =
    (totalProducts / chartData.reduce((sum, day) => sum + day.products, 0)) *
    100;

  const chartBoxUser = {
    color: "skyblue",
    icon: "/productIcon.svg",
    title: "Total Products",
    number: totalProducts.toString(),
    dataKey: "products",
    percentage: Math.round(percentage),
    chartData,
  };
  return chartBoxUser;
};
const chartBoxMedicine = async () => {
  const totalMedicines = await Medicine.countDocuments();

  const chartData = [
    { name: "Sun", medicines: 0 },
    { name: "Mon", medicines: 0 },
    { name: "Tue", medicines: 0 },
    { name: "Wed", medicines: 0 },
    { name: "Thu", medicines: 0 },
    { name: "Fri", medicines: 0 },
    { name: "Sat", medicines: 0 },
  ];

  const usersByDay = await Medicine.aggregate([
    {
      $group: {
        _id: { $dayOfWeek: "$createdAt" },
        count: { $sum: 1 },
      },
    },
  ]);

  usersByDay.forEach((day) => {
    const dayOfWeek = day._id === 1 ? 7 : day._id - 1;
    chartData[dayOfWeek - 1].medicines = day.count;
  });

  const percentage =
    (totalMedicines / chartData.reduce((sum, day) => sum + day.medicines, 0)) *
    100;

  const chartBoxUser = {
    color: "teal",
    icon: "/revenueIcon.svg",
    title: "Total Medicines",
    number: totalMedicines.toString(),
    dataKey: "medicines",
    percentage: Math.round(percentage),
    chartData,
  };
  return chartBoxUser;
};
const chartBoxTotalSold = async () => {
  const result = await MedicineOrder.aggregate([
    { $group: { _id: null, total: { $sum: "$totalPrice" } } },
  ]);

  const medicineTotalAmount = result[0]?.total;

  const mediatorResult = await MediatorOrder.aggregate([
    { $group: { _id: null, total: { $sum: "$totalPrice" } } },
  ]);

  const mediatorTotalAmount = mediatorResult[0]?.total;

  const bikeRentResult = await BikeRent.aggregate([
    { $group: { _id: null, total: { $sum: "$total_amount" } } },
  ]);

  const bikeRentTotalAmount = bikeRentResult[0]?.total;

  const parcelResult = await Parcel.aggregate([
    { $group: { _id: null, total: { $sum: "$total_amount" } } },
  ]);

  const parcelTotalAmount = parcelResult[0]?.total;

  // Calculate the sum of total amounts from all collections
  const totalAmountSum =
    Number(medicineTotalAmount || 0) +
    Number(mediatorTotalAmount || 0) +
    Number(bikeRentTotalAmount || 0) +
    Number(parcelTotalAmount || 0);

  return totalAmountSum;
};

const getMonthName = (month) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[month - 1];
};

const calculateTotalVisitsLast12Months = async () => {
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  try {
    const result = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: twelveMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          count: 1,
        },
      },
    ]);

    const visitsMap = new Map(
      result.map((entry) => [entry.month, entry.count])
    );

    const chartData = [];
    for (let month = 1; month <= 12; month++) {
      chartData.push({
        name: getMonthName(month),
        visit: visitsMap.get(month) || 1,
      });
    }

    const barChartBoxVisit = {
      title: "Total Visit",
      color: "#FF8042",
      dataKey: "visit",
      chartData: chartData,
    };

    return barChartBoxVisit;
  } catch (error) {
    throw error;
  }
};

export const StatisticService = {
  getStatistic,
  getDailyBooking,
  latestTransaction,
  getChartData,
  chartBoxProduct,
  chartBoxMedicine,
  chartBoxTotalSold,
  calculateTotalVisitsLast12Months,
};
