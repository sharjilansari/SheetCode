import { Link, useLocation, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setAuth } from "../../features/counter/authSlice";

const Navbar = () => {
  const location = useLocation();
  const isLoggedIn = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleClick = async () => {
    // You may want to hit an API endpoint to invalidate the refresh token
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/logout`, {
      method: "POST",
      credentials: "include", // Ensure cookies are sent with the request
    });

    dispatch(setAuth(false)); // Update state to reflect logged-out status
    localStorage.clear();
    navigate("/"); // Redirect to home after logout
  };

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
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() => handleClick()}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Signup/login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
