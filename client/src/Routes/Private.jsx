import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signin, useAuthEffect } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { signout } from "../redux/slices/authSlice";

export default function PrivateRoute() {
  useAuthEffect();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { verified } = useSelector((state) => state.auth);

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const { data } = await axios.get(`${"https://euphoria-six.vercel.app/api"}/auth/verify`, {
          withCredentials: true,
        });
        if (data.success) {
          dispatch(signin({ user: data.user }));
          return;
        }
      } catch (error) {
        console.error("Verification failed:", error.response.data.message);
        dispatch(signout());
        navigate("sign-in", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    verifyLogin();
  }, [navigate]);

  if (loading) {
    return (
      <Spin
        className="mt-[200px] w-screen"
        style={{
          height: "calc(100vh - 200px)",
        }}
      />
    );
  }

  return verified && <Outlet />;
}
