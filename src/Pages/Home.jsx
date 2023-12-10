import React from "react";
import { Navbar } from "../Components/Navbar";
import SliderHeading from "../Components/SliderHeading";
import Products from "../Components/Products";
import ServiceIcon from "../Components/Popup/IconService";

export const Home = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar />
      <SliderHeading />
      <Products />
      <ServiceIcon />
    </div>
  );
};
