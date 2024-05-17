import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";
import pick from "../../../shared/pick.js";
import { paginationFields } from "../../../constants/pagination.js";
import { alumnusFilterableField } from "./alumnus.constant.js";

const registerAlumni = catchAsync(async (req, res) => {
  const { ...registerData } = req.body;
  const result = await AlumnusService.registerAlumni(registerData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Alumnus update successfully",
    data: result,
  });
});

const getAllAlumni = catchAsync(async (req, res) => {
  const filters = pick(req.query, alumnusFilterableField);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await AlumnusService.getAllAlumni(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Alumnuss retrived successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAlumni = catchAsync(async (req, res) => {
  const result = await AlumnusService.getSingleAlumni(req.params.email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Alumnus retrived successfully",
    data: result,
  });
});

const updateAlumni = catchAsync(async (req, res) => {
  const result = await AlumnusService.updateAlumni(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Alumnus updated successfully",
    data: result,
  });
});

const deleteAlumni = catchAsync(async (req, res) => {
  const result = await AlumnusService.deleteAlumni(req.params.id);
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
};
