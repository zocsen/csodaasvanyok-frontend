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
import ASZFPage from "./pages/ASZFPage/ASZFPage";
import AboutUs from "./pages/AboutUsPage/AboutUs";
import MineralCatalogue from "./pages/MineralCatalogue/MineralCatalogue";

export default function Csodaasvanyok() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <div className="main-content">
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
              path="termekek/natural-karkotok"
              element={
                <ProductsPage header="Natural karkötők" type="Natural" />
              }
            />
            <Route
              path="termekek/marokkovek"
              element={<ProductsPage header="Marokkövek" type="Ásványok" />}
            />
            <Route
              path="termekek/fulbevalok"
              element={<ProductsPage header="Fülbevalók" type="Fülbevaló" />}
            />
            <Route
              path="termekek/nyaklancok"
              element={<ProductsPage header="Nyakláncok" type="Nyaklánc📿" />}
            />
            <Route
              path="termekek/aprosagok"
              element={<ProductsPage header="Apróságok" type="Apróság" />}
            />
            <Route
              path="termekek/teli-termekek"
              element={<ProductsPage header="Téli varázs ❄️" type="Tél" />}
            />
            <Route
              path="termekek/termekek-szerelmeseknek"
              element={
                <ProductsPage header="Szerelmeseknek 💖" type="Szerelem" />
              }
            />
            <Route
              path="termekek/horoszkopos-termekek"
              element={<ProductsPage header="Horoszkóp ♌" type="Horoszkóp" />}
            />
            <Route
              path="termekek/akcios-termekek"
              element={
                <ProductsPage header="Akciós termékek 🏷️" type="Akció" />
              }
            />
            <Route
              path="karkoto-tervezo"
              element={<ProductBuilderPage />}
            ></Route>

            <Route path="/termek/:slug/:id" element={<ProductPage />} />

            <Route path="success" element={<PaymentSuccessfulPage />} />
            <Route path="cancel" element={<PaymentFailedPage />} />
            <Route path="aszf" element={<ASZFPage />} />
            <Route path="rolunk" element={<AboutUs />} />
            <Route path="asvany-katalogus" element={<MineralCatalogue />} />

            <Route path="/" element={<Homepage />} />
            <Route path="*" element={<Homepage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
