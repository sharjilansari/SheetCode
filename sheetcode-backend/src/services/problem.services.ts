import { Problems } from "./../models/problems.model";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

const fetchProblems = asyncHandler(async (req: Request, res: Response) => {
  console.log("Collection being used:", Problems.collection.name);

  const limit: number = parseInt(req.query.limit as string) || 10;
  const skip: number = parseInt(req.query.skip as string) || 0;

  const totalProblems = await Problems.countDocuments({});

  let problems: any[];
  if (skip < totalProblems) {
    problems = await Problems.find({}).skip(skip).limit(limit);
  } else {
    problems = [];
  }

  if (problems.length === 0) {
    return res.status(404).json(new ApiResponse(404, [], "No problems found"));
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { problems, totalProblems },
        "Problems sent successfully"
      )
    );
});

const fetchOneProblem = asyncHandler(async (req: Request, res: Response) => {
  const {id} = req.params;
  console.log("Requested ID:", id);
  const problem = await Problems.findOne({_id: id})

  res.status(200).json(new ApiResponse(200, problem, "Success"))
}) 

export { fetchProblems, fetchOneProblem };
