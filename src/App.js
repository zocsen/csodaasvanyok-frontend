import { useEffect, useState } from "react";
import Csodaasvanyok from "./csodaasvanyok/Csodaasvanyok";
import IsMobileContext from "./hooks/isMobileContext";
import { CartProvider } from "./hooks/cartContext";
import { DeliveryProvider } from "./hooks/deliveryContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { DataProvider } from "./hooks/dataContext";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

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
    <IsMobileContext.Provider value={isMobile}>
      <DataProvider>
        <CartProvider>
          <DeliveryProvider>
            <Elements stripe={stripePromise}>
              <div className="App">
                <Csodaasvanyok></Csodaasvanyok>
              </div>
            </Elements>
          </DeliveryProvider>
        </CartProvider>
      </DataProvider>
    </IsMobileContext.Provider>
  );
}

export default App;
