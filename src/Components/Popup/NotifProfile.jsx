// Example in App.js or another top-level component
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ... other imports and code

export const NotifProfile = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
