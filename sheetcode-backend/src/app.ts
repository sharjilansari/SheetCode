import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json()); 

import submissionRouter from "./routes/submission.routes"

app.use("/api/v1", submissionRouter);

export {app};