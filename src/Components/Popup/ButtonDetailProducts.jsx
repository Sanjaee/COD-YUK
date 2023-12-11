import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PopUp() {
  const [isPopupVisible, setPopupVisible] = useState(true);

  useEffect(() => {
    if (isPopupVisible) {
      // Show the toast notification when the popup is visible
      toast.success("Pesan Terkirim Ke Penjual");
    }
  }, [isPopupVisible]);

  const handlePopupClick = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <ToastContainer />
    </>
  );
}
