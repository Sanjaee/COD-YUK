import React from "react";
import { Link } from "react-router-dom";
import "./Styles/IconService.css"; // Import file CSS

const ServiceIcon = () => {
  return (
    <Link to="/Service" className="service-icon">
      <img src="/technical-support.png" alt="Service Icon" />
    </Link>
  );
};

export default ServiceIcon;
