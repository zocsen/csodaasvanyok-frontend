import { createContext, useContext, useState } from "react";
import { useCart } from "./cartContext";

const DeliveryContext = createContext();

export function useDelivery() {
  return useContext(DeliveryContext);
}

export function DeliveryProvider({ children }) {
  const { cartItems, totalPriceWithDeliveryFee, deliveryFee } = useCart();
  const [isDeliveryPanelOpen, setIsDeliveryPanelOpen] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    orderItems: cartItems,
    shippingAddress1: "",
    city: "",
    zip: "",
    country: "Magyarország",
    phone: "",
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    status: 0,
    totalPrice: totalPriceWithDeliveryFee,
    deliveryFee: deliveryFee,
  });

  const openDeliveryPanel = () => {
    setIsDeliveryPanelOpen(true);
  };

  const closeDeliveryPanel = () => {
    setIsDeliveryPanelOpen(false);
  };

  const value = {
    isDeliveryPanelOpen,
    openDeliveryPanel,
    closeDeliveryPanel,
    deliveryInfo,
    setDeliveryInfo,
  };

  return (
    <DeliveryContext.Provider value={value}>
      {children}
    </DeliveryContext.Provider>
  );
}
