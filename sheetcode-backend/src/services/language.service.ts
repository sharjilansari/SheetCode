import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { Languages } from "../models/language.model";

const getAllLanguages = asyncHandler(async(req: Request, res: Response) => {
    try {
        const languages = await Languages.find({});
        res.status(200).json(new ApiResponse(200, languages, "Success"));
    } catch (error) {
        console.log(error);
        res.status(500).json(new ApiError(500, "Something went wrong in server side"))   
    }
}) 

export {getAllLanguages};