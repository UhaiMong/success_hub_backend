import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    displayName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    std_uid: {
      type: String,
      unique: true,
    },
    mobileNumber: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "guest",
    },
  },
  {
    timestamps: true,
  }
);

// middleware pre and post
userSchema.pre("save", function (next) {
  console.log("Before saving data");
  next();
});

userSchema.post("save", function (doc, next) {
  console.log("After saving data");
  next();
});
// logger
userSchema.methods = function () {
  console.log(`Data saved for ${this.displayName}`);
};

export const User = model("User", userSchema);
