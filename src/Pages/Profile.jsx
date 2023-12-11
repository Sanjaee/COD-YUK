import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostBarang from "../Components/PostBarang/PostBarang";

export const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = !!localStorage.getItem("userFullname");

    // If not logged in, navigate to the home page
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear all data from local storage and redirect to home page
    localStorage.clear();
    navigate("/");
  };

  // Fetch user data from local storage
  const storedUserName = localStorage.getItem("userFullName");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
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
              {storedUserName || "User"}
            </h3>
          </div>
        </div>
        <PostBarang />
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
