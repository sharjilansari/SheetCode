import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import axios from "axios";
import { SubmissionHandler } from "../apiHandler/submissionHandler";

const postSubmissions = asyncHandler(async (req: Request, res: Response) => {
  const { code, languageId, input, expectedOutput }:{code: string, languageId: string, input: string, expectedOutput: string} = req.body;

  const submissions = new SubmissionHandler;
  const token = submissions.fetchToken(languageId, code, input, expectedOutput);
  const data = await submissions.fetchVerdict(token);
  console.log(data);
  res.json(new ApiResponse(200, data, 'success'))
});


export { postSubmissions };
