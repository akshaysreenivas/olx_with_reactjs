import React, { useContext, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import Home from "./Pages/Home";
import Create from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";
import Postdetails from "./Context/postdetails";
import { AuthContext } from "./Context/Context";
import { auth } from "./config/firebaseconfig";
import { ToastContainer } from "react-toastify";

function App() {
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user));
  });
  return (
    <div>
      <Postdetails>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/sell" element={<Create />} />
          <Route path="/view" element={<ViewPost />} />
        </Routes>
      </Postdetails>
      <ToastContainer />
    </div>
  );
}

export default App;
