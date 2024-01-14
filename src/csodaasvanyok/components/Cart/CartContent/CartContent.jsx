import "./cart-content.scss";

import { useCart } from "../../../../hooks/cartContext";

import formatPrice from "../../../../hooks/formatPrice";

export default function CartContent() {
  const { cartItems, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <>
      {cartItems.length > 0 ? (
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
                  </div>
                  <div className="lower-details">
                    <div className="item-quantity-wrapper box-shadow-border">
                      <button
                        className="remove-item-button"
                        onClick={() => decreaseQuantity(item)}
                      >
                        -
                      </button>
                      <p className="item-quantity">{item.quantity}</p>
                      <button
                        className="add-item-button"
                        onClick={() => increaseQuantity(item)}
                      >
                        +
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
      ) : (
        <div className="cart-empty-disclaimer">
          <h2>Úgy látszik, a kosarad magányos!</h2>
          <p>
            Töltsd meg kedvenceiddel, és máris készen állunk, hogy
            kiszolgálhassunk. 🎁
          </p>
        </div>
      )}
    </>
  );
}
