import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";
import gambarDefault from "../../public/d.png";

export const Navbar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState(gambarDefault); // Default image

  useEffect(() => {
    // Fetch user data from local storage when the component mounts
    const storedUserName = localStorage.getItem("userFullName");
    const storedProfileImage = localStorage.getItem("userGambarProfile");

    if (storedUserName) {
      setUserName(storedUserName);
    }

    // Set the profile image based on whether it's available in local storage
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
  }, []);

  function toggleSidebar(e) {
    e.preventDefault();
    setSidebarVisible(!sidebarVisible);
  }

  return (
    <div>
      <nav>
        <ul className={` sidebar ${sidebarVisible ? "show" : ""}`}>
          <li className="ml-5 ">
            <a href="" onClick={toggleSidebar}>
              {sidebarVisible ? (
                <svg
                  className="w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              ) : null}
            </a>
          </li>
          <li>
            <Link to={userName ? "/Profile" : "/Login"}>
              <div className="profile-section ">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-image ml-6 border-2 border-gray-900  "
                />
                <span className="profile-name">{userName || "Login"}</span>
              </div>
            </Link>
          </li>
          <li>
            <Link className="ml-6 " to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="ml-6 " to="/About">
              About
            </Link>
          </li>
          <li>
            <Link className="ml-6 " to="/Service">
              Service
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/" className=" font-bold text-xl">
              <img src="/logo-white.png" className="w-12" alt="" />
            </Link>
          </li>
          <li className="hideOnMobile">
            <Link to="/">Home</Link>
          </li>
          <li className="hideOnMobile">
            <Link to="/About">About</Link>
          </li>
          <li className="hideOnMobile">
            <Link to="/Service">Service</Link>
          </li>
          <li onClick={toggleSidebar} className="hideOnDesktop">
            <a href="">
              <img src={profileImage} alt="Profile" className="profile-image" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
