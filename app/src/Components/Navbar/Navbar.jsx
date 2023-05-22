import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../images/Logo.png";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  let logoutNavigation = useNavigate();

  function logOut() 
  {
    localStorage.removeItem("userToken");
    logoutNavigation("/login");
  }

  
  return (
    <div>
      <nav className="navbar navbar-dark navbar-expand-lg bg-main text-white">
        <div className="container px-5">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <Link className="navbar-brand text-white fw-bold fs-4 ps-3" to="/">
            {t("Sarahah")}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className={
                i18n.language === "en"
                  ? "ms-auto navbar-nav mb-2 mb-lg-0"
                  : "me-auto navbar-nav mb-2 mb-lg-0"
              }
            >
              {localStorage.getItem("userToken") ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active text-white pe-3"
                      aria-current="page"
                      to="/"
                    >
                      {t("MyMessages")}
                    </Link>
                  </li>
                  <li onClick={logOut} className="nav-item">
                    <Link
                      className={
                        i18n.language === "en"
                          ? "nav-link text-white pe-3"
                          : "nav-link text-white ps-3"
                      }
                      to="/login"
                    >
                      {t("Logout")}
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className={
                        i18n.language === "en"
                          ? "nav-link active text-white pe-3"
                          : "nav-link active text-white ps-3"
                      }
                      aria-current="page"
                      to="/register"
                    >
                      {t("Sign")}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        i18n.language === "en"
                          ? "nav-link text-white pe-3"
                          : "nav-link text-white ps-3"
                      }
                      to="/login"
                    >
                      {t("Login")}
                    </Link>
                  </li>
                </>
              )}

              <li className="nav-item">
                {i18n.language === "en" && (
                  <Link
                    onClick={() => {
                      i18n.changeLanguage("ar");
                    }}
                    className="nav-link bg-main text-light"
                  >
                    AR
                  </Link>
                )}
                {i18n.language === "ar" && (
                  <Link
                    onClick={() => {
                      i18n.changeLanguage("en");
                    }}
                    className="nav-link bg-main text-light"
                  >
                    EN
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
