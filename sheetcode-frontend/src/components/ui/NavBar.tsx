import { Link, useLocation } from "react-router";
import { useAppSelector } from "../../app/hooks";
import getCookie from "../../utils/getCookie";

const Navbar = () => {
  const location = useLocation();
  const isLoggedIn = useAppSelector((state) => state.auth.isAuthenticated); 
  const token = getCookie("accessToken");

  const navItem = (to: string, label: string) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
        location.pathname === to
          ? "bg-orange-600 text-white"
          : "text-orange-400 hover:bg-orange-700 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-[#1c1c1c] border-b border-orange-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center flex-wrap">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          SheetCode
        </Link>
        <div className="flex gap-4 items-center">
          {navItem("/", "Home")}
          {navItem("/problems", "Problems")}
          {navItem("/profile", "Profile")}

          {isLoggedIn ? (
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Logout
            </button>
          ) : token ? (
            <Link
              to="/login"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Login
            </Link>
          ) : (
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
