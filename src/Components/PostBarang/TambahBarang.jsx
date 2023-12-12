import React, { useState } from "react";
import { getDoc, updateDoc, collection, doc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL as getStorageDownloadURL,
} from "firebase/storage";
import { db, storage } from "../../Api/Firebase";

const TambahBarang = () => {
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageListPreview, setImageListPreview] = useState([]); // Declare imageListPreview here

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const selectedImage = files[0];
      setImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage));
    } else if (name === "imageList") {
      const selectedImages = Array.from(files);
      setImageList((prevImageList) => [...prevImageList, ...selectedImages]);
      setImageListPreview((prevImageListPreview) =>
        prevImageListPreview.concat(
          selectedImages.map((img) => URL.createObjectURL(img))
        )
      );
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const uploadFile = async (file) => {
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getStorageDownloadURL(storageRef);
      console.log("File uploaded successfully:", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve userId from local storage
      const userId = localStorage.getItem("userId");
      console.log("User ID:", userId);

      if (userId) {
        const productsCollectionRef = collection(db, "Products");
        const productDocRef = doc(productsCollectionRef, userId);

        // Handle image upload and update form data
        const imageUrl = image ? await uploadFile(image) : null;
        const imageListUrls = await Promise.all(
          imageList.map((file) => uploadFile(file))
        );

        // Update form data with image URLs
        const updatedFormData = {
          ...formData,
          image: imageUrl, // Update image field
          imageList: imageListUrls, // Update imageList field
        };

        // Check if the document already exists
        const productDocSnapshot = await getDoc(productDocRef);

        if (productDocSnapshot.exists()) {
          // If the document exists, update the existing document with form data
          await updateDoc(productDocRef, updatedFormData);
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

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">About:</span>
          <input
            type="text"
            name="about"
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Date:</span>
          <input
            type="text"
            name="date"
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Image:</span>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
          {image && (
            <img
              src={imagePreview}
              alt="Selected"
              className="mt-2 max-w-full h-auto"
            />
          )}
        </label>

        <label className="block">
          <span className="text-gray-700">Image List :</span>
          <input
            type="file"
            name="imageList"
            onChange={handleChange}
            className="form-input mt-1 block w-full p-3"
            multiple
          />
          {imageListPreview.length > 0 && (
            <div className="mt-2 flex flex-wrap">
              {imageListPreview.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Selected ${index + 2}`}
                  className="max-w-full h-auto mr-2 mb-2"
                />
              ))}
            </div>
          )}
        </label>
        <input
          type="file"
          name="imageList"
          onChange={handleChange}
          className="form-input mt-1 block w-full p-3"
          multiple
        />

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
