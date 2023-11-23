import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccessfulPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      postOrderDetails(sessionId);
    }
  }, [sessionId]);

  const postOrderDetails = async (sessionId) => {
    try {
      const tempOrderId = localStorage.getItem("tempOrderId");

      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, tempOrderId }),
      });

      if (response.ok) {
        localStorage.clear();
      }
    } catch (error) {
      console.error("Error posting order details:", error);
    }
  };

  return (
    <div style={{ display: "block", textAlign: "center", paddingTop: "100px" }}>
      <h1>Köszönjük a vásárlást!</h1>
      <h2>A szállítás részleteiről hamarosan küldünk egy e-mailt!</h2>
    </div>
  );
};

export default PaymentSuccessfulPage;
