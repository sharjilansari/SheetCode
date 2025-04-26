import { useEffect, useState } from "react";
import { ProblemHandler } from "../../services/problemHandler";
import { useParams } from "react-router";
import LoadingPage from "./LoadingPage";

type Problem = {
  _id: string;
  problemTitle: string;
  description: string;
  examples: string;
  difficulty: "Easy" | "Medium" | "Hard";
};

export default function Description() {
  const problemHandler = new ProblemHandler(import.meta.env.VITE_BASE_URL);
  const [problem, setProblem] = useState<Problem>();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await problemHandler.fetchOneProblem(id);
        console.log(data);
        setProblem(data);
      }
    };
    fetchData();
  }, [id]);

  if (!problem) return <LoadingPage />;

  return (
    <div className="bg-[#252526] text-gray-300 p-6 rounded-lg shadow-md">
      <span
        className={`text-sm px-3 py-1 rounded-full ${
          problem.difficulty === "Easy"
            ? "bg-green-700"
            : problem.difficulty === "Medium"
            ? "bg-yellow-700"
            : "bg-red-700"
        }`}
      >
        {problem.difficulty}
      </span>
      <h2 className="text-xl font-semibold text-white mb-3 mt-3">
        {problem.problemTitle}
      </h2>
      <p className="text-gray-400 leading-relaxed">{problem.description}</p>
      <h3 className="text-lg font-medium text-white mt-4">Example</h3>
      <pre className="bg-[#1E1E1E] text-gray-300 p-4 rounded-md text-sm overflow-x-auto">
        {problem.examples}
      </pre>
    </div>
  );
}
