import { NavLink, Outlet, useParams } from "react-router";

export default function ProblemTabs() {
  const { id } = useParams();

  return (
    <div className="bg-[#1E1E1E] text-gray-300 rounded-lg shadow-md w-auto mx-auto">
      <div className="flex border-b border-gray-600">
        <NavLink
          to={`/problems/${id}/description`}
          className={({ isActive }) =>
            `p-3 w-1/2 text-center ${
              isActive ? "border-b-2 border-blue-400 text-white" : "text-gray-400"
            }`
          }
        >
          Description
        </NavLink>
        <NavLink
          to={`/problems/${id}/submissions`}
          className={({ isActive }) =>
            `p-3 w-1/2 text-center ${
              isActive ? "border-b-2 border-blue-400 text-white" : "text-gray-400"
            }`
          }
        >
          Submissions
        </NavLink>
      </div>

      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
}
