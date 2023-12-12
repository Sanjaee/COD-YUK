import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { db } from "../Api/Firebase";
import "../Styles/Products.css";
import { Link } from "react-router-dom";
import { faStar, faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "react-loading-skeleton";

const Products = () => {
  const [kontrakan, setKontrakan] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const kontrakanCollection = collection(db, "Products");
      const kontrakanSnapshot = await getDocs(kontrakanCollection);
      const kontrakanData = kontrakanSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Simulate a 1.5-second loading delay
      setTimeout(() => {
        setKontrakan(kontrakanData);
        setLoading(false);
      }, 900);

      // Set up a real-time listener for updates
      const unsubscribe = onSnapshot(kontrakanCollection, (querySnapshot) => {
        const updatedKontrakanData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setKontrakan(updatedKontrakanData);
      });

      // Make sure to unsubscribe when the component unmounts
      return () => {
        unsubscribe();
      };
    };

    fetchData();
  }, []);

  const formatCurrency = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const filteredKontrakan = kontrakan.filter((item) => {
    return (
      item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <section className="mx-auto max-w-7xl p-4 sm:px-2 lg:px-2 lg:py-6 min-h-[50vh]">
      <div className="flex flex-col space-y-10">
        <h1 className="text-xl font-extrabold sm:text-3xl ml-2 ">
          Daftar Barang Cod
        </h1>
        <div>
          <input
            className="input"
            type="text"
            placeholder="Search Barang..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className=" text-sm font-bold  ml-2 mt-4">
            Tersedia: {filteredKontrakan.length} Barang
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
          {loading
            ? filteredKontrakan.map((item, index) => (
                <div key={index} className="store-card">
                  <div className="skeleton-container">
                    <Skeleton height={200} width="100%" />
                  </div>
                </div>
              ))
            : filteredKontrakan.map((item) => (
                <Link
                  to={`/DetailProducts/${item.id}`}
                  key={item.id}
                  className="store-card"
                >
                  <div className="store-card-inner">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="store-card-image"
                    />

                    <div className="store-card-details">
                      <div className="store-card-title-wrapper">
                        <h2 className="store-card-title">{item.name}</h2>
                      </div>

                      <p className="store-card-description">{item.title}</p>
                      <div
                        className={`status-dot ${
                          item.status === "TERSEDIA" ? "green-dot" : "red-dot"
                        }`}
                      ></div>
                      <p className="store-card-description">{item.status}</p>

                      <div className="location">
                        <FontAwesomeIcon icon={faMapMarker} />{" "}
                        <p className="lokasi">{item.location}</p>
                      </div>
                      <p className="store-card-price">
                        {formatCurrency(item.price)}
                      </p>
                      <div className="rating">
                        {Array.from({ length: item.rating }, (_, index) => (
                          <FontAwesomeIcon icon={faStar} key={index} />
                        ))}
                      </div>
                      <p className="store-card-description">{item.date}</p>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
