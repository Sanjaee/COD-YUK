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
      setLoading(true);

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
    } finally {
      setLoading(false); // Set loading back to false after the operation is completed
    }
  };
  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700 font-bold">
            Nama Barang Yang Di jual:
          </span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input mt-1 block w-full border p-2 border-black rounded-lg resize-none"
            placeholder="Tulis nama barang"
          />
        </label>

        {/* Nomor Telepon */}
        <label className="block">
          <span className="text-gray-700 font-bold">Nomor Whatsapp:</span>
          <input
            type="text"
            name="nomortelepon"
            value={formData.nomortelepon}
            onChange={handleChange}
            className="form-input mt-1 block w-full border p-2 border-black rounded-lg resize-none"
            placeholder="Tulis nomor seperti ini +6212345678"
          />
        </label>
        {/* Location */}
        <label className="block">
          <span className="text-gray-700 font-bold">Lokasi COD:</span>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-input mt-1 block w-full border p-2 border-black rounded-lg resize-none"
            placeholder="Cengkareng Timur,Jakarta Barat"
          />
        </label>

        {/* Date */}
        <label className="block">
          <span className="text-gray-700 font-bold">Tanggal:</span>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-input mt-1 block w-full p-2 border-black"
          />
        </label>

        {/* Image */}
        <label className="block">
          <span className="text-gray-700 font-bold">Thumbnail Barang:</span>
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
                className="max-w-full h-auto "
              />
            </div>
          )}
          {formData.image && (
            <div className="mt-2">
              <img
                src={formData.image}
                alt="Selected"
                className="max-w-full h-auto mx-auto border-2 border-gray-600 p-1"
              />
            </div>
          )}
        </label>

        {/* Image List */}
        <label className="block">
          <span className="text-gray-700 font-bold">Detail Barang:</span>
          <input
            type="file"
            name="imageList"
            onChange={handleChange}
            className="form-input mt-1 block w-full "
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
                  className="max-w-full h-auto mx-auto border-2 border-gray-600 p- m-1"
                />
              ))}
            </div>
          )}
        </label>

        {/* Price */}
        <label className="block">
          <span className="text-gray-700 font-bold">Harga Barang:</span>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-input mt-1 block w-full border p-2 border-black rounded-lg resize-none"
            placeholder="Tulis Harga seperti ini 1000000"
          />
        </label>

        {/* Status */}
        <label className="block">
          <span className="text-gray-700 font-bold">Status Barang:</span>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-input mt-1 block w-full border p-2 border-black rounded-lg"
          >
            <option value="TERSEDIA">TERSEDIA</option>
            <option value="HABIS">HABIS</option>
          </select>
        </label>

        {/* Title */}
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
            Deskripsi,Kondisi,Catatan,Spesifikasi,Barang:
          </span>
          <textarea
            type="text"
            name="about"
            value={formData.about}
            rows="auto"
            onChange={handleChange}
            className="form-input mt-1 block w-full border p-2 border-black rounded-lg resize-none"
            style={{ minHeight: "200px" }}
            placeholder="Contoh : RTX 3060 12GB MSI VENTUS
            GARANSI SAMPAI OCTOBER 2024 BY AAA 
            ADEM, NORMAL, LENGKAP, NO MINUS
            UDAH CO BURUAN DAH!"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 w-full text-white py-4  px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 "
        >
          {loading ? "Loading..." : "Edit Barang"}
        </button>
        <NotifProfile />
      </form>
    </div>
  );
};

export default EditBarang;
