import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import db from "../../Api/Firebase";

const PostBarang = () => {
  const [formData, setFormData] = useState({
    about: "",
    date: "",

    image: "",
    imageList: [], // Change: Set imageList as an array
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
      // Add the data to the "Products" collection in Firebase
      const docRef = await addDoc(collection(db, "Products"), formData);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Change: If the field is 'imageList', split the input into an array
    const newValue = name === "imageList" ? value.split(",") : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Post Barang</h2>
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
            value={formData.imageList.join(",")} // Change: Join array elements into a string
            onChange={handleChange}
            className="form-input mt-1 block w-full"
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
            type="number"
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
          Post Barang
        </button>
      </form>
    </div>
  );
};

export default PostBarang;
