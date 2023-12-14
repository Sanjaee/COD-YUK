// ProductProfile.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Api/Firebase";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductProfile = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Retrieve the user's ID from localStorage
        const userId = localStorage.getItem("userId");
        console.log("userId:", userId);

        if (!userId) {
          // Handle the case when userId is not available
          console.error("User ID not found in localStorage");
          return;
        }

        // Use the user's ID along with the product ID
        const productRef = doc(db, "Users", userId, "Products", id);
        console.log("productRef:", productRef.path);

        const productDoc = await getDoc(productRef);

        if (productDoc.exists()) {
          setProduct({
            id: productDoc.id,
            ...productDoc.data(),
          });
        } else {
          // Handle the case when the product with the given ID doesn't exist
          console.log("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const formatCurrency = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!product) {
    // You can render a loading indicator or an error message here
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.title}</p>
      <div
        className={`status-dot ${
          product.status === "TERSEDIA" ? "green-dot" : "red-dot"
        }`}
      ></div>
      <p>{product.status}</p>
      <div className="location">
        <FontAwesomeIcon icon={faMapMarker} />
        <p className="lokasi">{product.location}</p>
      </div>
      <p>{formatCurrency(product.price)}</p>
      <p>{product.date}</p>
    </div>
  );
};

export default ProductProfile;
