import { useEffect, useRef, useState } from "react";
import "./mobile-accordion.scss";

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
              src="/images/icons/remove-icon.svg"
              alt="-"
            />
          ) : (
            <img
              className={`rotate-icon ${isOpen ? "open" : ""}`}
              src="/images/icons/add-icon.svg"
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
    <div ref={dropdownRef}>
      <button
        className="mobile-header-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        Mobile
      </button>
      <div className={`mobile-accordion-container ${isOpen ? "open" : ""}`}>
        <div className="mobile-accordion-header">
          <h2>Termékek</h2>
          <button className="close-button" onClick={() => setIsOpen(!isOpen)}>
            <img width={34} src="/images/icons/close-button.svg" alt="" />
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
          <li>Összes karkötő</li>
          <li>Női karkötők</li>
          <li>Férfi karkötők</li>
          <li>Páros karkötők</li>
          <li>Karkötő tervező (HAMAROSAN)</li>
        </AccordionItem>
        <hr />
        <div>Marokkövek</div>
        <hr />
        <div>Akciós termékek</div>
        <hr />
        <div>Ékszer tervező (HAMAROSAN)</div>
        <hr />
        <div>Blogunk</div>
        <hr />
        <div class="menu-bottom">
          <ul class="menu-category-list">
            <p>Ne maradj le semmiről</p>

            <img
              src="/images/icons/down-arrow.svg"
              class="down-arrow"
              alt="Down arrow"
            />

            <ul class="menu-social-container">
              <li>
                <a href="#" class="social-link">
                  <img src="/images/icons/logo-facebook.svg" alt="Facebook" />
                </a>
              </li>
              <li>
                <a href="#" class="social-link">
                  <img src="/images/icons/logo-instagram.svg" alt="Instagram" />
                </a>
              </li>
              <li>
                <a href="#" class="social-link">
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
