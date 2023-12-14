import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../Api/Firebase";
import TambahBarang from "../Components/PostBarang/TambahBarang";
import EditBarang from "../Components/PostBarang/UpdateBarang";

export const Profile = () => {
  const navigate = useNavigate();
  const [barangAdded, setBarangAdded] = useState(false);
  const [userProduct, setUserProduct] = useState(null);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

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
    setShowLogoutConfirmation(true);
  };

  const confirmLogout = () => {
    // Clear local storage and navigate to the home page
    localStorage.clear();
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className=" items-start mb-11 font-bold">
            <Link to="/">&larr; Kembali</Link>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
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
              Hi! {localStorage.getItem("userFullname") || "User"}
            </h3>
          </div>
        </div>

        {/* Render either TambahBarang or UpdateBarang based on the state */}
        {userProduct && userProduct.status ? (
          <EditBarang />
        ) : (
          <TambahBarang onBarangAdded={() => setBarangAdded(true)} />
        )}

        <div className=" items-start mb-11 font-bold text-2xl">
          <Link to="/">&larr; Kembali</Link>
        </div>

        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        </div>

        {/* Logout Confirmation Modal */}
        {showLogoutConfirmation && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-5 rounded-md">
              <p>Are you sure you want to logout?</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={confirmLogout}
                  className="mr-2 text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-md"
                >
                  Yes
                </button>
                <button
                  onClick={cancelLogout}
                  className="text-gray-600 hover:text-gray-700 py-2 px-4 rounded-md"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
