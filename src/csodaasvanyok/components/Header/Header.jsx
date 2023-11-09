import React, { useContext } from "react";

import "./header.scss";
import DesktopAccordion from "./DesktopAccordion";
import MobileAccordion from "./MobileAccordion";
import IsMobileContext from "../../../hooks/isMobileContext";

import Logo from "../../../images/logo/logo.png";

import { ReactComponent as ShoppingBagIcon } from "../../../images/icons/shopping-bag.svg";

function Header() {
  const isMobile = useContext(IsMobileContext);

  return (
    <header>
      <div className="header-container">
        <div className="menu">
          {isMobile ? <MobileAccordion /> : <DesktopAccordion />}
        </div>
        <div className="logo">
          <img src={Logo} height={100} alt="Company Logo" />
        </div>
        <div className="cart">
          <ShoppingBagIcon
            alt="Shopping bag"
            aria-label="Shopping Bag"
            width={30}
            height={30}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
