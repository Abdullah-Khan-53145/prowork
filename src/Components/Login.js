import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import { SignInWithGoogleAPI } from "../actions";
import { connect } from "react-redux";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { SignInWithEmailPasswordAPI } from "../actions";
function Login(props) {
  //hooks
  const navigate = useNavigate();
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    password: false,
    email: false,
    message: "",
  });

  // props desturturing
  const { signIn, signInWithGoogle } = props;

  //functions
  const LoginWithGoogle = () => {
    setError({
      password: false,
      email: false,
      message: "",
    });
    signInWithGoogle()
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        setError({
          password: true,
          email: false,
          message: "Some error occured",
        });
      });
  };

  const LoginWithEmailPassword = async (e) => {
    setError({
      password: false,
      email: false,
      message: "",
    });
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/");
        signIn(user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, "\n", errorMessage);
        if (errorCode === "auth/user-not-found") {
          setError({
            ...error,
            email: true,
            message: "User not found",
          });
        } else if (errorCode === "auth/wrong-password") {
          setError({
            ...error,
            password: true,
            message: "Incorrect password",
          });
        } else if (errorCode === "auth/invalid-email") {
          setError({
            ...error,
            email: true,
            message: "Please enter the valid Email",
          });
        }
      });
  };
  return (
    <>
      <div className="Login">
        <Link to="/" className="back_to_home">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>Back</span>
        </Link>
        <div className="login_container_parent">
          <img src="/imgs/login-illus.svg" />
          <div className="login__container">
            <h1>Login</h1>
            {/* <h2>as a {role.toUpperCase()}</h2> */}
            <form
              className="user__info__container"
              onSubmit={LoginWithEmailPassword}
            >
              <div className="info__container">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder="name@example.com"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error.email && (
                  <small style={{ color: "red" }}> {error.message} </small>
                )}
              </div>
              <div className="info__container">
                <label htmlhtmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error.password && (
                  <small style={{ color: "red" }}> {error.message} </small>
                )}
              </div>
              <input type="submit" value="LOG IN" className="primary_btn" />
            </form>

            <div className="saparator">
              <div className="line"></div>
              <div className="circle"></div>
              <div className="line"></div>
            </div>
            <button className="btn__primary" onClick={LoginWithGoogle}>
              <svg
                width="2443"
                height="2500"
                viewBox="0 0 256 262"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
              >
                <path
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  fill="#4285F4"
                />
                <path
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  fill="#34A853"
                />
                <path
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  fill="#FBBC05"
                />
                <path
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  fill="#EB4335"
                />
              </svg>
              <span>Login with google</span>
            </button>
            <br />
            <div className="signup__container">
              <small>Don't have an acount?</small>
              <span>
                <Link to="/sign-up">Create Account</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  user: state.userState.user,
});

const mapDispatchToProps = (dispatch) => ({
  signInWithGoogle: () => dispatch(SignInWithGoogleAPI()),
  signIn: (user) => dispatch(SignInWithEmailPasswordAPI(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
