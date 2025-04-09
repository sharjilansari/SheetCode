import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    password: {
        type: String,
        required: [true, 'Password is Required'],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);