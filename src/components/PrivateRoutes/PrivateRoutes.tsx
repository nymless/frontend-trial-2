import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

export const PrivateRoutes = () => {
  const user = useAppSelector((state) => state.userState.user);
  const isAuth = Boolean(user);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
