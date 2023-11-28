import { useEffect, useState } from "react";
import Csodaasvanyok from "./csodaasvanyok/Csodaasvanyok";
import IsMobileContext from "./hooks/isMobileContext";
import { CartProvider } from "./hooks/cartContext";
import { DeliveryProvider } from "./hooks/deliveryContext";
import { DataProvider } from "./hooks/dataContext";
import { StripeProvider } from "./hooks/stripeContext";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const currentIsMobile = window.innerWidth < 1024;
      if (isMobile !== currentIsMobile) {
        setIsMobile(currentIsMobile);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <HelmetProvider>
      <IsMobileContext.Provider value={isMobile}>
        <DataProvider>
          <CartProvider>
            <DeliveryProvider>
              <StripeProvider>
                <div className="App">
                  <Csodaasvanyok></Csodaasvanyok>
                  <Helmet>
                    <title>
                      CsodaÁsványok - Mi hiszünk az ásványok természetes
                      erejében!
                    </title>
                    <meta
                      name="description"
                      content="Eredeti ásvány gyöngyökből készítünk minőségi ásvány karkötőket és egyéb ékszereket. Online ékszertervezőnk segítségével akár te is összeállíthatod álmaid ékszerét!"
                    />
                  </Helmet>
                </div>
              </StripeProvider>
            </DeliveryProvider>
          </CartProvider>
        </DataProvider>
      </IsMobileContext.Provider>
    </HelmetProvider>
  );
}

export default App;
