import { useNavigate } from "react-router";
import { ProblemHandler } from "../../services/problemHandler";
import { useEffect, useState } from "react";

type Problem = {
  _id: string;
  problemTitle: string;
  difficulty: "Easy" | "Medium" | "Hard";
};

const ProblemsList = () => {
  // const [problems, setProblems] =useState<Promise<any>[]>();
  const navigate = useNavigate();
  const [problems, setProblems] = useState<Problem[]>();
  const problemHandler = new ProblemHandler(import.meta.env.VITE_BASE_URL);

  useEffect(() => {
    const fetchData = async () => {
      const data = await problemHandler.fetchProblems();
      setProblems(data);
    };
    fetchData();
  }, []);

  // const problems = [
  //   { id: 1, title: "Two Sum", difficulty: "Easy" },
  //   { id: 2, title: "Reverse Linked List", difficulty: "Medium" },
  //   { id: 3, title: "Longest Palindromic Substring", difficulty: "Hard" },
  // ];

  const handleClick = (_id: string) => {
    navigate(`/problems/${_id}`);
  };

  return (
    <div className="p-6 bg-[#1E1E1E] text-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Problem List</h2>
      <div className="space-y-3">
        {problems && problems.map((problem) => (
          <button
            key={problem._id}
            onClick={() => handleClick(problem._id)}
            className="w-full text-left p-4 bg-[#2D2D2D] hover:bg-[#3A3A3A] rounded border border-gray-600 flex justify-between items-center transition-colors"
          >
            <span className="text-lg font-medium">{problem.problemTitle}</span>
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
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProblemsList;
