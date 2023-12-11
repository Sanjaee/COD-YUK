import React, { useState, useEffect } from "react";
import { addDoc, collection, updateDoc, doc, getDoc } from "firebase/firestore";
import db from "../../Api/Firebase";

const UpdateBarang = () => {
  const storedUserId = localStorage.getItem("userId");
  const [userId, setUserId] = useState(storedUserId);

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

  useEffect(() => {
    // If you have a userId, fetch existing data from Firebase and populate the form
    const fetchData = async () => {
      if (userId) {
        const docRef = doc(db, "Products", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
      }
    };

    fetchData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (userId) {
        // Update existing document
        await updateDoc(doc(db, "Products", userId), formData);
        console.log("Document updated with ID: ", userId);
      } else {
        // Add new document
        const newDocRef = await addDoc(collection(db, "Products"), formData);
        const newUserId = newDocRef.id;

        // Save the new user ID to local storage
        localStorage.setItem("userId", newUserId);

        setUserId(newUserId);

        console.log("Document added with ID: ", newUserId);
      }
    } catch (error) {
      console.error("Error adding/updating document: ", error);
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
      <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* About */}
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

        {/* Date */}
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

        {/* Image */}
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

        {/* Image List (comma-separated URLs) */}
        <label className="block">
          <span className="text-gray-700">
            Image List (comma-separated URLs):
          </span>
          <input
            type="text"
            name="imageList"
            value={formData.imageList.join(",")} // Change: Join array elements into a string
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        {/* Location */}
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

        {/* Name */}
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

        {/* Nomor Telepon */}
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

        {/* Price */}
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

        {/* Status */}
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

        {/* Title */}
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
          {userId ? "Update Barang" : "Post Barang"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBarang;
