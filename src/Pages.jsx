import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./Pages/Home";

import { About } from "./Pages/About";
import { Service } from "./Pages/Service";

import DetailProducts from "./Pages/DetailProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Service",
    element: <Service />,
  },
  {
    path: "/DetailProducts/:id",
    element: <DetailProducts />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
