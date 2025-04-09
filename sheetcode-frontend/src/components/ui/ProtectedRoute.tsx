import { ReactNode } from "react";
import { Navigate } from "react-router";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: ReactNode;
}

// Function to extract a specific cookie by name
const getCookie = (name: string): string | null => {
    const value = Cookies.get(name);
    console.log(value);
    return value ?? null;
  };

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  const accessToken = getCookie("accessToken");
  console.log(accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
