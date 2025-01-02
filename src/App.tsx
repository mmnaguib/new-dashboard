import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ToastContainer } from "react-toastify";
import "./i18n";
import { useEffect } from "react";
import i18n from "./i18n";
function App() {
  useEffect(() => {
    const updateStylesheet = () => {
      const currentLanguage = i18n.resolvedLanguage || i18n.language;
      const linkElement = document.getElementById("language-css");
      if (linkElement) {
        linkElement.remove();
      }
      const newLinkElement = document.createElement("link");
      newLinkElement.id = "language-css";
      newLinkElement.rel = "stylesheet";
      newLinkElement.href =
        currentLanguage === "ar" ? "/assets/arabic.css" : "/assets/english.css";
      document.head.appendChild(newLinkElement);
    };
    updateStylesheet();
    i18n.on("languageChanged", updateStylesheet);
    return () => {
      i18n.off("languageChanged", updateStylesheet);
    };
  }, []);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
