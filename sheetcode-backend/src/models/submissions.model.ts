import mongoose, { Schema } from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    problemId: {
        type: Schema.Types.ObjectId,
        ref: "Problems"
    },
    status: {
      type: Schema.Types.ObjectId,
      ref: "Status"
    },
    code: {
      type: String,
    },
    language: {
      type: Schema.Types.ObjectId,
      ref: "Languages"
    },
  },
  {
    timestamps: true,
  }
);

export const Submissions = mongoose.model("Submissions", submissionSchema);
