import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";
import pick from "../../../shared/pick.js";
import { paginationFields } from "../../../constants/pagination.js";
import { BannerService } from "./banner.service.js";
import { bannersFilterableField } from "./banner.constant.js";

const createBanner = catchAsync(async (req, res) => {
  const banner = req.image;
  const { ...bannerData } = req.body;
  const data = { ...bannerData, banner };
  const result = await BannerService.createBanner(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner created successfully",
    data: result,
  });
});
//get all banner
const getAllBanners = catchAsync(async (req, res) => {
  const filters = pick(req.query, bannersFilterableField);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await BannerService.getAllBanners(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banners fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBanner = catchAsync(async (req, res) => {
  const result = await BannerService.getSingleBanner(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banners fetched successfully",
    data: result,
  });
});

const updateBanner = catchAsync(async (req, res) => {
  const banner = req?.image;
  const { ...bannerData } = req.body;
  const payload = banner ? { ...bannerData, banner } : bannerData;
  const result = await BannerService.updateBanner(req.params.id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner updated successfully",
    data: result,
  });
});

const deleteBanner = catchAsync(async (req, res) => {
  const result = await BannerService.deleteBanner(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Banner deleted successfully",
    data: result,
  });
});

export const BannerController = {
  createBanner,
  getAllBanners,
  getSingleBanner,
  updateBanner,
  deleteBanner,
};
