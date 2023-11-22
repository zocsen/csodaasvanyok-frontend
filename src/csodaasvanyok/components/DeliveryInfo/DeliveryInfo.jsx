import React, { useEffect, useState } from "react";
import "./delivery-info.scss";
import { useDelivery } from "../../../hooks/deliveryContext";
import { ReactComponent as CloseIcon } from "../../../images/icons/close.svg";
import { TextField } from "@material-ui/core";
import useApi from "../../../hooks/useApi";
import { useCart } from "../../../hooks/cartContext";
import { useStripe } from "@stripe/react-stripe-js";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const API_URL = process.env.REACT_APP_API_URL;

export default function DeliveryInfo() {
  const stripe = useStripe();
  const { cartItems, totalPriceWithDeliveryFee, deliveryFee } = useCart();
  const { data, post, loading, error } = useApi(API_URL);
  const [errors, setErrors] = useState({});
  const { isDeliveryPanelOpen, closeDeliveryPanel } = useDelivery();

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDeliveryInfo((prev) => {
      const newState = { ...prev, [name]: value };

      if (name === "firstName" || name === "lastName") {
        newState.name = `${newState.firstName} ${newState.lastName}`.trim();
      }

      return newState;
    });
  };

  const handleSubmit = async () => {
    let validationErrors = {};

    // Required fields check
    Object.entries(deliveryInfo).forEach(([key, value]) => {
      if (
        !value &&
        key !== "phone" &&
        key !== "totalPrice" &&
        key !== "status" &&
        key !== "deliveryFee"
      ) {
        validationErrors[key] = "This field is required";
      }
    });

    // Email format validation
    if (deliveryInfo.email && !validateEmail(deliveryInfo.email)) {
      validationErrors.email = "Invalid email format";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await post("/orders", deliveryInfo);
        console.log(response);
      } catch (error) {
        console.error(error);
        // Handle error
      }
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/orders/create-checkout-session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: cartItems,
              deliveryFee: deliveryFee,
              email: deliveryInfo.email,
            }),
          }
        );
        const session = await response.json();
        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (result.error) {
          // Handle error here
          console.error(result.error.message);
        }
      } catch (error) {
        console.error(error);
        // Handle error
      }
    }
  };

  useEffect(() => {
    setDeliveryInfo((prevInfo) => ({
      ...prevInfo,
      orderItems: cartItems,
      totalPrice: totalPriceWithDeliveryFee,
      deliveryFee: deliveryFee,
    }));
  }, [cartItems, totalPriceWithDeliveryFee, deliveryFee]);

  return (
    <>
      <div
        className={`delivery-info-panel ${isDeliveryPanelOpen ? "open" : ""}`}
      >
        <div className="delivery-header">
          <h2>Szállítás</h2>
          <button onClick={closeDeliveryPanel}>
            <CloseIcon
              className="base-svg"
              alt="Close icon"
              width={34}
              height={34}
            />
          </button>
        </div>
        <div className="delivery-content">
          <TextField
            className="full-text-field"
            id="outlined-read-only-input"
            label="Ország / régió"
            defaultValue="Magyarország"
            InputProps={{
              readOnly: true,
              style: {
                fontSize: "1.8rem",
                color: "var(--primary-font-color)",
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: "1.8rem",
                color: "var(--primary-font-color)",
                fontWeight: "500",
              },
            }}
          />
          <TextField
            className="full-text-field"
            required
            id="outlined-required"
            label="E-mail-cím"
            name="email"
            onChange={handleChange}
            value={deliveryInfo.email}
            error={!!errors.email}
            helperText={errors.email}
            InputLabelProps={{
              style: {
                fontSize: "1.8rem",
                color: "var(--primary-font-color)",
                fontWeight: "500",
              },
            }}
            InputProps={{
              style: {
                fontSize: "1.8rem",
                color: "var(--primary-font-color)",
              },
            }}
          />

          <div className="half-fields">
            <TextField
              className="half-text-field"
              required
              id="outlined-required"
              label="Vezetéknév"
              name="lastName"
              onChange={handleChange}
              value={deliveryInfo.lastName}
              error={!!errors.lastName}
              helperText={errors.lastName}
              InputLabelProps={{
                style: {
                  fontSize: "1.8rem",
                  color: "var(--primary-font-color)",
                  fontWeight: "500",
                },
              }}
              InputProps={{
                style: {
                  fontSize: "1.8rem",
                  color: "var(--primary-font-color)",
                },
              }}
            />
            <TextField
              className="half-text-field"
              required
              id="outlined-required"
              label="Keresztnév"
              name="firstName"
              onChange={handleChange}
              value={deliveryInfo.firstName}
              error={!!errors.firstName}
              helperText={errors.firstName}
              InputLabelProps={{
                style: {
                  fontSize: "1.8rem",
                  color: "var(--primary-font-color)",
                  fontWeight: "500",
                },
              }}
              InputProps={{
                style: {
                  fontSize: "1.8rem",
                  color: "var(--primary-font-color)",
                },
              }}
            />
          </div>

          <div className="half-fields">
            <TextField
              className="half-text-field"
              required
              id="outlined-required"
              label="Település"
              name="city"
              onChange={handleChange}
              value={deliveryInfo.city}
              error={!!errors.city}
              helperText={errors.city}
              InputLabelProps={{
                style: {
                  fontSize: "1.8rem",
                  color: "var(--primary-font-color)",
                  fontWeight: "500",
                },
              }}
              InputProps={{
                style: {
                  fontSize: "1.8rem",
                  color: "var(--primary-font-color)",
                },
              }}
            />
            <TextField
              className="half-text-field"
              required
              id="outlined-required"
              label="Irányítószám"
              type="number"
              name="zip"
              onChange={handleChange}
              value={deliveryInfo.zip}
              error={!!errors.zip}
              helperText={errors.zip}
              InputLabelProps={{
                style: {
                  fontSize: "1.8rem",
                  color: "var(--primary-font-color)",
                  fontWeight: "500",
                },
              }}
              InputProps={{
                style: {
                  fontSize: "1.8rem",
                  color: "var(--primary-font-color)",
                },
              }}
            />
          </div>

          <TextField
            className="full-text-field"
            required
            id="outlined-required"
            label="Szállítási Cím"
            name="shippingAddress1"
            onChange={handleChange}
            value={deliveryInfo.shippingAddress1}
            error={!!errors.shippingAddress1}
            helperText={errors.shippingAddress1}
            InputLabelProps={{
              style: {
                fontSize: "1.8rem",
                color: "var(--primary-font-color)",
                fontWeight: "500",
              },
            }}
            InputProps={{
              style: {
                fontSize: "1.8rem",
                color: "var(--primary-font-color)",
              },
            }}
          />
          <TextField
            className="full-text-field"
            id="outlined-phone"
            label="Telefonszám"
            onChange={handleChange}
            name="phone"
            value={deliveryInfo.phone}
            InputLabelProps={{
              style: {
                fontSize: "1.8rem",
                color: "var(--primary-font-color)",
                fontWeight: "500",
              },
            }}
            inputProps={{
              maxLength: 15, // Adjust based on your needs
              style: {
                fontSize: "1.8rem",
                color: "var(--primary-font-color)",
              },
            }}
            helperText="Nem kötelező megadni"
          />
          <p className="shipping-disclaimer">
            <span>Kedves vásárlóink!</span> <br /> Jelenleg csak hagyományos,
            postai úton tudjuk házhozszállítani megrendelt termékeit. Hamarosan{" "}
            <span className="shipment-red">FOXPOST</span> és{" "}
            <span className="shipment-red">Packeta </span>
            lehetőségek is elérhetőek lesznek. Megértésüket köszönjük!
          </p>
        </div>

        <div className="delivery-footer">
          <button onClick={handleSubmit} className="to-payment-info-button">
            Tovább a fizetéshez
          </button>
        </div>
      </div>
      <div
        className={`overlay ${isDeliveryPanelOpen ? "open" : ""}`}
        onClick={closeDeliveryPanel}
      ></div>
    </>
  );
}
