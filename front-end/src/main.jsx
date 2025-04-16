import ReactDOM from "react-dom/client";
import App from "./App";
import Add from "./components/Add";
import Show from "./components/Show";
import Home from "./components/Home";

import { BrowserRouter, Routes, Route } from "react-router";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Form" element={<Add />} />
      <Route path="/Show" element={<Show />} />
    </Routes>
  </BrowserRouter>
);
