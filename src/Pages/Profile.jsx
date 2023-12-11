import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import db from "../Api/Firebase";

import TambahBarang from "../Components/PostBarang/TambahBarang";
import UpdateBarang from "../Components/PostBarang/UpdateBarang";

export const Profile = () => {
  const navigate = useNavigate();
  const [barangAdded, setBarangAdded] = useState(false);
  const [userProduct, setUserProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        // If userId is not available, navigate to the home page
        navigate("/");
        return;
      }

      const userProductRef = doc(db, "Products", userId);
      const userProductDoc = await getDoc(userProductRef);

      if (userProductDoc.exists()) {
        setUserProduct({
          id: userProductDoc.id,
          ...userProductDoc.data(),
        });

        // Set up a real-time listener for updates
        const unsubscribe = onSnapshot(userProductRef, (doc) => {
          setUserProduct({
            id: doc.id,
            ...doc.data(),
          });
        });

        // Make sure to unsubscribe when the component unmounts
        return () => {
          unsubscribe();
        };
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    // Clear all data from local storage and redirect to the home page
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            <div className=" items-start mb-11 font-bold">
              <Link to="/">&larr; Kembali</Link>
            </div>
            Profile
          </h2>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-shrink-0">
            <img
              className="h-20 w-20 rounded-full"
              src="technical-support.png"
              alt="Profile"
            />
          </div>
          <div className="ml-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {localStorage.getItem("userFullName") || "User"}
            </h3>
          </div>
        </div>

        {/* Render either TambahBarang or UpdateBarang based on the state */}
        {userProduct && userProduct.status ? (
          <UpdateBarang />
        ) : (
          <TambahBarang onBarangAdded={() => setBarangAdded(true)} />
        )}

        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
