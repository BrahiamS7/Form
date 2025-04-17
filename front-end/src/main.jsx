import ReactDOM from "react-dom/client";
import App from "./App";
import Add from "./components/Add";
import Show from "./components/Show";
import Home from "./components/Home";
import Login from "./components/Login";
import HomePage from "./components/HomePage";

import { BrowserRouter, Routes, Route } from "react-router";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Form" element={<Add />} />
      <Route path="/Show" element={<Show />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
