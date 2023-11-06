import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import useApi from "../hooks/useApi";

export default function Csodaasvanyok() {
  const {
    data: allProducts,
    loading,
    error,
    get,
  } = useApi("https://csodaasvanyok.up.railway.app/api/v1");

  useEffect(() => {
    get("/products");
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="termekek/osszes-karkoto"
          element={
            <ProductsPage
              header="Összes karkötő"
              type="Karkötő"
              allProducts={allProducts}
            />
          }
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
