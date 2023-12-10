import React from "react";
import { Navbar } from "../Components/Navbar";

export const About = () => {
  return (
    <body className="font-sans  text-gray-800">
      <Navbar />
      <div className="container mx-auto py-8 P-10">
        <h1 className="text-4xl font-bold mb-6 text-center mt-16">
          Syarat Promosi Barang
        </h1>

        <ol className="list-decimal pl-6">
          <li className="mb-4">
            <h2 className="text-2xl font-semibold">
              Promosi Berlaku untuk Produk Tertentu
            </h2>
            <p>Promosi hanya berlaku untuk produk yang ditentukan.</p>
          </li>

          <li className="mb-4">
            <h2 className="text-2xl font-semibold">Masa Promosi</h2>
            <p>Promosi berlaku mulai tanggal X hingga tanggal Y.</p>
          </li>

          <li className="mb-4">
            <h2 className="text-2xl font-semibold">Diskon dan Penawaran</h2>
            <p>Nikmati diskon dan penawaran spesial selama masa promosi:</p>
            <ul className="list-disc pl-6">
              <li>Diskon 20% untuk semua produk.</li>
              <li>Gratis pengiriman untuk pembelian di atas Rp 500.000.</li>
            </ul>
          </li>

          <li>
            <h2>Ketentuan Penggunaan Kode Promo</h2>
            <p>
              Gunakan kode promo "PROMOX" saat checkout untuk mendapatkan diskon
              tambahan 10%.
            </p>
          </li>

          <li>
            <h2>Minimum Pembelian</h2>
            <p>Diskon tambahan berlaku untuk pembelian di atas Rp 200.000.</p>
          </li>

          <li>
            <h2>Promosi Tidak Dapat Digabungkan</h2>
            <p>Promosi ini tidak dapat digabungkan dengan promosi lain.</p>
          </li>

          <li>
            <h2>Batas Waktu Penggunaan Kode Promo</h2>
            <p>Kode promo harus digunakan sebelum tanggal X.</p>
          </li>

          <li>
            <h2>Promosi Berlaku Online dan Offline</h2>
            <p>
              Anda dapat menikmati promosi ini baik secara online maupun offline
              di toko fisik kami.
            </p>
          </li>

          <li>
            <h2>Persediaan Terbatas</h2>
            <p>Promo berlaku selama persediaan masih ada.</p>
          </li>

          <li>
            <h2>Keputusan Manajemen Bersifat Mutlak</h2>
            <p>
              Manajemen berhak mengubah atau membatalkan promosi tanpa
              pemberitahuan sebelumnya.
            </p>
          </li>

          <li>
            <h2>Promosi Mengikat</h2>
            <p>
              Persyaratan ini mengikat dan dapat berubah tanpa pemberitahuan
              sebelumnya.
            </p>
          </li>
        </ol>
      </div>
    </body>
  );
};
