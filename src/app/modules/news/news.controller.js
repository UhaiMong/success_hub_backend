import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import pick from "../../../shared/pick.js";
import { paginationFields } from "../../../constants/pagination.js";
import { NewsService } from "./news.service.js";
import { newsFilterableField } from "./news.constants.js";

const addNews = catchAsync(async (req, res) => {
  const image = req.image;
  const { ...newsData } = req.body;
  const news = { ...newsData, image };
  const result = await NewsService.addNews(news);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "News added successful",
    data: result,
  });
});

const getAllNews = catchAsync(async (req, res) => {
  const filters = pick(req.query, newsFilterableField);
  const options = pick(req.query, paginationFields);
  const result = await NewsService.getAllNews(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "News fetched successful",
    meta: result.meta,
    data: result.data,
  });
});

const getNewsById = catchAsync(async (req, res) => {
  const result = await NewsService.getNewsById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "News fetched successful",
    data: result,
  });
});

const updateNews = catchAsync(async (req, res) => {
  const image = req?.image;
  const id = req.params.id;
  const payload = image ? { ...req.body, image } : req.body;
  const result = await NewsService.updateMedicine(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "News updated successful",
    data: result,
  });
});
const deleteNews = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await NewsService.deleteNews(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "News deleted successful",
    data: result,
  });
});

export const NewsController = {
  addNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
};
