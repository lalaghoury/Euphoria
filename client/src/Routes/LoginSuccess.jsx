import React, { useEffect } from "react";
import { Spin } from "antd";
import axios from "axios";
import { signin } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`${"https://euphoria-six.vercel.app/api"}/auth/verify`);
        if (data.success) {
          dispatch(signin({ user: data.user }));
          window.location.href = "/";
        }
      } catch (error) {
        console.log(error.response.data.message);
        navigate("/sign-in");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  return (
    <div className="h-[350px] w-screen flex items-center justify-center">
      {loading && (
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-4xl text-black dark:text-gray-700 font-bold text-center">
            Login Success
          </h1>
          <h1 className="text-4xl text-black dark:text-gray-700 font-bold text-center">
            Redirecting you to Homepage
          </h1>
          <Spin className="flex items-center justify-center" />
        </div>
      )}
    </div>
  );
};

export default LoginSuccess;
