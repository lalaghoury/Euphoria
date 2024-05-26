import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../comp";

const MainLayout = ({ changeTheme }) => {
  const [admin, setIsAdmin] = useState(null);

  useEffect(() => {
    const url = window.location.pathname;
    setIsAdmin(url.includes("dashboard"));
  }, [window.location.pathname]);

  return (
    <div>
      {!admin && <Header changeTheme={changeTheme} />}
      <Outlet />
    </div>
  );
};

export default MainLayout;
