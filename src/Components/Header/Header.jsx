import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext } from "../../Context/Context";
import { auth } from "../../config/firebaseconfig";

function Header() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={() => navigate("/")}>
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        {user ? (
          <div className="control_links d-flex gap-3">
            <span>{user.displayName}</span>
            <span onClick={() => auth.signOut().then(() => navigate("/login"))}>
              logout
            </span>
          </div>
        ) : (
          <span className="control_links" onClick={() => navigate("/login")}>
            login
          </span>
        )}
        <div
          className="sellMenu control_links"
          onClick={() => navigate(user ? "/sell" : "/login")}
        >
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
