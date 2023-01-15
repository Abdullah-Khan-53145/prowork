import { useEffect, useState } from "react";
import "../Styles/Header.css";

export const Header = () => {
  const [isOpened, seIsOpened] = useState(
    window.innerWidth > 756 ? true : false
  );
  const handleMobNav = () => {
    seIsOpened(!isOpened);
  };
  const setResponsiveness = () => {
    if (window.innerWidth > 756) {
      seIsOpened(true);
    } else {
      seIsOpened(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", setResponsiveness);
    return () => window.removeEventListener("resize", setResponsiveness);
  }, []);
  return (
    <div className="navbar__parent">
      <div className="mobile_nav">
        <img src="/imgs/logo.png" alt="Logo" />
        <img onClick={handleMobNav} className="hamburger" src="/imgs/ham.svg" />
      </div>
      <div
        class="navbar"
        style={{ transform: `translateX(${isOpened ? "0%" : "100%"})` }}
      >
        <img onClick={handleMobNav} className="close" src="/imgs/close.svg" />
        <div class="left-side">
          <img src="/imgs/logo.png" alt="Logo" />
        </div>
        <div class="middle-section">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <button className="primary_btn" href="#">
            Switch to buying
          </button>
        </div>
        <div class="right-side">
          <img
            src="https://via.placeholder.com/300x300.png?text=Dummy+Profile+Picture"
            alt="User Profile Picture"
          />
          <div className="user__profile">
            <span>User Name</span>
            <span>UserName@example.com</span>
            {/* 20 character slice */}
            <div className="user__logout__modal">
              <div className="user__logout">
                <button className="primary_btn" href="#">
                  LOGOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
