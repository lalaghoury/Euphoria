import React from "react";
import "./AppLayout.scss";

const AppLayout = ({ children, className = "" }) => {
  return <div className={`appLayout ${className}`}>{children}</div>;
};

export default AppLayout;
