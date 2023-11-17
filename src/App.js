import { useEffect, useState } from "react";
import Csodaasvanyok from "./csodaasvanyok/Csodaasvanyok";
import IsMobileContext from "./hooks/isMobileContext";
import { CartProvider } from "./hooks/cartContext";
import { DeliveryProvider } from "./hooks/deliveryContext";

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
      <CartProvider>
        <DeliveryProvider>
          <div className="App">
            <Csodaasvanyok></Csodaasvanyok>
          </div>
        </DeliveryProvider>
      </CartProvider>
    </IsMobileContext.Provider>
  );
}

export default App;
