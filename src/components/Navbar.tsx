import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ILoginResponse } from "../interface";
import CartService from "../services/cartService";

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [user, setUser] = useState<ILoginResponse | null>(null);
  const [userList, setUserList] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);

  const logoutHandler = () => {
    navigate("/");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUserList(false);
  };
  const cartLength = async (userId: string) => {
    if (!userId) return;
    const res = await CartService.getUserCart(userId);
    setCartCount(res.items.length);
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      cartLength(JSON.parse(storedUser).userId);
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
        {!isLoggedIn && <NavLink to="/login">تسجيل الدخول</NavLink>}
        {isLoggedIn && user?.roles.includes("Admin") && (
          <NavLink to="/admin">لوحة الأدمن</NavLink>
        )}
        {isLoggedIn && (
          <NavLink to="/cart" style={{ position: "relative" }}>
            <span className="cartCount">{cartCount}</span>
            <i className="fa-solid fa-shopping-cart"></i>
          </NavLink>
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
              <br />
              <Link to="my-orders">طلباتي</Link> <br />
              <button className="logout" onClick={logoutHandler}>
                تسجيل الخروج
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;
