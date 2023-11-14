import React, { useContext } from "react";

import "./header.scss";
import DesktopAccordion from "./DesktopAccordion";
import MobileAccordion from "./MobileAccordion";
import IsMobileContext from "../../../hooks/isMobileContext";

import Logo from "../../../images/logo/logo.png";

import { ReactComponent as ShoppingBagIcon } from "../../../images/icons/shopping-bag.svg";
import { Link } from "react-router-dom";
import { useCart } from "../../../hooks/cartContext";

function Header() {
  const isMobile = useContext(IsMobileContext);
  const { openCart } = useCart();

  return (
    <header>
      <div className="header-container">
        <div className="menu">
          {isMobile ? <MobileAccordion /> : <DesktopAccordion />}
        </div>
        <Link to="/" className="logo">
          <img src={Logo} height={100} alt="Company Logo" />
        </Link>
        <button className="cart-icon" onClick={openCart}>
          <ShoppingBagIcon
            alt="Shopping bag"
            aria-label="Shopping Bag"
            width={30}
            height={30}
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
