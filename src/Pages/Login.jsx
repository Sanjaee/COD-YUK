import React, { useState } from "react";
import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../Api/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Check if the user with the provided email exists in Firestore
      const userQuery = query(
        collection(db, "Products"),
        where("email", "==", email)
      );

      const userSnapshot = await getDocs(userQuery);

      // If the user exists, check the password (assuming a field named "password" exists in Firestore)
      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();

        if (userData.password === password) {
          // Password is correct
          toast.success("Login successful!");

          // Store user information in local storage
          localStorage.setItem("userId", userSnapshot.docs[0].id);
          localStorage.setItem("userEmail", userData.email);
          localStorage.setItem("userFullname", userData.fullname);

          // Check if each field exists before setting it in local storage
          if (userData.about) localStorage.setItem("userAbout", userData.about);
          if (userData.date) localStorage.setItem("userDate", userData.date);

          if (userData.image) localStorage.setItem("userImage", userData.image);

          // Check if "imageList" exists and has elements before setting in local storage
          if (userData.imageList && userData.imageList.length > 0) {
            localStorage.setItem(
              "userImageList",
              JSON.stringify(userData.imageList)
            );
          }

          if (userData.location)
            localStorage.setItem("userLocation", userData.location);
          if (userData.name) localStorage.setItem("userName", userData.name);
          if (userData.nomortelepon)
            localStorage.setItem("userNomorTelepon", userData.nomortelepon);
          if (userData.price) localStorage.setItem("userPrice", userData.price);
          if (userData.status)
            localStorage.setItem("userStatus", userData.status);
          if (userData.title) localStorage.setItem("userTitle", userData.title);

          // Redirect to the desired page upon successful login
          navigate("/");
        } else {
          // Password is incorrect
          toast.error("PASSWORD SALAH");
        }
      } else {
        // User does not exist
        toast.error("AKUN TIDAK TERDAFTAR");
      }
    } catch (error) {
      console.error("Login error", error.message);
      // Show error toast
      toast.error(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className=" items-start mb-11">
          <Link to="/">&larr; Kembali</Link>
        </div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
            <p className="font-bold  text-center mt-5">
              Belum Punya Akun ?{" "}
              <Link
                to="/Register"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Login;
