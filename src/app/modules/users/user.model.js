import { Schema, model } from "mongoose";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
    },
    email: {
      type: String,
      unique: true,
    },
    phoneNumber: {
      type: String,
      unique: false,
    },
    nid: {
      type: String,
      unique: false,
    },
    drivingLicense: {
      type: String,
      unique: false,
    },
    gender: {
      type: String,
      unique: false,
    },
    role: {
      type: String,
      unique: false,
    },
    photoURL: {
      type: String,
      unique: false,
    },
    registration: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("save", async function (next) {
//   const isExist = await User.findOne({
//     email: this.email,
//   });
//   if (isExist) {
//     throw new ApiError(httpStatus.CONFLICT, "Email is already exist");
//   }
//   next();
// });

export const User = model("User", userSchema);

// Specify the field names for which you want to remove the unique indexes
const fieldsToRemoveIndexes = [
  "phoneNumber",
  "name",
  "drivingLicense",
  "nid",
  "gender",
  "role",
  "photoURL",
  "password",
];

fieldsToRemoveIndexes.forEach((fieldName) => {
  User.collection.dropIndex({ [fieldName]: 1 }, (error, result) => {});
});
