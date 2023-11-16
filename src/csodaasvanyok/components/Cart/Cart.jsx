import React, { useEffect, useState } from "react";
import "./cart.scss";
import { useCart } from "../../../hooks/cartContext";
import { ReactComponent as CloseIcon } from "../../../images/icons/close.svg";
import { ReactComponent as RemoveIcon } from "../../../images/icons/remove.svg";
import { ReactComponent as AddIcon } from "../../../images/icons/add.svg";
import { LinearProgress, withStyles } from "@material-ui/core";
import formatPrice from "../../../hooks/formatPrice";

const StyledLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "var(--shadow-color)", // Define this variable in your CSS
  },
  barColorPrimary: {
    backgroundColor: "var(--primary-font-color)", // Define this variable in your CSS
  },
})(LinearProgress);

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    isCartOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  // if (!isCartOpen) return null;
  const baseDeliveryFee = 990;
  const freeDeliveryThreshold = 12000;
  const progress = Math.min((totalPrice / freeDeliveryThreshold) * 100, 100);
  const [deliveryFee, setDeliveryFee] = useState(baseDeliveryFee);
  const remainingPrice = freeDeliveryThreshold - totalPrice;
  const totalPriceWithDeliveryFee = totalPrice + deliveryFee;

  useEffect(() => {
    if (totalPrice >= freeDeliveryThreshold) {
      setDeliveryFee(0);
    }
    if (totalPrice < freeDeliveryThreshold) {
      setDeliveryFee(baseDeliveryFee);
    }
  }, [totalPrice]);

  return (
    <>
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
        <ul className="cart-middle">
          {cartItems.map((item) => {
            return (
              <li
                className="cart-item"
                key={`${item.id}_${item.size || "default"}`}
              >
                <img
                  className="cart-item-image"
                  src={item.image}
                  alt=""
                  width={100}
                />
                <div className="item-details-wrapper">
                  <div className="upper-details">
                    <div className="item-name-size-wrapper">
                      <p className="item-name">{item.name}</p>
                      {item.size && (
                        <p className="item-size">Méret: {item.size}</p>
                      )}
                    </div>
                    {/* <button
                      className="item-delete-button"
                      onClick={() => removeFromCart(item)}
                    >
                      <CloseIcon
                        className="base-svg"
                        alt="Close icon"
                        width={24}
                        height={24}
                      />
                    </button> */}
                  </div>
                  <div className="lower-details">
                    <div className="item-quantity-wrapper">
                      <button
                        className="remove-item-button"
                        onClick={() => decreaseQuantity(item)}
                      >
                        <RemoveIcon width={20} height={20} />
                      </button>
                      <p className="item-quantity">{item.quantity}</p>
                      <button
                        className="add-item-button"
                        onClick={() => increaseQuantity(item)}
                      >
                        <AddIcon width={20} height={20} />
                      </button>
                    </div>
                    <p className="item-price">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="cart-footer">
          <div className="to-free-delivery">
            {remainingPrice > 0 && (
              <>
                <p className="free-delivery-reminder">
                  Már csak {formatPrice(remainingPrice)} és ingyen házhoz
                  visszük!
                </p>

                <StyledLinearProgress variant="determinate" value={progress} />

                <div className="min-max-price-needed">
                  <p>0 Ft</p>
                  <p>{formatPrice(freeDeliveryThreshold)} </p>
                </div>
              </>
            )}
            <p className="deliver-fee-title">
              Szállítás:
              <span className={deliveryFee === 0 && "free"}>
                {deliveryFee > 0 ? formatPrice(deliveryFee) : "Ingyenes"}
              </span>
            </p>
          </div>

          <div className="cart-footer-total">
            <p>Összesített ár:</p>
            <p>{formatPrice(totalPriceWithDeliveryFee)}</p>
          </div>
          <button className="to-payment-info-button">
            Tovább a fizetéshez
          </button>
        </div>
      </div>
      <div
        className={`overlay ${isCartOpen ? "open" : ""}`}
        onClick={() => closeCart(false)}
      ></div>
    </>
  );
}
