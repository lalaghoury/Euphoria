import React, { useEffect, useRef, useState } from "react";
import "./Header.scss";
import { useSelector } from "react-redux";
import LogoImg from "../../assets/images/logo.svg";
import {
  SearchOutlined,
  MoonOutlined,
  SunOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Badge, Button, Input, Select, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuthEffect } from "../../redux/slices/authSlice";
import { useWishlistEffect } from "../../redux/slices/wishlistSlice";
import { useDispatch } from "react-redux";
import { signout as signoutAction } from "../../redux/slices/authSlice";
import { useCartEffect } from "../../redux/slices/cartSlice";

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className="logo dis-fcc cursor-pointer">
      <img src={LogoImg} alt="logo" onClick={() => navigate("/")} />
    </div>
  );
};

export const Links = () => {
  return (
    <div className="nav-links dis-fcc">
      <Link className="hov-scale" to={"/shop"}>
        Shop
      </Link>
      <Link className="hov-scale" to={"/category/men"}>
        Men
      </Link>
      <Link className="hov-scale" to={"/category/women"}>
        Womens
      </Link>
      <Link className="hov-scale" to={"/category/combos"}>
        Combos
      </Link>
      <Link className="hov-scale" to={"/category/joggers"}>
        Joggers
      </Link>
    </div>
  );
};

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const handleSearchIconClick = () => {
    setSearchTerm("");
    setShowSearch(true);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setShowSearch(false);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  return (
    <div
      className="search"
      style={{ width: showSearch && "400px" }}
      ref={searchRef}
    >
      {showSearch ? (
        <>
          <Input
            type="text"
            placeholder="Search..."
            size="small"
            value={searchTerm}
            className="search-input"
            onChange={handleInputChange}
            onPressEnter={handleSearch}
            autoFocus
          />
          <Button
            className="disable-hover text-primary bold"
            onClick={handleSearch}
          >
            Search
          </Button>
        </>
      ) : (
        <Button
          onClick={handleSearchIconClick}
          type="text"
          className="bg-sec "
          block
          // icon={<SearchOutlined />}
        >
          <SearchOutlined />
          <span className="!m-0">Search</span>
        </Button>
      )}
    </div>
  );
};

export const SelectLanguage = () => {
  const { Option } = Select;
  const languages = [
    {
      value: "en-US",
      label: "English (united States)",
    },
    {
      value: "es-ES",
      label: "Spanish (Espana)",
    },
  ];
  return (
    <Select
      defaultValue={"en-US"}
      style={{ width: 206 }}
      onChange={(value) => console.log(value)}
      className="select-language"
    >
      {languages.map((lang) => (
        <Option value={lang.value} key={lang.value}>
          {lang.label}
        </Option>
      ))}
    </Select>
  );
};

export const Buttons = () => {
  useAuthEffect();
  useCartEffect("count");
  useWishlistEffect("count");
  const auth = useSelector((state) => state.auth);
  const { count: Cartcount } = useSelector((state) => state.cart);
  const { count: Wishlistcount } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();

  return (
    <>
      {auth.user ? (
        <div className="nav-btn-login">
          <Space size={12} align="center">
            <Button
              className="dis-fcc"
              onClick={() => navigate("/profile/my-wishlist")}
            >
              <Badge className="nav-badge" count={Wishlistcount || 0} showZero>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.99486 4.93014C8.49535 3.18262 5.99481 2.71255 4.11602 4.31275C2.23723 5.91295 1.97273 8.5884 3.44815 10.481C4.67486 12.0545 8.38733 15.3732 9.60407 16.4474C9.7402 16.5675 9.80827 16.6276 9.88766 16.6512C9.95695 16.6718 10.0328 16.6718 10.1021 16.6512C10.1815 16.6276 10.2495 16.5675 10.3857 16.4474C11.6024 15.3732 15.3149 12.0545 16.5416 10.481C18.017 8.5884 17.7848 5.89611 15.8737 4.31275C13.9626 2.72938 11.4944 3.18262 9.99486 4.93014Z"
                    stroke="#807D7E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Badge>
            </Button>

            <Button
              className="dis-fcc"
              onClick={() => navigate("/profile/my-info")}
            >
              <Badge className="nav-badge">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10.0002 11.6667C12.3013 11.6667 14.1668 9.8012 14.1668 7.50001C14.1668 5.19882 12.3013 3.33334 10.0002 3.33334C7.69898 3.33334 5.8335 5.19882 5.8335 7.50001C5.8335 9.8012 7.69898 11.6667 10.0002 11.6667ZM10.0002 11.6667C6.31826 11.6667 3.3335 13.9053 3.3335 16.6667M10.0002 11.6667C13.6821 11.6667 16.6668 13.9053 16.6668 16.6667"
                    stroke="#807D7E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </Badge>
            </Button>

            <Button className="dis-fcc" onClick={() => navigate("/cart")}>
              <Badge className="nav-badge" count={Cartcount || 0} showZero>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M2.5 3.33334H3.00526C3.85578 3.33334 4.56986 3.97376 4.6621 4.81926L5.3379 11.0141C5.43014 11.8596 6.14422 12.5 6.99474 12.5H14.205C14.9669 12.5 15.6317 11.9834 15.82 11.2452L16.9699 6.73593C17.2387 5.68213 16.4425 4.65742 15.355 4.65742H5.5M5.52063 15.5208H6.14563M5.52063 16.1458H6.14563M14.6873 15.5208H15.3123M14.6873 16.1458H15.3123M6.66667 15.8333C6.66667 16.2936 6.29357 16.6667 5.83333 16.6667C5.3731 16.6667 5 16.2936 5 15.8333C5 15.3731 5.3731 15 5.83333 15C6.29357 15 6.66667 15.3731 6.66667 15.8333ZM15.8333 15.8333C15.8333 16.2936 15.4602 16.6667 15 16.6667C14.5398 16.6667 14.1667 16.2936 14.1667 15.8333C14.1667 15.3731 14.5398 15 15 15C15.4602 15 15.8333 15.3731 15.8333 15.8333Z"
                    stroke="#807D7E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </Badge>
            </Button>
          </Space>
        </div>
      ) : (
        <div className="nav-btns">
          <Space size={12} align="center">
            <Link to="/sign-in">
              <Button type="primary">Login</Button>
            </Link>
            <Link to="/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </Space>
        </div>
      )}
    </>
  );
};

