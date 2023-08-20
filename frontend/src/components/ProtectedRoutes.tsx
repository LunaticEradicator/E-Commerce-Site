import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// only access route if user is logged in
export default function ProtectedRoutes() {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}
