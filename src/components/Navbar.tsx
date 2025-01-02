import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ILoginResponse } from "../interface";
import { useCart } from "../utils/CartProvider";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [user, setUser] = useState<ILoginResponse | null>(null);
  const [userList, setUserList] = useState<boolean>(false);
  const { cartCount } = useCart();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.resolvedLanguage);
  const { t }: { t: (key: string) => string } = useTranslation();

  const logoutHandler = () => {
    navigate("/");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUserList(false);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
      document.body.dir = lng === "ar" ? "rtl" : "ltr";
    };

    handleLanguageChange(String(i18n.resolvedLanguage));

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div
      className={
        window.location.pathname.includes("/admin")
          ? `navbar`
          : "allNavbar navbar"
      }
    >
      <div className="navLinks">
        <NavLink to="/">{t("homePage")}</NavLink>
        {!isLoggedIn && <NavLink to="/login">{t("login")}</NavLink>}
        {isLoggedIn && user?.roles?.includes("Admin") && (
          <NavLink to="/admin">{t("admin-dashboard")}</NavLink>
        )}
        {isLoggedIn && (
          <NavLink to="/cart" style={{ position: "relative" }}>
            <span className="cartCount">{cartCount}</span>
            <i className="fa-solid fa-shopping-cart"></i>
          </NavLink>
        )}
      </div>
      <button onClick={toggleLanguage} className="languageSwitcher">
        {currentLanguage === "ar" ? "English" : "العربية"}
      </button>
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
              <Link to="my-orders" onClick={() => setUserList(false)}>
                {t("my-orders")}
              </Link>{" "}
              <br />
              <button className="logout" onClick={logoutHandler}>
                {t("logout")}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;
