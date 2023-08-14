import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
function Guardian({
  isAuth = false,
  children,
}: {
  isAuth: boolean;
  children: ReactNode;
}) {
  if (!isAuth) {
    return <Navigate to="/public/signin" replace />;
  }
  return children;
}
export default Guardian;
