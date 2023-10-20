import React from "react";
import Header from "./components/Header/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";

export default function Csodaasvanyok() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="termekek/osszes-karkoto"
          element={<ProductsPage type="Összes karkötő" />}
        />
        <Route
          path="termekek/noi-karkoto"
          element={<ProductsPage type="Női karkötők" />}
        />
        <Route
          path="termekek/ferfi-karkoto"
          element={<ProductsPage type="Férfi karkötők" />}
        />
        <Route
          path="termekek/paros-karkoto"
          element={<ProductsPage type="Páros karkötők" />}
        />
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}
