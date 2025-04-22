import { useNavigate, useParams, useSearchParams } from "react-router";
import { Problem, Submission } from "../../utils/types";
import { decodeBase64 } from "../../utils/decodeBase64";
import ApiService from "../../services/submissionHandler";
import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import { languages } from "../../utils/languagesArray";
import { ProblemHandler } from "../../services/problemHandler";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Accepted":
      return "text-green-400";
    case "Wrong Answer":
      return "text-red-400";
    case "Time Limit Exceeded":
      return "text-yellow-400";
    default:
      return "text-gray-300";
  }
};

const SubmissionDetails = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const submissionId = searchParams.get("id");
  console.log(submissionId);
  const [submission, setSubmission] = useState<Submission>();
  const [problemTitle, setProblemTitle] = useState<string>();

  const problemHandler = new ProblemHandler(import.meta.env.VITE_BASE_URL);

  const submissionHandler = new ApiService(import.meta.env.VITE_BASE_URL);

  useEffect(() => {
    async function fetchSubmission(submissionId: string) {
      try {
        setLoading(true);
        const data: Submission =
          await submissionHandler.getSingleSubmissionOfUserForGivenProblem(submissionId);
        const problem: Problem = await problemHandler.fetchOneProblem(id!);
        setProblemTitle(problem.problemTitle);
        setSubmission(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching submission:", error);
        setLoading(false);
      }
    }

    if (submissionId) {
      fetchSubmission(submissionId);
    }
  }, [submissionId]);

  const status = submission?.status.status;
  const data = submission?.status.data;
  const submissions = data ?? [];

  const totalTime = submissions.reduce(
    (acc, curr) => acc + (parseInt(curr.time) || 0),
    0
  );
  const totalMemory = submissions.reduce(
    (acc, curr) => acc + (curr.memory || 0),
    0
  );

  const firstCompileError = submissions.find((s) => s.compile_output);

  const compileErrorElement = firstCompileError ? (
    <pre className="bg-red-100 text-red-700 p-2 rounded mb-2 whitespace-pre-wrap">
      🔧 <strong>Compile Error:</strong>
      <br />
      {firstCompileError.compile_output}
    </pre>
  ) : null;

  const wrongAnswer = submissions.filter((sub) => sub.status.id !== 3);
  console.log(wrongAnswer);

  const handleBack = () => {
    navigate(`/problems/${id}/submissions`);
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (!submission || !status || !submissions) {
    return <div className="text-white p-4">Submission not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white w-full">
      <div className="max-w-4xl mx-auto border border-gray-600 rounded-lg p-6 bg-[#252526] shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-blue-600">
            Submission Details
          </h1>
          <button
            onClick={handleBack}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Back
          </button>
        </div>

        <div className="mb-4">
          <span className="font-semibold text-gray-300">User ID:</span>{" "}
          {submission.userId}
        </div>

        <div className="mb-4">
          <span className="font-semibold text-gray-300">Problem Name:</span>{" "}
          {problemTitle}
        </div>

        <div className="mb-4">
          <span className="font-semibold text-gray-300">
            Submission Status:
          </span>{" "}
          <span className={`${getStatusColor(status)} font-bold`}>
            {submission.status.status}
          </span>
        </div>
        {/* total time taken */}
        <div>
          <span className="font-semibold text-gray-300">Total Time Taken:</span>{" "}
          {totalTime} sec
        </div>
        {/* total memory taken */}
        <div>
          <span className="font-semibold text-gray-300">
            Total Memory Taken:
          </span>{" "}
          {totalMemory} KB
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">
            Submitted Code:
          </h3>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap text-black max-h-[400px] overflow-scroll">
            <code>{decodeBase64(submission.code)}</code>
          </pre>
        </div>

        <div className="mb-4">
          <span className="font-semibold text-gray-300">Language:</span>{" "}
          {languages.find((lang) => lang._id === submission.language)?.name}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            Compilation Errors:
          </h3>
          {compileErrorElement || (
            <p className="text-green-600">✅ No compile errors</p>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-2xl text-blue-600 font-semibold mb-2">
            Status Details
          </h2>
          <div className="space-y-4">
            {wrongAnswer.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#1E1E1E] p-4 border border-gray-600 rounded-lg"
              >
                <div>
                  <span className="font-semibold text-gray-300">Status:</span>{" "}
                  <span
                    className={`${getStatusColor(
                      item.status?.description || ""
                    )} font-bold`}
                  >
                    {item.status?.description || "-"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-300">Language:</span>{" "}
                  {item.language?.name || "-"}
                </div>

                {item.stderr && (
                  <div className="text-red-400">
                    <span className="font-semibold text-gray-300">Error:</span>{" "}
                    {item.stderr}
                  </div>
                )}

                {item.stdout && (
                  <div className="text-green-400">
                    <span className="font-semibold text-gray-300">Output:</span>{" "}
                    {item.stdout}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetails;
