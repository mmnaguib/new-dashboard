import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ILoginResponse } from "../interface";

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [user, setUser] = useState<ILoginResponse | null>(null);
  const logoutHandler = () => {
    navigate("/");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="navbar" style={{ display: "flex" }}>
      <NavLink to="/">Home</NavLink> |{" "}
      {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
      {isLoggedIn && user?.roles.includes("Admin") && (
        <NavLink to="/admin">Admin</NavLink>
      )}
      {isLoggedIn && (
        <div style={{ display: "flex" }}>
          <span className="username">{user?.name}</span>
          <button className="logout" onClick={logoutHandler}>
            logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
