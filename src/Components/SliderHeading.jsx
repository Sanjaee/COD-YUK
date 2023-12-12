import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Api/Firebase";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Styles/Slider.css";

const CustomPrevArrow = ({ onClick, ...rest }) => {
  const { currentSlide, slideCount, ...buttonProps } = rest;

  return (
    <button onClick={onClick} {...buttonProps} className="custom-prev-arrow">
      &#x2190;
    </button>
  );
};

const CustomNextArrow = ({ onClick, ...rest }) => {
  const { currentSlide, slideCount, ...buttonProps } = rest;

  return (
    <button onClick={onClick} {...buttonProps} className="custom-next-arrow">
      &#8594;
    </button>
  );
};

const SliderHeading = () => {
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sliderCollection = collection(db, "Slider");

    const unsubscribe = onSnapshot(sliderCollection, (querySnapshot) => {
      const sliderItems = [];
      querySnapshot.forEach((doc) => {
        sliderItems.push({ id: doc.id, ...doc.data() });
      });

      // Set a timeout for 2 seconds to show the skeleton loader
      const timeoutId = setTimeout(() => {
        setSliderData(sliderItems);
        setLoading(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    });

    return () => {
      unsubscribe();
    };
  }, []); // No dependencies, runs once

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="bg-gray-400 py-4">
      <div className="max-w-screen-lg mx-auto mt-16">
        <div className="p-3 slider-item">
          {loading ? (
            <div className="skeleton-container">
              <Skeleton height={470} width="100%" />
            </div>
          ) : (
            <Slider {...settings}>
              {sliderData.map((item) => (
                <div key={item.id}>
                  <img
                    src={item.image}
                    alt="Slider"
                    className="max-w-full h-auto rounded-lg p-1"
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default SliderHeading;
