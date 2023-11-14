import React from "react";
import "./cart.scss";
import { useCart } from "../../../hooks/cartContext";
import { ReactComponent as CloseIcon } from "../../../images/icons/close.svg";

export default function Cart() {
  const { cartItems, removeFromCart, isCartOpen, closeCart } = useCart();

  // if (!isCartOpen) return null;

  return (
    <div className={`cart ${isCartOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Kosár</h2>
        <button onClick={closeCart}>
          <CloseIcon
            className="base-svg"
            alt="Close icon"
            width={34}
            height={34}
          />
        </button>
      </div>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div
        className={`overlay ${isCartOpen ? "open" : ""}`}
        onClick={() => closeCart(false)}
      ></div>
    </div>
  );
}
