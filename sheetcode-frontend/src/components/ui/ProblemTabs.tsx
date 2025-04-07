import { useState } from "react";
import Description from "./Description";
import Submissions from "./Submissions";

export default function ProblemTabs() {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="bg-[#1E1E1E] text-gray-300 rounded-lg shadow-md w-auto mx-auto">
      <div className="flex border-b border-gray-600">
        <button
          className={`p-3 w-1/2 text-center ${
            activeTab === "description" ? "border-b-2 border-blue-400 text-white" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`p-3 w-1/2 text-center ${
            activeTab === "submissions" ? "border-b-2 border-blue-400 text-white" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("submissions")}
        >
          Submissions
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "description" ? <Description /> : <Submissions />}
      </div>
    </div>
  );
}
