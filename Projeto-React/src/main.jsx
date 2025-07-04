import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Sidebar from "./Sidebar";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Sidebar/>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);