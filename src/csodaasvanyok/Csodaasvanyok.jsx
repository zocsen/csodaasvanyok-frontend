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
          element={<ProductsPage header="Összes karkötő" type="Karkötő" />}
        />
        <Route
          path="termekek/noi-karkotok"
          element={<ProductsPage header="Női karkötők" type="Női" />}
        />
        <Route
          path="termekek/ferfi-karkotok"
          element={<ProductsPage header="Férfi karkötők" type="Férfi" />}
        />
        <Route
          path="termekek/paros-karkotok"
          element={<ProductsPage header="Páros karkötők" type="Páros" />}
        />
        <Route
          path="termekek/marokkovek"
          element={<ProductsPage header="Marokkövek" type="Ásványok" />}
        />
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}
