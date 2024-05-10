import ApiError from "../../../errors/ApiError.js";
import { paginationHelper } from "../../../helpers/paginationHelpers.js";
import { eventSearchableField } from "./event.constant.js";
import { Event } from "./event.model.js";
import httpStatus from "http-status";

const addEvent = async (payload) => {
  const result = await Event.create(payload);
  return result;
};

const getEvent = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: eventSearchableField.map((field) => ({
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

  const result = await Event.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Event.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleEvent = async (id) => {
  const result = await Event.findById(id);
  return result;
};

const updateEvent = async (id, payload) => {
  const event = await Event.findById({ _id: id });

  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
  }

  const result = await Event.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteEvent = async (id) => {
  const event = await Event.findById({ _id: id });

  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, "Event not found");
  }
  const result = await Event.findByIdAndDelete({ _id: id });
  return result;
};

export const EventService = {
  addEvent,
  getEvent,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