export const ToggleTheme = ({ changeTheme }) => {
  const theme = localStorage.getItem("theme");

  return (
    <Button
      className="toggle-theme"
      onClick={changeTheme}
      icon={theme === "light" ? <SunOutlined /> : <MoonOutlined />}
    />
  );
};

export const Hamburger = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState("0");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handlenavigate = (route) => {
    setIsDropdownOpen(false);
    navigate(route);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignout = () => {
    dispatch(signoutAction());
  };

  return (
    <div className="hamburger">
      {isDropdownOpen ? (
        <>
          <div className="nav-dropdown">
            <div className="dropdown-body">
              <div>
                <Link
                  onClick={() => {
                    setSelectedKey("0");
                    setIsDropdownOpen(false);
                  }}
                  style={{ color: selectedKey === "0" ? "#8a33fd" : "black" }}
                  to={`/`}
                >
                  <span className="text-[20px] font-['Causten'] font-semibold leading-[normal] capitalize">
                    Home
                  </span>
                </Link>
              </div>
              <div>
                <Link
                  onClick={() => {
                    setSelectedKey("1");
                    setIsDropdownOpen(false);
                  }}
                  style={{ color: selectedKey === "1" ? "#8a33fd" : "black" }}
                  to="/shop"
                >
                  Shop
                </Link>
              </div>
              {auth?.user && (
                <div>
                  <Link
                    onClick={() => {
                      setSelectedKey("2");
                      setIsDropdownOpen(false);
                    }}
                    to="/cart"
                    style={{ color: selectedKey === "2" ? "#8a33fd" : "black" }}
                  >
                    Cart
                  </Link>
                </div>
              )}
              {auth?.user && (
                <div>
                  <Link
                    onClick={() => {
                      setSelectedKey("3");
                      setIsDropdownOpen(false);
                    }}
                    to="/profile/my-wishlist"
                    style={{ color: selectedKey === "3" ? "#8a33fd" : "black" }}
                  >
                    Wishlists
                  </Link>
                </div>
              )}
              <div>
                {auth?.user ? (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 20 }}
                  >
                    <Button
                      className=" bold"
                      onClick={() => handlenavigate(`/profile/my-info`)}
                    >
                      My Profile
                    </Button>
                    <Button
                      className="  bold"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleSignout();
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 20 }}
                  >
                    <Button onClick={() => handlenavigate("/sign-up")}>
                      Signup
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => handlenavigate("/sign-in")}
                    >
                      Log in
                    </Button>
                  </div>
                )}
              </div>
              <span id="close">
                <CloseOutlined
                  onClick={toggleDropdown}
                  style={{ fontSize: "24px", cursor: "pointer" }}
                />
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="nav-hamburger cursor" onClick={toggleDropdown}>
          <MenuOutlined style={{ fontSize: "24px" }} />
        </div>
      )}
    </div>
  );
};
