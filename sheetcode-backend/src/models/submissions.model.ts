import mongoose, { Schema } from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    problemId: {
      type: Schema.Types.ObjectId,
      ref: "Problems",
    },
    status: {
      data: [
        {
          stdout: String,
          status_id: Number,
          time: String,
          memory: Number,
          stderr: String,
          compile_output: String,
          status: { id: Number, description: String },
          language: { id: Number, name: String },
        },
      ],
      status: String,
    },
    code: {
      type: String,
    },
    language: {
      type: Schema.Types.ObjectId,
      ref: "Languages",
    },
  },
  {
    timestamps: true,
  }
);

export const Submissions = mongoose.model("Submissions", submissionSchema);
