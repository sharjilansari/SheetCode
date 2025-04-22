import { useEffect, useState } from "react";
import ApiService from "../../services/submissionHandler";
import { useLocation, useNavigate, useParams } from "react-router";
import { LocalStorage } from "../../utils/saveToLocalStorage";
import { Submission } from "../../utils/types";
import { languages } from "../../utils/languagesArray";
import LockedSection from "./LockedSection";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Pagination from "./Pagination";
import { setAuth } from "../../features/counter/authSlice";

export default function Submissions() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState<Submission[]>();
  const [totalItems, setTotalItems] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const dispatch = useAppDispatch();

  const demoSubmissions = [
    {
      id: 1,
      language: "JavaScript",
      status: "Accepted",
      timestamp: "10:30 AM",
    },
    { id: 2, language: "Python", status: "Rejected", timestamp: "10:45 AM" },
    {
      id: 3,
      language: "C++",
      status: "Time Limit Exceeded",
      timestamp: "11:00 AM",
    },
    {
      id: 4,
      language: "JavaScript",
      status: "Accepted",
      timestamp: "10:30 AM",
    },
    { id: 5, language: "Python", status: "Rejected", timestamp: "10:45 AM" },
    { id: 6, language: "Python", status: "Rejected", timestamp: "10:45 AM" },
    {
      id: 7,
      language: "C++",
      status: "Time Limit Exceeded",
      timestamp: "11:00 AM",
    },
  ];

  const submissionHandler = new ApiService(import.meta.env.VITE_BASE_URL);
  const getUserDataFromLocalStorage = new LocalStorage();

  const userData = getUserDataFromLocalStorage.getFromLocalStorage("userData");
  if (!userData) dispatch(setAuth(false));
  // console.log(userData.data.user._id);

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  // console.log(isAuthenticated);

  const paginate = (PageNumber: number) => {
    setCurrentPage(PageNumber);
  };
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {

      const skip = (currentPage - 1) * itemsPerPage;
      const limit = itemsPerPage;
      const data = await submissionHandler.getSubmissionsOfUserForGivenProblem(
        userData.data.user._id,
        id!,
        skip,
        limit
      );
      setTotalItems(data.totalNoOfSubmissions);
      setSubmissions(data.allSubmissionsOfUserForGivenProblem);
    };
    if (isAuthenticated) fetchData();
  }, [id, currentPage, isAuthenticated, location.state]);

  const handleClick = (submissionId: string) => {
    navigate(`/problems/${id}/submission-details?id=${submissionId}`);
  };

  return (
    <LockedSection>
      <div className="bg-[#252526] text-gray-300 p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold text-white mb-3">
          Your Submissions
        </h2>
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
            {!isAuthenticated ? (
              <tbody>
                {demoSubmissions &&
                  demoSubmissions.map((submission) => (
                    <tr
                      key={submission.id}
                      className="border-b border-gray-600 hover:bg-[#333] transition"
                    >
                      <td className="p-3">{submission.id}</td>
                      <td className="p-3">{submission.language}</td>
                      <td
                        className={`p-3 font-semibold ${getStatusColor(
                          submission.status
                        )}`}
                      >
                        {submission.status}
                      </td>
                      <td className="p-3">{String(submission.timestamp)}</td>
                    </tr>
                  ))}
              </tbody>
            ) : (
              <tbody>
                {submissions &&
                  submissions.map((submission) => (
                    <tr
                      key={submission._id}
                      className="border-b border-gray-600 hover:bg-[#333] transition cursor-pointer"
                      onClick={() => handleClick(submission._id)}
                    >
                      <td className="p-3">{submission._id}</td>
                      <td className="p-3">
                        {
                          languages.find(
                            (lang) => lang._id === submission.language
                          )?.name
                        }
                      </td>
                      <td
                        className={`p-3 font-semibold ${getStatusColor(
                          submission.status.status
                        )}`}
                      >
                        {submission.status.status}
                      </td>
                      <td className="p-3">{String(submission.createdAt)}</td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
        </div>
        {submissions && (
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems || 0}
            paginate={paginate}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </LockedSection>
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
