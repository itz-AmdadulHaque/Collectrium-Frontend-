import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const RequireAuth = ({ allowedRole }) => {
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState();


  const getUser = async () => {
    try {
      setLoading(true);
      const { data } = await axiosPrivate.get("/users/");
      // console.log("Requre auth: ", data);

      setAuth((prev) => {
        return { ...prev, user: data?.data?.user };
      });
    } catch (error) {
      console.log("//RequreAuth error: ", error);
      setAuth({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth?.accessToken) {
      getUser();
    }
  }, []);

  return loading ? (
    <div className="h-screen flex justify-center items-center">
      <h1>Loading...</h1>
    </div>
  ) : auth?.user?.role === allowedRole ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
