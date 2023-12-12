import React, { useState, useEffect } from "react";
import { getDoc, updateDoc, doc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../Api/Firebase";
import { toast } from "react-toastify";
import { NotifProfile } from "../Popup/NotifProfile";

const EditBarang = () => {
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageListPreview, setImageListPreview] = useState([]);

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
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.error("User ID not found in local storage");
          return;
        }

        const productDocRef = doc(db, "Products", userId);
        const productDocSnapshot = await getDoc(productDocRef);
        const productData = productDocSnapshot.data();

        if (productData) {
          setFormData(productData);

          // Modify this part to correctly form the image URLs
          const imageUrls = await Promise.all(
            productData.imageList.map(async (imageName) => {
              try {
                const storageRef = ref(storage, `images/${imageName}`);
                const url = await getDownloadURL(storageRef);
                return url;
              } catch (error) {
                console.error(
                  "Error getting download URL for",
                  imageName,
                  error
                );
                return null;
              }
            })
          );

          setImageListPreview(imageUrls.filter((url) => url !== null));
        } else {
          console.error("Product document does not exist");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchData();
  }, []);

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
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const uploadFile = async (file) => {
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
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
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.error("User ID not found in local storage");
        // Redirect the user to the login page or handle the case where userId is not defined
        return;
      }

      const productsCollectionRef = collection(db, "Products");
      const productDocRef = doc(productsCollectionRef, userId);

      let imageUrl = null;
      let imageListUrls = [];

      // Upload new image if selected
      if (image) {
        imageUrl = await uploadFile(image);
      }

      // Upload new imageList if selected
      if (imageList.length > 0) {
        imageListUrls = await Promise.all(
          imageList.map((file) => uploadFile(file))
        );
      }

      const updatedFormData = {
        ...formData,
        image: imageUrl || formData.image, // Use existing image URL if not updated
        imageList:
          imageListUrls.length > 0 ? imageListUrls : formData.imageList, // Use existing imageList if not updated
      };

      const productDocSnapshot = await getDoc(productDocRef);

      if (productDocSnapshot.exists()) {
        await updateDoc(productDocRef, updatedFormData);
        toast.success("Product updated successfully!", {
          position: "top-right",
        });
        console.log("Document updated successfully!");

        setImage(null);
        setImageList([]);
        setImagePreview(null);
        setImageListPreview([]);
      } else {
        console.error("Product document does not exist");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
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
            type="file"
            name="image"
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
          {image && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Selected"
                className="max-w-full h-auto"
              />
            </div>
          )}
          {formData.image && (
            <div className="mt-2">
              <img
                src={formData.image}
                alt="Selected"
                className="max-w-full h-auto"
              />
            </div>
          )}
        </label>

        {/* Image List */}
        <label className="block">
          <span className="text-gray-700">Image List:</span>
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
                  alt={`Selected ${index + 1}`}
                  className="max-w-full h-auto mr-2 mb-2"
                />
              ))}
            </div>
          )}

          {formData.imageList.length > 0 && (
            <div className="mt-2 flex flex-wrap">
              {formData.imageList.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Selected ${index + 1}`}
                  className="max-w-full h-auto mr-2 mb-2"
                />
              ))}
            </div>
          )}
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
          Edit Product
        </button>
        <NotifProfile />
      </form>
    </div>
  );
};

export default EditBarang;
