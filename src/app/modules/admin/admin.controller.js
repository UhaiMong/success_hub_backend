import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";
import { AdminService } from "./admin.service.js";

const registerAdmin = catchAsync(async (req, res) => {
  const { ...registerData } = req.body;
  const result = await AdminService.registerAdmin(registerData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User update successfully",
    data: result,
  });
});

const getAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.getAdmin();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Data retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const AdminController = {
  registerAdmin,
  getAdmin,
};
