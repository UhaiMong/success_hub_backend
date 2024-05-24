import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError.js";
import { paginationHelper } from "../../../helpers/paginationHelpers.js";
import { contactSearchableField } from "./contact.constant.js";
import { ContactUs } from "./contact.model.js";

// Create Contact
const createContact = async (payload) => {
  const result = await ContactUs.create(payload);
  return result;
};

// Get all Contact
const getAllContact = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: contactSearchableField.map((field) => ({
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

  const result = await ContactUs.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await ContactUs.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
// Get Contact By Id
const getSingleContact = async (id) => {
  const result = await ContactUs.findOne({ _id: id });
  return result;
};
// delete Contact By Id
const deleteContact = async (id) => {
  const contact = await ContactUs.findById({ _id: id });

  if (!contact) {
    throw new ApiError(httpStatus.NOT_FOUND, "Contact not found");
  }
  const result = await ContactUs.findByIdAndDelete({ _id: id });
  return result;
};

export const ContactService = {
  createContact,
  getAllContact,
  getSingleContact,
  deleteContact,
};
