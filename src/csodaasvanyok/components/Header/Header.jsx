import React, { useContext } from "react";

import "./header.scss";
import DesktopAccordion from "./DesktopAccordion";
import MobileAccordion from "./MobileAccordion";
import IsMobileContext from "../../../hooks/isMobileContext";

import Logo from "../../../images/logo/logo.webp";

import { ReactComponent as ShoppingBagIcon } from "../../../images/icons/shopping-bag.svg";
import { Link } from "react-router-dom";
import { useCart } from "../../../hooks/cartContext";

function Header() {
  const isMobile = useContext(IsMobileContext);
  const { openCart, getCartItemsCount } = useCart();

  return (
    <header>
      <div className="header-container">
        <div className="menu">
          {isMobile ? <MobileAccordion /> : <DesktopAccordion />}
        </div>
        <Link to="/" className="logo">
          <img src={Logo} height={120} alt="Company Logo" />
        </Link>
        <button className="cart-icon" onClick={openCart}>
          <ShoppingBagIcon
            alt="Shopping bag"
            aria-label="Shopping Bag"
            width={40}
            height={40}
          />
          <p className="items-in-cart">{getCartItemsCount}</p>
        </button>
      </div>
    </header>
  );
}

export default React.memo(Header);
