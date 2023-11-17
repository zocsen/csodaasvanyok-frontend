import { createContext, useContext, useState } from "react";

const DeliveryContext = createContext();

export function useDelivery() {
  return useContext(DeliveryContext);
}

export function DeliveryProvider({ children }) {
  const [isDeliveryPanelOpen, setIsDeliveryPanelOpen] = useState(false);

  const openDelvieryPanel = () => {
    setIsDeliveryPanelOpen(true);
  };

  const closeDeliveryPanel = () => {
    setIsDeliveryPanelOpen(false);
  };

  const value = {
    isDeliveryPanelOpen,
    openDelvieryPanel,
    closeDeliveryPanel,
  };

  return (
    <DeliveryContext.Provider value={value}>
      {children}
    </DeliveryContext.Provider>
  );
}
