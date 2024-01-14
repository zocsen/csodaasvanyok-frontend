import "./cart-footer.scss";

import { useEffect, useState } from "react";
import { useCart } from "../../../../hooks/cartContext";
import { useDelivery } from "../../../../hooks/deliveryContext";
import formatPrice from "../../../../hooks/formatPrice";

import { LinearProgress, withStyles } from "@material-ui/core";

const StyledLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "var(--shadow-color)",
  },
  barColorPrimary: {
    backgroundColor: "var(--primary-font-color)",
  },
})(LinearProgress);

export default function CartFooter() {
  const {
    totalPrice,
    progress,
    deliveryFee,
    totalPriceWithDeliveryFee,
    freeDeliveryThreshold,
  } = useCart();

  const { openDeliveryPanel } = useDelivery();

  const remainingPrice = freeDeliveryThreshold - totalPrice;

  const [showProgress, setShowProgress] = useState(true);

  useEffect(() => {
    if (totalPrice >= freeDeliveryThreshold) {
      setTimeout(() => {
        setShowProgress(false);
      }, 200);
    } else {
      setShowProgress(true);
    }
  }, [totalPrice, freeDeliveryThreshold]);

  return (
    <div className="cart-footer">
      <div className="to-free-delivery">
        {showProgress && (
          <>
            {remainingPrice > 0 && (
              <p className="free-delivery-reminder">
                Már csak {formatPrice(remainingPrice)} és ingyen házhoz visszük!
              </p>
            )}

            <StyledLinearProgress variant="determinate" value={progress} />

            <div className="min-max-price-needed">
              <p>0 Ft</p>
              <p>{formatPrice(freeDeliveryThreshold)} </p>
            </div>
          </>
        )}
        <p className="deliver-fee-title">
          Szállítás:
          <span className={deliveryFee === 0 ? "free" : undefined}>
            {deliveryFee > 0 ? "Akár " + formatPrice(deliveryFee) : "Ingyenes"}
          </span>
        </p>
      </div>

      <div className="cart-footer-total">
        <p>Összesített ár:</p>
        <p>{formatPrice(totalPriceWithDeliveryFee)}</p>
      </div>
      <button className="to-payment-info-button" onClick={openDeliveryPanel}>
        Tovább a szállításhoz
      </button>
    </div>
  );
}
