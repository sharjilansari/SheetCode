import mongoose, { Schema } from "mongoose";

const problemSchema = new Schema(
  {
    problemTitle: {
      type: String,
    },
    description: {
      type: String,
    },
    examples: {
        type: String,
    },
    difficulty: {
        type: String
    }
  },
  {
    timestamps: true
  }
);

export const Problems = mongoose.model("Problems", problemSchema);
