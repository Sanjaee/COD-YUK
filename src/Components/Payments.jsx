import React, { useEffect, useState } from "react";
import "../Components/Popup/Styles/Notification.css";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import PopUp from "./Popup/ButtonDetailProducts";
import db from "../Api/Firebase";

const Payment = () => {
  const { id } = useParams();
  const [products, setProducts] = useState(null); // Add this line to declare the state variable

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

    fetchData(); // Fetch data when the component mounts
  }, [id]);

  const [formData, setFormData] = useState({
    namaAkun: "",
    nomorOrderan: "",
    email: "",
    catatan: "",
  });

  const nomor = products?.nomortelepon;
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleWhatsApp = () => {
    // Tampilkan popup
    setPopupVisible(true);

    setTimeout(() => {
      setPopupVisible(false);
    }, 1500);

    // Tunggu 3 detik sebelum diarahkan ke WhatsApp
    setTimeout(() => {
      const { namaAkun, nomorOrderan, email, catatan } = formData;

      const message = ` %0D%0ANAMA : ${namaAkun}%0D%0ANOMOR TELEPON: ${nomorOrderan}%0D%0AEMAIL: ${email}%0DPESAN PEMBELI: ${catatan}`;

      // Mengirim pesan WhatsApp
      window.open(
        `https://api.whatsapp.com/send?phone=${nomor}&text=${message}`
      );

      // Mengosongkan input setelah mengirim
      setFormData({
        namaAkun: "",
        nomorOrderan: "",
        email: "",
        catatan: "",
      });
    }, 2000);
  };

  return (
    <div>
      <div></div>
      <div className=" justify-end items-end flex mt-8 mr-2 ">
        {isPopupVisible && <PopUp />}
      </div>

      {/* card 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 p-4 ">
        <div className="bg-white text-black p-4 rounded-xl">
          <div className="text-gray-700 text-xl font-bold  hover:underline">
            <Link to="/">&larr; Kembali</Link>
          </div>
          <div className=" justify-center items-center grid">
            <img
              src="/logo-white.png"
              alt=""
              className=" w-24 rounded-xl ml-6 mb-16"
            />

            <div className=" bg-WarnaAteng w-28 h-1 rounded-xl"></div>
          </div>
          <h1 className=" mt-5 font-bold text-lg">Catatan Si Penjual :</h1>
          <div className="  mt-4">
            <ul>
              <li>{products?.about}</li>
            </ul>
          </div>
          <h1 className=" font-bold text-red-500 mt-12">
            Estimasi Proses Kita Usahakan Secepatnya Minimal 12 Jam - Maximal
            2x24 Jam **Catatan Penting!!! : SESUDAH PESAN MOHON JANGAN MEMBAYAR
            TERLEBIH DAHULU SEBELUM DIKONFIRASI**{" "}
          </h1>
        </div>
        {/* card 2 */}
        <div className="col-span-2 p-4">
          <h1 className="text-2xl font-bold mb-4">Product Information:</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">NAMA </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                name="namaAkun"
                onChange={handleChange}
                value={formData.namaAkun}
                placeholder="NAMA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">NOMOR TELEPON</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-md"
                name="nomorOrderan"
                onChange={handleChange}
                value={formData.nomorOrderan}
                placeholder="+62812345678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">EMAIL</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="email@gmail.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                KIRIM PESAN KE PENJUAL
              </label>
              <div>
                <textarea
                  className="w-full px-4 py-2 border rounded-md "
                  name="catatan"
                  placeholder="Opsional"
                  onChange={handleChange}
                  value={formData.catatan}
                  rows={4}
                ></textarea>
                <button className="button" id="tombol" onClick={handleWhatsApp}>
                  <span>Chat Now via WhatsApp</span>
                  <svg
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g id="SVGRepo_bgCarrier"></g>
                    <g id="SVGRepo_tracerCarrier"></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <defs> </defs>{" "}
                      <g id="cart">
                        {" "}
                        <circle
                          r="1.91"
                          cy="20.59"
                          cx="10.07"
                          className="cls-1"
                        ></circle>{" "}
                        <circle
                          r="1.91"
                          cy="20.59"
                          cx="18.66"
                          className="cls-1"
                        ></circle>{" "}
                        <path
                          d="M.52,1.5H3.18a2.87,2.87,0,0,1,2.74,2L9.11,13.91H8.64A2.39,2.39,0,0,0,6.25,16.3h0a2.39,2.39,0,0,0,2.39,2.38h10"
                          className="cls-1"
                        ></path>{" "}
                        <polyline
                          points="7.21 5.32 22.48 5.32 22.48 7.23 20.57 13.91 9.11 13.91"
                          className="cls-1"
                        ></polyline>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
