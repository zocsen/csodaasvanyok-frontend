import { useEffect, useRef, useState } from "react";
import "./mobile-accordion.scss";
import { Link } from "react-router-dom";

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
            <img
              className={`rotate-icon ${isOpen ? "open" : ""}`}
              src="/images/icons/remove.svg"
              alt="-"
            />
          ) : (
            <img
              className={`rotate-icon ${isOpen ? "open" : ""}`}
              src="/images/icons/add.svg"
              alt="+"
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
        <img
          src="/images/icons/menu.svg"
          alt="Menu icon"
          width={30}
          height={30}
        />
      </button>
      <div className={`mobile-accordion-container ${isOpen ? "open" : ""}`}>
        <div className="mobile-accordion-header">
          <h2>Termékek</h2>
          <button className="close-button" onClick={() => setIsOpen(!isOpen)}>
            <img width={34} src="/images/icons/close.svg" alt="" />
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
        <div className="menu-bottom">
          <ul className="menu-category-list">
            <p>Ne maradj le semmiről</p>

            <img
              src="/images/icons/down-arrow.svg"
              className="down-arrow"
              alt="Down arrow"
            />

            <ul className="menu-social-container">
              <li>
                <a href="#" className="social-link">
                  <img src="/images/icons/logo-facebook.svg" alt="Facebook" />
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <img src="/images/icons/logo-instagram.svg" alt="Instagram" />
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <img src="/images/icons/logo-tiktok.svg" alt="TikTok" />
                </a>
              </li>
            </ul>
          </ul>
        </div>
      </div>
      <div
        className={`overlay ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>
    </div>
  );
}
