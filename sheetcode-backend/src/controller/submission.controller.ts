import { Router } from "express";
import { postSubmissions } from "../services/submission.services";
import { fetchOneProblem, fetchProblems } from "../services/problem.services";


const router = Router();

router.route("/submissions").post(postSubmissions);
router.route("/problems").get(fetchProblems);
router.route("/problems/:id").get(fetchOneProblem);

export default router;