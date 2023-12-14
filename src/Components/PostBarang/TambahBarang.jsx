import React, { useState } from "react";
import { getDoc, updateDoc, collection, doc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL as getStorageDownloadURL,
} from "firebase/storage";
import { db, storage } from "../../Api/Firebase";
import { toast } from "react-toastify";
import { NotifProfile } from "../Popup/NotifProfile";

const TambahBarang = () => {
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageListPreview, setImageListPreview] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

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
          image: imageUrl,
          imageList: imageListUrls,
        };

        // Check if the document already exists
        const productDocSnapshot = await getDoc(productDocRef);

        if (productDocSnapshot.exists()) {
          // If the document exists, update the existing document with form data
          await updateDoc(productDocRef, updatedFormData);
          toast.success("Product added successfully!", {
            position: "top-right",
          });
          console.log("Document updated successfully!");

          // Clear input fields and image previews after successful update
          setImage(null);
          setImageList([]);
          setImagePreview(null);
          setImageListPreview([]);

          setFormData({
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
      <h2 className="text-2xl font-semibold mb-4">Posting Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Nama Barang Yang Di jual::</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input mt-1 block w-full border p-2 border-black rounded-lg"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Nomor WhatsApp:</span>
          <input
            type="text"
            name="nomortelepon"
            value={formData.nomortelepon}
            onChange={handleChange}
            className="form-input mt-1 block w-full border p-2 border-black rounded-lg"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Lokasi COD/Tempat Jual :</span>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-input mt-1 block w-full border p-2 border-black rounded-lg"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Tanggal:</span>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="form-input mt-1 block w-full border p-2 border-black rounded-lg"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Thumbnail Barang:</span>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="form-input mt-1 block w-full "
          />
          {image && (
            <img
              src={imagePreview}
              alt="Selected"
              className="mt-2 max-w-full h-auto mx-auto border-2 border-gray-600 p-2"
            />
          )}
        </label>

        <label className="block">
          <span className="text-gray-700">Detail Barang :</span>
          <input
            type="file"
            name="imageList"
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            multiple
          />
          {imageListPreview.length > 0 && (
            <div className="mt-2 flex flex-wrap">
              {imageListPreview.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Selected ${index + 2}`}
                  className="max-w-full h-auto  mx-auto border-2 border-gray-600 p-2"
                />
              ))}
            </div>
          )}
        </label>

        <label className="block">
          <span className="text-gray-700">Harga Barang:</span>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-input mt-1 block w-full border p-2 border-black rounded-lg"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Status Barang:</span>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-input mt-1 block w-full border p-2 border-black rounded-lg"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-bold">
            {" "}
            Catatan/Sepesifikasi barang (Opsional):
          </span>
          <textarea
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input mt-1 block w-full border p-2 border-black rounded-lg resize-none"
            style={{ minHeight: "200px" }}
            placeholder="Contoh : Boleh Nego sampai jadi.. "
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-bold">
            Deskripsi,Kondisi,Catatan,Spesifikasi:
          </span>
          <textarea
            type="text"
            name="about"
            value={formData.about}
            rows="auto"
            onChange={handleChange}
            className="form-input mt-1 block w-full border p-2 border-black rounded-lg resize-none"
            style={{ minHeight: "200px" }}
            placeholder="Contoh : RTX 3060 12GB MSI VENTU  GARANSI SAMPAI OCTOBER 2024 BY AAA  ADEM, NORMAL, LENGKAP, NO MINUS UDAH CO BURUAN DAH!"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 w-full text-white py-3 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          {loading ? "Loading..." : "Posting Barang"}
        </button>
        <NotifProfile />
      </form>
    </div>
  );
};

export default TambahBarang;
