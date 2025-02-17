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
    setUserList(false);
  };

  return (
    <div
      className={
        window.location.pathname.includes("/admin")
          ? `navbar`
          : "allNavbar navbar"
      }
    >
      <div className="rightNav">
        <div style={{ position: "relative" }}>
          <i
            className="fa-solid fa-user fa-lg"
            onClick={() => setUserList((prev) => !prev)}
          ></i>
          {userList && (
            <div className="userListContent">
              {isLoggedIn && (
                <>
                  <span className="username">{user?.name}</span>
                  <hr />
                  <span>
                    <Link to="my-orders" onClick={() => setUserList(false)}>
                      {t("my-orders")}
                    </Link>
                  </span>
                  <hr />
                  <span>
                    <Link
                      to="favorite-products"
                      onClick={() => setUserList(false)}
                    >
                      {t("my-orders")}
                    </Link>
                  </span>
                  <button className="logout" onClick={logoutHandler}>
                    {t("logout")}
                    <i className="fa-solid fa-right-from-bracket"></i>{" "}
                  </button>
                  <br />
                </>
              )}
              <button onClick={toggleLanguage} className="languageSwitcher">
                {currentLanguage === "ar" ? "En" : "عربي"}
              </button>
            </div>
          )}
        </div>

        {isLoggedIn && (
          <Link to="/cart" style={{ position: "relative" }}>
            <span className="cartCount">{cartCount}</span>
            <i className="fa-solid fa-shopping-cart"></i>
          </Link>
        )}
      </div>

      <div className="Links">
        <NavLink to="/">{t("homePage")}</NavLink>
        <NavLink to="/products">{t("products")}</NavLink>
        {!isLoggedIn && <NavLink to="/login">{t("login")}</NavLink>}
        {isLoggedIn && user?.roles?.includes("Admin") && (
          <NavLink to="/admin">{t("admin-dashboard")}</NavLink>
        )}
      </div>
      <div style={{ width: "60px", height: "60px" }}>
        <img
          src="/assets/images/logo.webp"
          width={"100%"}
          height={"100%"}
          style={{ borderRadius: "4px" }}
          alt="logo"
        />
      </div>
    </div>
  );
};

export default Navbar;
