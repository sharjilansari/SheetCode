import mongoose, { Schema } from "mongoose";

const testcaseSchema = new Schema({
  problemId: {
    type: Schema.Types.ObjectId,
    ref: "Problems",
  },
  testCases: [
    {
      input: {
        type: String,
        required: true,
      },
      expectedOutput: {
        type: String,
        required: true,
      },
    },
  ],
});

export const TestCases = mongoose.model("TestCases", testcaseSchema);
