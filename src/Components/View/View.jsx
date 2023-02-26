import { collection, getDocs, query, where } from "firebase/firestore";
import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { db } from "../../config/firebaseconfig";
import { postContext } from "../../Context/postdetails";
import "./View.css";

function View() {
  const [seller, setSeller] = useState({});
  const { post } = useContext(postContext);
  const dateTimeString = post.createdAt;
  const date = new Date(dateTimeString);
  const dateString = date.toLocaleDateString();
  const { userId } = post;
  useEffect(() => {
    const q = query(collection(db, "users"), where("uid", "==", userId));
    getDocs(q).then((querySnapshot) => {
      const sellerData = querySnapshot.docs[0].data();
      console.log("sellerdata", sellerData);
      setSeller(sellerData);
      console.log("seller", seller);
    });
  }, [seller, userId]);
  return (
    <Fragment>
      <div className="viewParentDiv" key={post.id}>
        <div className="imageShowDiv">
          <img src={post.url} alt="" />
        </div>
        <div className="rightSection">
          <div className="productDetails p-4">
            <p>&#x20B9;{post.price} </p>
            <span>{post.name} </span>
            <p>{post.category} </p>
            <span>{dateString}</span>
          </div>
          {seller ? (
            <div className="contactDetails p-4">
              <p>Seller details</p>
              <p>{seller.username}</p>
              <p>{seller.phone}</p>
            </div>
          ) : (
            "loading..."
          )}
        </div>
      </div>
    </Fragment>
  );
}
export default View;
