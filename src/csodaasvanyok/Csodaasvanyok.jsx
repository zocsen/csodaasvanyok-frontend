import React from "react";
import Header from "./components/Header/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import Cart from "./components/Cart/Cart";
import DeliveryInfo from "./components/DeliveryInfo/DeliveryInfo";
import PaymentSuccessfulPage from "./pages/PaymentSuccessfulPage/PaymentSuccessfulPage";
import PaymentFailedPage from "./pages/PaymentFailedPage/PaymentFailedPage";
import ProductBuilderPage from "./pages/ProductBuilderPage/ProductBuilderPage";
import Footer from "./components/Footer/Footer";

export default function Csodaasvanyok() {
  return (
    <BrowserRouter>
      <Header />
      <Cart />
      <DeliveryInfo />
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
        <Route
          path="termekek/teli-termekek"
          element={<ProductsPage header="Téli varázs ❄️" type="Tél" />}
        />
        <Route
          path="termekek/termekek-szerelmeseknek"
          element={<ProductsPage header="Szerelmeseknek 💖" type="Szerelem" />}
        />
        <Route
          path="termekek/horoszkopos-termekek"
          element={<ProductsPage header="Horoszkóp ♌" type="Horoszkóp" />}
        />
        <Route
          path="termekek/akcios-termekek"
          element={<ProductsPage header="Akciós termékek 🏷️" type="Akció" />}
        />
        <Route path="karkoto-tervezo" element={<ProductBuilderPage />}></Route>

        <Route path="/termek/:slug/:id" element={<ProductPage />} />

        <Route path="success" element={<PaymentSuccessfulPage />} />
        <Route path="cancel" element={<PaymentFailedPage />} />

        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
