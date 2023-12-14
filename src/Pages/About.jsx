import React from "react";
import { Navbar } from "../Components/Navbar";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <body className="font-sans  text-gray-800">
      <Navbar />
      <div className="container mx-auto py-8 P-10">
        <div className=" items-start  font-bold mt-16 ml-5 text-xl">
          <Link to="/">&larr; Kembali</Link>
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center mt-5">
          Syarat Dan Ketentuan
        </h1>

        <ol className=" pl-6">
          <li className="mb-4">
            <h2 className="text-2xl font-semibold">
              Harus memiliki akun yang terdaftar
            </h2>
            <p>
              Cara nya klik logo pada atas lalu login jika belum meiliki akun
              maka registrasi terlebih dahulu
            </p>
          </li>

          <li className="mb-4">
            <h2 className="text-2xl font-semibold">Batas Posting </h2>
            <p>Setiap akun hanya bisa memposting 1 kali</p>
          </li>

          <li className="mb-4">
            <h2 className="text-2xl font-semibold">Cara COD barang seller</h2>
            <p>
              Pertama klik barang yang ingin di minati lalu isi chat sesuai
              input pesan akan otomatis ke whatsapp seller
            </p>
            <ul className="list-disc pl-6">
              <li>
                Pengunjung atau pembeli tidak di wajibkan Login atau registrasi
              </li>
              <li>
                Jika ingin posting barang wajib memiliki akun atau registrasi
              </li>
            </ul>
          </li>

          <li className="mb-4">
            <h2 className="text-2xl font-semibold">
              Tempat ini hanya Memberi jasa
            </h2>
            <p>
              Kami hanya memberi jasa posting Jika ingin membeli barang hanya
              bisa COD dengan satu wilayah atau dari luar kota sesuai seller
              atau penjual unit tersebut
            </p>
          </li>

          <li className="mb-4">
            <h2 className="text-2xl font-semibold">
              Aplikasi ini hanya Memberi jasa Posting barang, Negosiasi oleh
              seller, Lalu COD Deal
            </h2>
          </li>
        </ol>
      </div>
    </body>
  );
};
