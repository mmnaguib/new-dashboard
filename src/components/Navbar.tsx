import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ILoginResponse } from "../interface";

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [user, setUser] = useState<ILoginResponse | null>(null);
  const [userList, setUserList] = useState<boolean>(false);
  const logoutHandler = () => {
    navigate("/");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUserList(false);
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div
      className={
        window.location.pathname.includes("/admin")
          ? `navbar`
          : "allNavbar navbar"
      }
    >
      <div className="navLinks">
        <NavLink to="/">الصفحة الرئيسية</NavLink>
        {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
        {isLoggedIn && user?.roles.includes("Admin") && (
          <NavLink to="/admin">لوحة الأدمن</NavLink>
        )}
      </div>
      {isLoggedIn && (
        <>
          <i
            className="fa-solid fa-user fa-lg"
            onClick={() => setUserList((prev) => !prev)}
          ></i>
          {userList && (
            <div className="userListContent">
              <span className="username">{user?.name}</span>
              <button className="logout" onClick={logoutHandler}>
                logout
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;
