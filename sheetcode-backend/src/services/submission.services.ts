import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { SubmissionHandler } from "../apiHandler/submissionHandler";
import { Result, submissionsAll } from "../utils/types";
import { Submissions } from "../models/submissions.model";

const postSubmissions = asyncHandler(async (req: Request, res: Response) => {
  const {
    submissions,
    userId,
    problemId,
    code,
    language,
  }: {
    submissions: submissionsAll;
    userId: string;
    problemId: string;
    status: Result;
    code: string;
    language: string;
  } = req.body;

  const submissionsHandler = new SubmissionHandler();
  const tokens: { token: string }[] = await submissionsHandler.fetchToken(
    submissions
  );
  const combinedTokens = tokens.map((token) => token.token).join(",");
  const data = await submissionsHandler.fetchVerdict(combinedTokens);
  // console.log(data);

  console.log("userId: ", userId, "prbID: ", problemId,"data: ", data,"code: " , code, "language: " ,language);

  if (!userId || !problemId || !data || !code || !language) {
    return res.status(400).json(new ApiError(400, "All data not received"));
  }

  const submission = await Submissions.create({
    userId: userId,
    problemId: problemId,
    status: data,
    code: code,
    language: language,
  });

  if (!submission) {
    return res
      .status(500)
      .json(new ApiError(500, "Could not save submission from server side"));
  }
  return res.status(200).json(new ApiResponse(200, data, "Success"));
});

const getAllSubmissionsOfUserForGivenProblem = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, problemId, skip, limit } = req.query;

    const skipValue = parseInt(skip as string) || 0;
    const limitValue = parseInt(limit as string) || 5;

    console.log("skip: ", skip, "limit: ", limit);

    const totalNoOfSubmissions = await Submissions.countDocuments({ userId, problemId });
    console.log(totalNoOfSubmissions);
    
    const query = Submissions.find({ userId, problemId });
    
    if (skip && limit) {
      query.sort({ createdAt: -1 }).skip(skipValue).limit(limitValue);
    }
    
    const allSubmissionsOfUserForGivenProblem = await query;

    if (!allSubmissionsOfUserForGivenProblem) {
      return res.status(200).json(new ApiResponse(200, [], "No Data found"));
    }

    const data = {
      allSubmissionsOfUserForGivenProblem: allSubmissionsOfUserForGivenProblem,
      totalNoOfSubmissions: totalNoOfSubmissions
    }

    // console.log(data);
    return res
      .status(200)
      .json(
        new ApiResponse(200, data, "Success")
      );
  }
);

export { postSubmissions, getAllSubmissionsOfUserForGivenProblem };
