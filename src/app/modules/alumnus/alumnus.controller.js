import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";
import pick from "../../../shared/pick.js";
import { paginationFields } from "../../../constants/pagination.js";
import { alumnusFilterableField } from "./alumnus.constant.js";
import { AlumniService } from "./alumnus.service.js";

const registerAlumni = catchAsync(async (req, res) => {
  const profilePhoto = req.image;
  const { ...registerData } = req.body;
  const data = { ...registerData, profilePhoto };
  const result = await AlumniService.registerAlumni(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Alumni registration successfully",
    data: result,
  });
});

const getAllAlumni = catchAsync(async (req, res) => {
  const filters = pick(req.query, alumnusFilterableField);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await AlumniService.getAllAlumni(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Alumnus retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAlumni = catchAsync(async (req, res) => {
  const result = await AlumniService.getSingleAlumni(req.params.email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Alumni retrieved successfully",
    data: result,
  });
});
const getSingleAlumniById = catchAsync(async (req, res) => {
  console.log("Controller - Request ID:", req.params.id);
  const result = await AlumniService.getSingleAlumniById(req.params.id);
  console.log("Controller - Result:", result);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Alumni not found",
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Alumni retrieved successfully",
    data: result,
  });
});

const updateAlumni = catchAsync(async (req, res) => {
  const result = await AlumniService.updateAlumni(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Alumnus updated successfully",
    data: result,
  });
});

const deleteAlumni = catchAsync(async (req, res) => {
  const result = await AlumniService.deleteAlumni(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Alumnus deleted successfully",
    data: result,
  });
});

export const AlumnusController = {
  registerAlumni,
  getAllAlumni,
  getSingleAlumni,
  updateAlumni,
  deleteAlumni,
  getSingleAlumniById,
};
