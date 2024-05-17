import httpStatus from "http-status";
import { paginationHelper } from "../../../helpers/paginationHelpers.js";
import { User } from "./user.model.js";
import ApiError from "../../../errors/ApiError.js";
import { Alumnus } from "./alumnus.model.js";
import { alumnusSearchableField } from "./alumnus.constant.js";

const registerAlumni = async (payload) => {
  const isExist = await Alumnus.findOne({
    email: payload?.email,
  });

  if (isExist && payload?.registration) {
    throw new ApiError(httpStatus.CONFLICT, "Email is already exist");
  }

  if (isExist) {
    const result = await Alumnus.updateOne({ email: payload?.email }, payload);
    if (result.modifiedCount === 1) {
      const updateAlumni = await Alumnus.findOne({ email: payload?.email });
      return updateAlumni;
    }
  }
  const result = await Alumnus.create(payload);
  return result;
};

const getAllAlumni = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: alumnusSearchableField.map((field) => ({
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

  const total = await Alumnus.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAlumni = async (email) => {
  const result = await Alumnus.findOne({ email });
  return result;
};

const updateAlumni = async (id, payload) => {
  const result = await Alumnus.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteAlumni = async (id) => {
  const result = await Alumnus.findByIdAndDelete({ _id: id });
  return result;
};

export const AlumniService = {
  registerAlumni,
  getAllAlumni,
  getSingleAlumni,
  updateAlumni,
  deleteAlumni,
};
