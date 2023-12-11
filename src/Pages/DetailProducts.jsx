import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../Api/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker, faStar } from "@fortawesome/free-solid-svg-icons";
import "../Styles/DetailProducts.css";
import Slider from "react-slick";
import { Navbar } from "../Components/Navbar";
import Payment from "../Components/Payments";
import ServiceIcon from "../Components/Popup/IconService";

const DetailProdutcs = () => {
  const { id } = useParams();
  const [produtcs, setProducts] = useState({ imageList: [] }); // Initialize kontrakan with an empty array for image

  useEffect(() => {
    const fetchData = async () => {
      try {
        const kontrakanRef = doc(db, "Products", id);
        const kontrakanSnapshot = await getDoc(kontrakanRef);

        if (kontrakanSnapshot.exists()) {
          const kontrakanData = {
            id: kontrakanSnapshot.id,
            ...kontrakanSnapshot.data(),
          };
          setProducts(kontrakanData);
        } else {
          // Handle the case where the document with the specified id does not exist.
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Scroll to the top when the component is mounted
    window.scrollTo(0, 0);
  }, [id]);

  const formatCurrency = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-gray-200">
      <Navbar />
      <div className="container mx-auto p-4">
        {produtcs ? (
          <div className="md:flex md:mt-24 mt-20">
            {/* Kolom 1 (Gambar) */}
            <div className="md:w-1/2 md:pr-4">
              <Slider {...settings} className="slider-container">
                {produtcs.imageList?.map((imageList, index) => (
                  <div key={index} className="slider-item">
                    <img
                      src={imageList}
                      alt={produtcs.name}
                      className="w-full h-auto md:h-full rounded object-cover"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            {/* Kolom 2 (Detail) */}
            <div className="md:w-1/2 md:pl-4">
              <p className="text-3xl text-gray-800 mb-2 font-bold mt-7">
                {formatCurrency(produtcs.price)}
              </p>
              <h2 className="text-2xl font-semibold ">{produtcs.name}</h2>
              <div
                className={`status-dot ${
                  produtcs.status === "TERSEDIA" ? "green-dot" : "red-dot"
                }`}
              ></div>
              <p className="store-card-description mt-2">{produtcs.status}</p>

              <p className="text-lg text-gray-800 mb-2">{produtcs.title}</p>
              <div className="rating">
                {Array.from({ length: produtcs.rating }, (_, index) => (
                  <FontAwesomeIcon icon={faStar} key={index} />
                ))}
              </div>
              <div className="location">
                <FontAwesomeIcon icon={faMapMarker} />{" "}
                <p className="text-lg text-gray-800 ">{produtcs.location}</p>
              </div>
              <p className="text-lg text-gray-800 ">{produtcs.date}</p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Payment />
      <ServiceIcon />
    </div>
  );
};

export default DetailProdutcs;
