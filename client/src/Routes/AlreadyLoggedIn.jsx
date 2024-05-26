import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";

const AlreadyLoggedInRoute = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (auth?.user && auth?.verified) {
      message.info("You are already logged in. No need to do this again.");
      navigate("/");
    } else {
      setOk(true);
    }
  }, [auth, navigate]);

  return ok ? <Outlet /> : null;
};

export default AlreadyLoggedInRoute;
