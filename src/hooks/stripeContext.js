import React, { createContext, useContext, useState, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";

const StripeContext = createContext(null);

export const useStripeContext = () => useContext(StripeContext);

export const StripeProvider = ({ children }) => {
  const [stripe, setStripe] = useState(null);

  const initializeStripe = useCallback(async () => {
    if (!stripe) {
      const stripeInstance = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
      setStripe(stripeInstance);
    }
  }, [stripe]);

  return (
    <StripeContext.Provider value={{ stripe, initializeStripe }}>
      {children}
    </StripeContext.Provider>
  );
};
