import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../Api/Firebase"; // Import your Firebase configuration
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderHeading = () => {
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    // Fetch data from the "slider" collection and listen for real-time updates
    const sliderCollection = collection(db, "Slider");

    const unsubscribe = onSnapshot(sliderCollection, (querySnapshot) => {
      const sliderItems = [];
      querySnapshot.forEach((doc) => {
        sliderItems.push({ id: doc.id, ...doc.data() });
      });
      setSliderData(sliderItems);
    });

    return () => {
      // Stop listening to changes when the component is unmounted
      unsubscribe();
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="bg-gray-400 py-4 ">
      <div className="max-w-screen-lg mx-auto mt-20">
        <div className="p-6">
          <Slider {...settings}>
            {sliderData.map((item) => (
              <div key={item.id}>
                <img
                  src={item.image}
                  alt="Slider"
                  className="max-w-full h-auto rounded-2xl p-1"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default SliderHeading;
