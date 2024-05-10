import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError.js";
import { Admin } from "./admin.model.js";

const registerAdmin = async (payload) => {
  const isExist = await Admin.findOne({
    email: payload?.email,
  });

  if (isExist && payload?.registration) {
    throw new ApiError(httpStatus.CONFLICT, "Email is already exist");
  }

  if (isExist) {
    const result = await Admin.updateOne({ email: payload?.email }, payload);
    if (result.modifiedCount === 1) {
      const updatedUser = await Admin.findOne({ email: payload?.email });
      return updatedUser;
    }
  }
  const result = await Admin.create(payload);
  return result;
};

const getAdmin = async () => {
  const result = await Admin.find();
  console.log(result);
  return result;
};

export const AdminService = {
  registerAdmin,
  getAdmin,
};
