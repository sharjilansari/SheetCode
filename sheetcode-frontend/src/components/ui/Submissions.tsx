import { useState } from "react";

export default function Submissions() {
  const [submissions, setSubmissions] = useState([
    { id: 1, language: "JavaScript", status: "Accepted", timestamp: "10:30 AM" },
    { id: 2, language: "Python", status: "Wrong Answer", timestamp: "10:45 AM" },
    { id: 3, language: "C++", status: "Time Limit Exceeded", timestamp: "11:00 AM" },
  ]);

  return (
    <div className="bg-[#252526] text-gray-300 p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold text-white mb-3">Your Submissions</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#1E1E1E] text-gray-300">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Language</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id} className="border-b border-gray-600 hover:bg-[#333] transition">
                <td className="p-3">{submission.id}</td>
                <td className="p-3">{submission.language}</td>
                <td className={`p-3 font-semibold ${getStatusColor(submission.status)}`}>
                  {submission.status}
                </td>
                <td className="p-3">{submission.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
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
}
