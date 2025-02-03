import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router";
import { RootState } from "../app/store";

const ProtectedRoute = () => {
  const { userEmail } = useSelector((state: RootState) => state.auth);

  if (!userEmail) {
    return (
      <div className="flex flex-col justify-center items-center ">
        <h1 className="my-5">You must log in first.</h1>
        <NavLink className="font-bold text-blue-700" to="/login">
          Login
        </NavLink>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
