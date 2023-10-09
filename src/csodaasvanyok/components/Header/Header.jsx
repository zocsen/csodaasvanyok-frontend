import React, { useState, useEffect } from "react";

import "./header.scss";
import DesktopAccordion from "./DesktopAccordion";
import MobileAccordion from "./MobileAccordion";

function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const currentIsMobile = window.innerWidth < 1024;
      if (isMobile !== currentIsMobile) {
        setIsMobile(currentIsMobile);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <header>
      <div className="header-container">
        <div className="menu">
          {isMobile ? <MobileAccordion /> : <DesktopAccordion />}
        </div>
        <div className="logo">
          <img src="/images/logo/logo.png" height={100} alt="" />
        </div>
        <div className="cart">cart</div>
      </div>
    </header>
  );
}

export default Header;
