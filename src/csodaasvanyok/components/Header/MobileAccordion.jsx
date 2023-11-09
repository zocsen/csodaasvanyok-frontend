import { useEffect, useRef, useState } from "react";
import "./mobile-accordion.scss";
import { Link } from "react-router-dom";

import { ReactComponent as MenuIcon } from "../../../images/icons/menu.svg";
import { ReactComponent as CloseIcon } from "../../../images/icons/close.svg";
import { ReactComponent as RemoveIcon } from "../../../images/icons/remove.svg";
import { ReactComponent as AddIcon } from "../../../images/icons/add.svg";
import { ReactComponent as FacebookIcon } from "../../../images/icons/logo-facebook.svg";
import { ReactComponent as InstagramIcon } from "../../../images/icons/logo-instagram.svg";
import { ReactComponent as TikTokIcon } from "../../../images/icons/logo-tiktok.svg";

export default function MobileAccordion() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const AccordionItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <div className="accordion-style" onClick={() => setIsOpen(!isOpen)}>
          <div>{title}</div>{" "}
          {isOpen ? (
            <RemoveIcon
              className={`rotate-icon ${isOpen ? "open" : ""} base-svg`}
              aria-label="-"
            />
          ) : (
            <AddIcon
              className={`rotate-icon ${isOpen ? "open" : ""} base-svg`}
              aria-label="+"
            />
          )}
        </div>
        <div className={`accordion-content ${isOpen ? "open" : ""}`}>
          {children}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="mobile-menu" ref={dropdownRef}>
      <button
        className="mobile-header-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon className="menu-icon" aria-label="Menu icon" />
      </button>
      <div className={`mobile-accordion-container ${isOpen ? "open" : ""}`}>
        <div className="mobile-accordion-header">
          <h2>Termékek</h2>
          <button className="close-button" onClick={() => setIsOpen(!isOpen)}>
            <CloseIcon
              className="base-svg"
              alt="Close icon"
              width={34}
              height={34}
            />
          </button>
        </div>

        <hr />
        <AccordionItem title="Népszerűek">
          <li>Téli kollekció</li>
          <li>Szerelmesek kollekciója</li>
          <li>Horoszkóp kollekció</li>
          <li>Akciós termékek</li>
        </AccordionItem>
        <hr />
        <AccordionItem title="Karkötők">
          <li>
            <Link to="/termekek/osszes-karkoto">Összes karkötő</Link>
          </li>
          <li>
            <Link to="/termekek/noi-karkotok">Női karkötők</Link>
          </li>
          <li>
            <Link to="/termekek/ferfi-karkotok">Férfi karkötők</Link>
          </li>
          <li>
            <Link to="/termekek/paros-karkotok">Páros karkötők</Link>
          </li>
          <li>
            <Link to="/tervezo">Karkötő Tervező (HAMAROSAN)</Link>
          </li>
        </AccordionItem>
        <hr />
        <Link to="/termekek/marokkovek">Marokkövek</Link>
        <hr />
        <Link to="/termekek/akcio">Akciós termékek</Link>
        <hr />
        <Link to="/tervezo">Ékszer tervező (HAMAROSAN)</Link>
        <hr />
        <Link to="blog">Blogunk</Link>
        <hr />
        <ul className="menu-social-container">
          <li>
            <a href="/" className="social-link">
              <FacebookIcon className="social-img" alt="Facebook" />
            </a>
          </li>
          <li>
            <a href="/" className="social-link">
              <InstagramIcon className="social-img " alt="Instagram" />
            </a>
          </li>
          <li>
            <a href="/" className="social-link">
              <TikTokIcon className="social-img " alt="TikTok" />
            </a>
          </li>
        </ul>
      </div>
      <div
        className={`overlay ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>
    </div>
  );
}
