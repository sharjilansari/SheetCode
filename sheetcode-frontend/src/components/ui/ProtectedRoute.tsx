import { ReactNode } from "react";
import { Navigate } from "react-router";
import getCookie from "../../utils/getCookie";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  const accessToken = getCookie("accessToken");
  console.log(accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
