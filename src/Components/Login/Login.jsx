import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { auth } from "../../config/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Spinner from "react-bootstrap/Spinner";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setErrorMessage("")
    if (!email || email.match(/^\s*$/)) {
      setEmailError("* required");
      return;
    }
    if (!password || password.match(/^\s*$/)) {
      setPasswordError("* required");
      return;
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found")
          setErrorMessage("No user found");
        if (errorCode === "auth/wrong-password")
          setErrorMessage("Incorrect Password");
      });
  };

  return (
    <div className="loginParentDiv">
      <div className="loginDiv">
        <img
          src="https://logodownload.org/wp-content/uploads/2016/10/olx-logo-2.png"
          alt="olx"
          className="mb-4"
        />
        <h4 className="text-danger">{errorMessage}</h4>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small className="text-danger">{emailError}</small>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <div className="password_div">
            <input
              className="input "
              type={passwordType === "password" ? "password" : "text"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />

            <i onClick={togglePassword}>
              {passwordType === "password" ? (
                <span className="material-icons"> visibility_off </span>
              ) : (
                <span className="material-icons"> visibility </span>
              )}
            </i>
          </div>
          <small className="text-danger">{passwordError}</small>
          <br />
          <br />
          {loading ? (
            <button type="button">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </button>
          ) : (
            <button>login</button>
          )}
        </form>
        <span
          className="signup_link text-center"
          onClick={() => navigate("/signup")}
        >
          sign up
        </span>
      </div>
    </div>
  );
}

export default Login;
