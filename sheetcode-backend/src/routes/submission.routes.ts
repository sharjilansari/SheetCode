import { Router } from "express";
import { postSubmissions } from "../services/submission.services";


const router = Router();

router.route("/submissions").post(postSubmissions);

export default router;