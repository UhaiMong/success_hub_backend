import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError.js";
import { paginationHelper } from "../../../helpers/paginationHelpers.js";
import { News } from "./news.model.js";
import { newsSearchableField } from "./news.constants.js";
import { NewsImageUpload } from "../../middleware/uploader/uploadNews.js";

const addNews = async (payload) => {
  const result = await News.create(payload);
  return result;
};

const getAllNews = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: newsSearchableField.map((field) => ({
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

  const result = await News.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await News.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getNewsById = async (id) => {
  const result = await News.findById(id);
  return result;
};

const updateNews = async (id, payload) => {
  const news = await News.findById({ _id: id });

  if (!news) {
    throw new ApiError(httpStatus.NOT_FOUND, "News Not Found");
  }

  if (payload?.image && news?.image) {
    NewsImageUpload.deleteNewsImage(news?.image);
  }

  const result = await News.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteNews = async (id) => {
  const news = await News.findById({ _id: id });

  if (!news) {
    throw new ApiError(httpStatus.NOT_FOUND, "News Not Found");
  }

  if (news.image) {
    NewsImageUpload.deleteNewsImage(news.image);
  }

  const result = await News.findOneAndDelete({ _id: id });
  return result;
};

export const NewsService = {
  addNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
};
