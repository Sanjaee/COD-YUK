import React, { useState } from "react";

import { Link } from "react-router-dom";

const Service = () => {
  const [formData, setFormData] = useState({
    namaAkun: "",
    nomorOrderan: "",
    email: "",
    catatan: "",
  });

  const nomorTeleponAdmin = "+6289618714018";
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

    // Tunggu 3 detik sebelum diarahkan ke WhatsApp
    setTimeout(() => {
      const { namaAkun, nomorOrderan, email, catatan } = formData;

      const message = ` %0D%0ANAMA : ${namaAkun}%0D%0ANOMOR TELEPON: ${nomorOrderan}%0D%0AEMAIL: ${email} %0D%0ACATATAN/PERIHAL: ${catatan}`;

      // Mengirim pesan WhatsApp
      window.open(
        `https://api.whatsapp.com/send?phone=${nomorTeleponAdmin}&text=${message}`
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
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Hubungi Kami</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">NAMA</label>
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
              CATATAN / PERIHAL
            </label>
            <div>
              <textarea
                className="w-full px-4 py-2 border rounded-md"
                name="catatan"
                placeholder="Opsional"
                onChange={handleChange}
                value={formData.catatan}
                rows="4"
              ></textarea>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full hover:bg-blue-600"
                id="tombol"
                onClick={handleWhatsApp}
              >
                <span>SEND</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
