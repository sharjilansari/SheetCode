import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { SubmissionHandler } from "../apiHandler/submissionHandler";
import { submissionsAll } from "../utils/types";

const postSubmissions = asyncHandler(async (req: Request, res: Response) => {
  const {submissions} = req.body;

  const submissionsHandler = new SubmissionHandler;
  const tokens = await submissionsHandler.fetchToken(JSON.stringify(submissions));
  const combinedTokens = await tokens.map((token) => (token.token)).join(",");
  const data = await submissionsHandler.fetchVerdict(combinedTokens);
  console.log(data);
  res.status(200).json(new ApiResponse(200, data, "Success"));
});

const saveSubmissions = asyncHandler( async (req: Request, res: Response) => {
  const {submissions, problemId} = req.body;

})


export { postSubmissions };
