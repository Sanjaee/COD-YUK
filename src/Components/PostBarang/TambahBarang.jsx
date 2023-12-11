// AddBarang.js

import React, { useState } from "react";
import { getDoc, updateDoc, collection, doc } from "firebase/firestore";
import db from "../../Api/Firebase";

const TambahBarang = () => {
  const [formData, setFormData] = useState({
    about: "",
    date: "",
    image: "",
    imageList: [],
    location: "",
    name: "",
    nomortelepon: "",
    price: "",
    status: "",
    title: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve userId from local storage
      const userId = localStorage.getItem("userId");
      console.log("User ID:", userId);

      if (userId) {
        const productsCollectionRef = collection(db, "Products");
        const productDocRef = doc(productsCollectionRef, userId);

        // Check if the document already exists
        const productDocSnapshot = await getDoc(productDocRef);

        if (productDocSnapshot.exists()) {
          // If the document exists, update the existing document with form data
          await updateDoc(productDocRef, formData);
          console.log("Document updated successfully!");
        } else {
          console.error("Product document does not exist");
        }
      } else {
        console.error("User ID not found in local storage");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Change: If the field is 'imageList', handle empty value and split the input into an array
    const newValue =
      name === "imageList"
        ? value
          ? value.split(",")
          : [] // Use an empty array if value is undefined
        : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">About:</span>
          <input
            type="text"
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Date:</span>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Image:</span>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">
            Image List (comma-separated URLs):
          </span>
          <input
            type="text"
            name="imageList"
            value={formData.imageList.join(",")}
            onChange={handleChange}
            className="form-input mt-1 block w-full p-3"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Location:</span>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Nomor Telepon:</span>
          <input
            type="text"
            name="nomortelepon"
            value={formData.nomortelepon}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Price:</span>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Status:</span>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Title:</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Add Barang
        </button>
      </form>
    </div>
  );
};

export default TambahBarang;
