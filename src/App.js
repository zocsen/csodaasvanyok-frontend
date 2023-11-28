import { useEffect, useState } from "react";
import Csodaasvanyok from "./csodaasvanyok/Csodaasvanyok";
import IsMobileContext from "./hooks/isMobileContext";
import { CartProvider } from "./hooks/cartContext";
import { DeliveryProvider } from "./hooks/deliveryContext";
import { Elements } from "@stripe/react-stripe-js";
import { DataProvider } from "./hooks/dataContext";
import { StripeProvider, useStripeContext } from "./hooks/stripeContext";

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
            <StripeProvider>
              <StripeElementsWrapper>
                <div className="App">
                  <Csodaasvanyok></Csodaasvanyok>
                </div>
              </StripeElementsWrapper>
            </StripeProvider>
          </DeliveryProvider>
        </CartProvider>
      </DataProvider>
    </IsMobileContext.Provider>
  );
}

const StripeElementsWrapper = ({ children }) => {
  const { stripe } = useStripeContext();

  return <Elements stripe={stripe}>{children}</Elements>;
};

export default App;
