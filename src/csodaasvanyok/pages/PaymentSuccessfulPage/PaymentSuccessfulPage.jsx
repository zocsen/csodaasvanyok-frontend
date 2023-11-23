import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDelivery } from "../../../hooks/deliveryContext";

const PaymentSuccessfulPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { deliveryInfo } = useDelivery();

  useEffect(() => {
    if (sessionId) {
      postOrderDetails(sessionId);
    }
  }, [sessionId]);

  const postOrderDetails = async (sessionId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, deliveryInfo }),
      });
      const data = await response.json();
      // Handle response
    } catch (error) {
      console.error("Error posting order details:", error);
    }
  };

  return (
    <div>
      <h1>Payment Successful</h1>
      {/* Additional order details or actions */}
    </div>
  );
};

export default PaymentSuccessfulPage;
