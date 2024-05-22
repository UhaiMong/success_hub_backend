import httpStatus from "http-status";
import { paginationHelper } from "../../../helpers/paginationHelpers.js";
import { usersSearchableField } from "./user.constant.js";
import { User } from "./user.model.js";
import ApiError from "../../../errors/ApiError.js";

// Add new User
const registerUser = async (payload) => {
  const isExist = await User.findOne({
    email: payload?.email,
  });
  console.log(isExist, payload?.registration);
  if (isExist && payload?.registration) {
    throw new ApiError(httpStatus.CONFLICT, "Email is already exist");
  }

  if (isExist) {
    const updateInfo = await User.updateOne({ email: payload?.email }, payload);
    if (updateInfo.modifiedCount === 1) {
      const updatedUser = await User.findOne({ email: payload?.email });
      return updatedUser;
    }
  }
  const newUser = await User.create(payload);
  return newUser;
};

const getAllUsers = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: usersSearchableField.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filteredData).length) {
    andConditions.push({
      $and: Object.entries(filteredData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleUser = async (email) => {
  const result = await User.findOne({ email });
  return result;
};

const getUserByStdUid = async (std_uid) => {
  const result = await User.findOne({ std_uid });
  return result;
};

const updateUser = async (id, payload) => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteUser = async (id) => {
  const result = await User.findByIdAndDelete({ _id: id });
  return result;
};

export const UserService = {
  registerUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getUserByStdUid,
};
