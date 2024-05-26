import React from "react";
import "./Header.scss";
import {
  Logo,
  Search,
  Links,
  SelectLanguage,
  Buttons,
  ToggleTheme,
  Hamburger,
} from "./Navbar";
import AppLayout from "../../config/AppLayout/AppLayout";
import { useSelector } from "react-redux";

const HeaderUser = ({ changeTheme }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <AppLayout className="!py-0">
      <div className="header">
        <Logo />
        {auth?.user && <Links />}
        <Search />
        {!auth?.user && <SelectLanguage />}
        <ToggleTheme changeTheme={changeTheme} />
        <Buttons />
        <Hamburger />
      </div>
    </AppLayout>
  );
};

export default HeaderUser;
