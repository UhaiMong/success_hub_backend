import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination.js";
import catchAsync from "../../../shared/catchAsync.js";
import pick from "../../../shared/pick.js";
import { contactFilterableField } from "./contact.constant.js";
import { ContactService } from "./contact.service.js";
import sendResponse from "../../../shared/sendResponse.js";

// Create new contact
const createContact = catchAsync(async (req, res) => {
  const { ...contactData } = req.body;
  const result = await ContactService.createContact(contactData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact created successfully",
    data: result,
  });
});

// Get the contact
const getAllContact = catchAsync(async (req, res) => {
  const filters = pick(req.query, contactFilterableField);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ContactService.getAllContact(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

// get single Contact by id
const getSingleContact = catchAsync(async (req, res) => {
  const result = await ContactService.getSingleContact(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact fetched successfully",
    data: result,
  });
});

// Delete the contact BY Id
const deleteContact = catchAsync(async (req, res) => {
  const result = await ContactService.deleteContact(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact deleted successfully",
    data: result,
  });
});

export const ContactController = {
  createContact,
  getAllContact,
  getSingleContact,
  deleteContact,
};
