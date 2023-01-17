import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { connect } from "react-redux";
import { auth } from "../firebase";
import { SignInWithEmailPasswordAPI } from "../actions";
import { useNavigate } from "react-router-dom";
import { collection, query, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

import "../Styles/Login.css";
import "../Styles/Signup.css";
function Signup(props) {
  // navigator
  const navigation = useNavigate();
  // props destructuring
  const { signIn, user } = props;
  // states
  const [profilePicture, setProfilePicture] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfrimPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("white");
  const [passwordLenValidation, setpasswordLenValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  // Function to register the user to firebase with profile picture and Display Name using storage
  const registerUser = (user) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        if (profilePicture !== "") {
          const metadata = {
            contentType: "image/jpeg",
          };
          const upload = ref(storage, `profile-pics/${profilePicture.name}`);
          const uploadTask = uploadBytesResumable(
            upload,
            profilePicture,
            metadata
          );

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(progress);
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
                  console.log("zero");
                  break;
              }
            },
            (error) => console.log(error, "error uploading image"),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  updateProfile(auth.currentUser, {
                    displayName: user.displayName,
                    photoURL: downloadURL,
                    uid: auth.currentUser.uid + " patient",
                  })
                    .then(() => {
                      setLoading(false);
                      const user = userCredential.user;

                      signIn(user);
                      console.log(user);
                      navigation("/");
                    })
                    .catch((error) => {
                      setLoading(false);
                      const errorCode = error.code;
                      const errorMessage = error.message.substr(10);
                      setError(errorMessage);
                      console.log(errorCode, "\n", errorMessage, "this one");
                    });
                }
              );
            }
          );
        }
        // Signed in
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message.substr(10);
        console.log(errorCode, "\n", errorMessage, "this one");
        if (errorCode === "auth/email-already-in-use") {
          setEmailValidation(true);
          console.log("hello");
        } else if (errorCode === "auth/weak-password") {
          setpasswordLenValidation(true);
          console.log("hello");
        } else {
          setError(errorCode);
        }
      });
  };

  // function to display the selected profilr picture from computer on the page in real time
  const handleChange = (e) => {
    let profilePicture = e.target.files[0];
    if (profilePicture === "" || profilePicture === undefined) {
      return;
    }
    setProfilePicture(profilePicture);
  };

  // fuction to handle all the submit click of the form and to handle the errors and call the above registeration function
  const handleSignUp = (e) => {
    e.preventDefault();
    setEmailValidation(false);
    setpasswordLenValidation(false);
    setError("");

    if (profilePicture) {
      let user = {
        email: email,
        password: password,
        displayName: displayName,
      };
      registerUser(user);
    } else {
      setError("Profile picture required, ");
    }
  };



  return (
    <>
      <div className="Login">
        <Link to="/log-in" className="back_to_home">
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
        <div
          className="login_container_parent"
          style={{ flexDirection: "row-reverse" }}
        >
          <img src="/imgs/signup-illus.svg" />
          <div className="login__container">
            <h1>Sign up</h1>
            <form className="user__info__container" onSubmit={handleSignUp}>
              {profilePicture ? (
                <img src={URL.createObjectURL(profilePicture)} alt="" />
              ) : user && user.photoURL ? (
                <img src={user.photoURL} alt="" />
              ) : (
                <img src="/imgs/dummy-pic.svg" alt="" />
              )}

              <input
                type="file"
                name="myImage"
                accept="image/png, image/gif, image/jpeg"
                id="profile__pic"
                onChange={handleChange}
              />
              <label className="upload__profile" htmlFor="profile__pic">
                Upload Profile Picture
              </label>

              <div className="info__container">
                <label htmlFor="first_name">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  name="first_name"
                  id="first_name"
                  value={displayName}
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                  }}
                />
              </div>

              <div className="info__container">
                <label htmlFor="email">Email</label>
                <input
                  required
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {emailValidation && (
                  <small style={{ color: "red" }}>Email already in use</small>
                )}
              </div>
              <div className="info__container">
                <label htmlFor="password">Password</label>
                <input
                  required={false}
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {passwordLenValidation && (
                  <small style={{ color: "red" }}>
                    Password should be at least 6 characters.
                  </small>
                )}
              </div>
              <div className="info__container">
                <label htmlFor="confrim_password">Confrim Password</label>
                <input
                  required={false}
                  type="password"
                  placeholder="Confrim Password"
                  name="confrim_password"
                  id="confrim_password"
                  value={confrimPassword}
                  onChange={(e) => {
                    setConfrimPassword(e.target.value);
                    if (confrimPassword.length !== 0) {
                      if (e.target.value === password) {
                        setPasswordValidation("green");
                      } else {
                        setPasswordValidation("red");
                      }
                    }
                  }}
                />

                {passwordValidation === "red" ? (
                  <small style={{ color: passwordValidation }}>
                    password doesn't match
                  </small>
                ) : passwordValidation === "green" ? (
                  <small style={{ color: passwordValidation }}>
                    password match
                  </small>
                ) : (
                  <small style={{ color: passwordValidation }}></small>
                )}
                {error !== "" && (
                  <small style={{ fontWeight: "600", color: "red" }}>
                    {error} Try again
                  </small>
                )}
              </div>

              <button
                disabled={passwordValidation === "red" && loading}
                type="submit"
                className="primary_btn"
              >
                {loading ? (
                  <>
                    <div class="btn-loading-animation">
                      <div
                        style={{ background: "#ca323f" }}
                        class="btn-loading-bar"
                      ></div>
                      <div
                        style={{ background: "#ca323f" }}
                        class="btn-loading-bar"
                      ></div>
                      <div
                        style={{ background: "#ca323f" }}
                        class="btn-loading-bar"
                      ></div>
                      <div
                        style={{ background: "#ca323f" }}
                        class="btn-loading-bar"
                      ></div>
                    </div>
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            <div className="saparator">
              <div className="line"></div>
              <div className="circle"></div>
              <div className="line"></div>
            </div>

            <br />
            <div className="signup__container">
              <small>Already have an acount?</small>
              <span>
                <Link to="/log-in">Sign in</Link>
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
  signIn: (user) => dispatch(SignInWithEmailPasswordAPI(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
