import { Router } from "express";
import { getAllSubmissionsOfUserForGivenProblem, getSingleSubmissionOfUserForGivenProblem, postSubmissions } from "../services/submission.services";
import { fetchOneProblem, fetchProblems } from "../services/problem.services";
import { getAllLanguages } from "../services/language.service";


const router = Router();

router.route("/submissions").post(postSubmissions);
router.route("/get-submissions").get(getAllSubmissionsOfUserForGivenProblem);
router.route("/submission-details").get(getSingleSubmissionOfUserForGivenProblem);
router.route("/problems").get(fetchProblems);
router.route("/problems/:id").get(fetchOneProblem);
router.route("/languages").get(getAllLanguages);

export default router;