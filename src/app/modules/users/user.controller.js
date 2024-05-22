import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";
import { UserService } from "./user.service.js";
import pick from "../../../shared/pick.js";
import { usersFilterableField } from "./user.constant.js";
import { paginationFields } from "../../../constants/pagination.js";

const registerUser = catchAsync(async (req, res) => {
  const { ...registerData } = req.body;
  const result = await UserService.registerUser(registerData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Registration successful",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const filters = pick(req.query, usersFilterableField);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUsers(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const result = await UserService.getSingleUser(req.params?.email);
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Your record is not found in our system",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single User retrieved successfully",
    data: result,
  });
});
const getUserByStdUid = catchAsync(async (req, res) => {
  const result = await UserService.getUserByStdUid(req.params?.std_uid);
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Your record is not found in our system",
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User found",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const result = await UserService.updateUser(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const result = await UserService.deleteUser(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

export const UserController = {
  registerUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getUserByStdUid,
};
