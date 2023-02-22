import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { auth } from "../../config/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Spinner from "react-bootstrap/Spinner";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
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
    if (!email || email.match(/^\s*$/)) {
      toast.error("email required", { position: "top-center" });
      return;
    }
    if (!password || password.match(/^\s*$/)) {
      toast.error("password required", { position: "top-center" });
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
        toast.error("No user found", { position: "top-center" });
        if (errorCode === "auth/wrong-password")
        toast.error("Incorrect Password", { position: "top-center" });
      });
  };

  return (
    <>
      <div className="loginParentDiv">
        <div className="loginDiv">
          <img
            src="https://logodownload.org/wp-content/uploads/2016/10/olx-logo-2.png"
            alt="olx"
            className="mb-4"
          />
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
              <span className="material-icons">{passwordType ==="password" ? "visibility_off" : "visibility "}  </span>
              </i>
            </div>
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
    </>
  );
}

export default Login;
