import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import pick from "../../../shared/pick.js";
import { paginationFields } from "../../../constants/pagination.js";
import { EventService } from "./event.service.js";
import { eventFilterableField } from "./event.constant.js";

const addEvent = catchAsync(async (req, res) => {
  const { ...eventData } = req.body;
  const data = { ...eventData };
  const result = await EventService.addEvent(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event added successful",
    data: result,
  });
});

const getEvent = catchAsync(async (req, res) => {
  const filters = pick(req.query, eventFilterableField);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await EventService.getEvent(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event got successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleEvent = catchAsync(async (req, res) => {
  const result = await BlogService.getSingleEvent(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event Got successfully",
    data: result,
  });
});

const updateEvent = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await EventService.updateEvent(req.params.id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event updated successfully",
    data: result,
  });
});

const deleteEvent = catchAsync(async (req, res) => {
  const result = await BlogService.deleteEvent(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event deleted successfully",
    data: result,
  });
});

export const EventController = {
  addEvent,
  getEvent,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
