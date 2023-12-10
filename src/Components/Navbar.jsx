import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

export const Navbar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

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
            <Link to="/Login">
              <div className="profile-section">
                <img
                  src="technical-support.png"
                  alt="Profile"
                  className="profile-image ml-6"
                />
                <span className="profile-name">Your Name</span>
              </div>
            </Link>
          </li>
          <li>
            <Link className="ml-6" to="/">
              Home
            </Link>
          </li>

          <li>
            <Link className="ml-6" to="/About">
              About
            </Link>
          </li>

          <li>
            <Link className="ml-6" to="/Service">
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
              <img
                src="technical-support.png"
                alt="Profile"
                className="profile-image"
              />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
