import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { SignOutAPI } from "../actions";
import "../Styles/Header.css";

const Header = ({ user, signOut }) => {
  const navigate = useNavigate();
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
  console.log(user);
  useEffect(() => {
    window.addEventListener("resize", setResponsiveness);
    return () => window.removeEventListener("resize", setResponsiveness);
  }, []);
  return (
    <div className="navbar__parent">
      <div className="mobile_nav">
        <Link to="/">
          <img src="/imgs/logo.png" alt="Logo" />
        </Link>
        <img onClick={handleMobNav} className="hamburger" src="/imgs/ham.svg" />
      </div>
      <div
        class="navbar"
        style={{ transform: `translateX(${isOpened ? "0%" : "100%"})` }}
      >
        <img onClick={handleMobNav} className="close" src="/imgs/close.svg" />
        <Link to="/" class="left-side">
          <img src="/imgs/logo.png" alt="Logo" />
        </Link>
        <div class="middle-section">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {user && (
            <Link className="primary_btn" to="/user-dashboard">
              Dashboard
            </Link>
          )}
        </div>
        <div class="right-side">
          <img
            src={user ? user.photoURL : "/imgs/dummy-pic.svg"}
            alt="User Profile Picture"
          />
          <div className="user__profile">
            {user ? (
              <span>
                {user.email.split("@")[0].toLowerCase().length > 11
                  ? user.email.split("@")[0].toLowerCase().slice(0, 11) + " ..."
                  : user.email.split("@")[0].toLowerCase()}
              </span>
            ) : (
              <span>guest</span>
            )}
            {user ? (
              <span>
                {user.email.length > 20
                  ? user.email.slice(0, 20) + " ..."
                  : user.email}
              </span>
            ) : (
              <span>become a part</span>
            )}
            {/* 20 character slice */}
            <div className="user__logout__modal">
              <div className="user__logout">
                <button
                  onClick={
                    user
                      ? () => {
                          navigate("/");
                          signOut();
                        }
                      : () => navigate("/log-in")
                  }
                  className="primary_btn"
                >
                  {user ? "LOGOUT" : "LOGIN"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(SignOutAPI()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
