import React, { useContext } from "react";

import "./header.scss";
import DesktopAccordion from "./DesktopAccordion";
import MobileAccordion from "./MobileAccordion";
import IsMobileContext from "../../../hooks/isMobileContext";

function Header() {
  const isMobile = useContext(IsMobileContext);

  return (
    <header>
      <div className="header-container">
        <div className="menu">
          {isMobile ? <MobileAccordion /> : <DesktopAccordion />}
          <p className="menu-title">Menü</p>
        </div>
        <div className="logo">
          <img src="/images/logo/logo.png" height={100} alt="" />
        </div>
        <div className="cart">
          <img
            src="/images/icons/shopping-bag.svg"
            alt="Shopping bag"
            width={30}
            height={30}
          />
          <p className="cart-title">Kosár</p>
        </div>
      </div>
      <hr className="header-hr" />
    </header>
  );
}

export default Header;
