import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./Components/Home";
import Confetti from "./Components/Confetti";
import Fireworks from "./Components/Fireworks";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confetti" element={<Confetti />} />
        <Route path="/fireworks" element={<Fireworks />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
