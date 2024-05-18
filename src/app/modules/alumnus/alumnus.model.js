import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const alumnusSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Required Field"],
      trim: true,
      lowercase: true,
    },
    firstName: {
      type: String,
      required: [true, "Required Field"],
    },
    lastName: {
      type: String,
      required: [true, "Required Field"],
    },
    profilePhoto: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "deactivate",
    },
    gender: {
      type: String,
      required: [true, "Required Field"],
      default: "other",
    },
    dob: {
      type: String,
      validate: {
        validator: function (value) {
          if (!validator.isDate(value)) {
            return false;
          }
          if (new Date(value).toDateString() === new Date().toDateString()) {
            return false;
          }
          const age = Math.floor(
            (new Date() - new Date(value)) / (365 * 24 * 60 * 60 * 1000)
          );
          return age > 14 && age <= 100;
        },
        message: "Invalid Date of Birth",
      },
    },
    email: {
      type: String,
      required: [true, "Required Field"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Required Field"],
    },
    address: {
      type: String,
    },
    graduation: {
      type: Number,
      required: [true, "Required Field"],
    },
    degree: {
      type: String,
    },
    department: {
      type: String,
      required: [true, "Required Field"],
      default: "cse",
    },
    batch: {
      type: Number,
      required: [true, "Required Field"],
      min: 1,
    },
    faculty: {
      type: String,
      required: [true, "Required Field"],
      enum: ["Science", "Arts", "Business", "Engineering"],
    },
    job: {
      type: String,
      required: function () {
        return !!this.job;
      },
    },
    company: {
      type: String,
      required: function () {
        return !!this.job;
      },
    },
    designation: {
      type: String,
      required: function () {
        return !!this.job;
      },
    },
    website: {
      type: String,
      validate: [
        validator.isURL,
        "Please provide correct linkedin profile link",
      ],
    },
    workExperience: {
      type: String,
    },
    linkedin: {
      type: String,
      validate: [
        validator.isURL,
        "Please provide correct linkedin profile link",
      ],
    },
    facebook: {
      type: String,
      validate: [
        validator.isURL,
        "Please provide correct facebook profile link",
      ],
    },
    interests: {
      type: String,
    },
    expertise: {
      type: String,
    },
    channels: {
      type: String,
      default: "email",
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          }),
        message: "Password {VALUE} is so poor.",
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm password is needed"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password doesn't matched",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpired: Date,
  },
  {
    timestamps: true,
  }
);

// middleware pre and post
alumnusSchema.pre("save", function (next) {
  const password = this.password;
  const saltRounds = 10;
  const hashingPassword = bcrypt.hashSync(password, saltRounds);
  this.password = hashingPassword;
  this.confirmPassword = undefined;
  console.log("Before saving data");
  next();
});
alumnusSchema.methods.passwordCompare = async function (password, hash) {
  return await bcrypt.compareSync(password, hash);
};

alumnusSchema.post("save", function (doc, next) {
  console.log("After saving data");
  next();
});
// logger
alumnusSchema.methods = function () {
  console.log(`Data saved for ${this.firstName}`);
};

export const Alumnus = model("Alumnus", alumnusSchema);
