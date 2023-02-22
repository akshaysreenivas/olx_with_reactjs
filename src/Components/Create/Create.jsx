import React, { Fragment, useContext } from "react";
import "./Create.css";
import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebaseconfig";
import { AuthContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";


const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const date = new Date().toISOString();
  const userId = user.uid;
  const Navigate = useNavigate();

  // form submitting

  const handleSubmit = () => {
    if (!name || name.match(/^\s*$/)) {
      toast.error("product name required",{position:"top-center"})
      return;
    }
    if (!category || category.match(/^\s*$/)) {
      toast.error("category required",{position:"top-center"})
      return;
    }
    if (!price || price.match(/^\s*$/)) {
      toast.error("price field required",{position:"top-center"})
      return;
    }
    if (!image) {
      toast.error("please select image",{position:"top-center"})
      return;
    }

    setLoading(true);
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);
    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(ref(storage, `images/${image.name}`)).then((url) => {
        const productsData = {
          name,
          category,
          price,
          userId: userId,
          url: url,
          createdAt: date,
        };
        addDoc(collection(db, "products"), productsData).then(() => {
          setLoading(false);
          Navigate("/");
        });
      });
    });
  };

  return (
    <Fragment>
    <div className="centerDiv">
      <div className=" formDiv rounded">
        <label htmlFor="fname">Name</label>
        <br />
        <div>
          <input
            className="input mb-2"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <div>
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <div>
          <input
            onChange={(e) => setPrice(e.target.value)}
            className="input"
            type="number"
            id="price"
            name="Price"
            value={price}
          />
        </div>
        <br />
        <br />
        {image ? (
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>
        ) : (
          ""
        )}

        <br />
        <div>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" />
        </div>
        <br />
        {loading ? (
          <button  className="uploadBtn  rounded">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          </button>
        ) : (
          <button onClick={handleSubmit}  className="uploadBtn  rounded">
            Submit
          </button>
        )}
      </div>
      </div>

    </Fragment>
  );
};

export default Create;
