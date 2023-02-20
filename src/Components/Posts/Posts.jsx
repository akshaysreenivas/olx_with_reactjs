import React from "react";
import Heart from "../../assets/Heart";
import "./Post.css";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseconfig";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { postContext } from "../../Context/postdetails";

function Posts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "products"));
    getDocs(q).then((querySnapshot) => {
      const productsData = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setProducts(productsData);
    });
  }, []);

  const { setPost } = useContext(postContext);
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.length ? (
            products.map((product) => {
              const dateTimeString = product.createdAt;
              const date = new Date(dateTimeString);
              const dateString = date.toLocaleDateString();
              return (
                <div
                  key={product.id}
                  className="card"
                  onClick={() => {
                    setPost(product);
                    navigate("/view");
                  }}
                >
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={product.url} alt={product.name} />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.category}</span>
                    <p className="name"> {product.name}</p>
                  </div>
                  <div className="date mb-1">
                    <span className=" mb-1">{dateString}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-5">
              <span>No Products to display</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Posts;
