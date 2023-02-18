import React, { useState } from "react";
import "./Signup.css";
import { auth } from "../../config/firebaseconfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebaseconfig";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [NameError, setNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordError("");
    setEmailError("");
    setNameError("");
    if (!username || username.match(/^\s*$/)) {
      setNameError("* username field required");
      return;
    }
    if (!email || email.match(/^\s*$/)) {
      setEmailError("* email field required");
      return;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError("Invalid email address");
      return;
    }

    if (!password || password.match(/^\s*$/)) {
      setPasswordError("* Password field required");
      return;
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "password should contain at least one uppercase letter, one lowercase letter, one digit, and at least 8 characters"
      );
      return;
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        const userData = { username, phone, email, uid: user.uid };
        updateProfile(user, {
          displayName: username,
        });
        addDoc(collection(db, "users"), userData).then(() => {
          setLoading(false);
          navigate("/login");
        });
      })
      .catch((error) => {
        setLoading(false);
        // Handle sign-up errors
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          alert("email already exists");
        }
      });
  };

  return (
    <div className="signupParentDiv">
      <div className="signupDiv">
        <img
          src="https://logodownload.org/wp-content/uploads/2016/10/olx-logo-2.png"
          alt="logo"
        ></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <small className="text-danger">{NameError}</small>

          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <small className="text-danger">{EmailError}</small>

          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
          />
          <br />
          <label htmlFor="password">Password</label>
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

          <small className="text-danger">{PasswordError}</small>
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
            <button>Signup</button>
          )}
        </form>
        <span
          className="login_link text-center d-block m-auto"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </div>
    </div>
  );
}
