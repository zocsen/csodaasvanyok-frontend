import { useEffect, useRef, useState } from "react";
import "./mobile-accordion.scss";
import { Link } from "react-router-dom";

import MenuIcon from "../../../images/icons/menu.svg";
import CloseIcon from "../../../images/icons/close.svg";
import RemoveIcon from "../../../images/icons/remove.svg";
import AddIcon from "../../../images/icons/add.svg";

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
              src={RemoveIcon}
              className={`rotate-icon ${isOpen ? "open" : ""} base-svg`}
              aria-label="-"
            />
          ) : (
            <img
              src={AddIcon}
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

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="mobile-menu" ref={dropdownRef}>
      <button
        className="mobile-header-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={MenuIcon} className="menu-icon" aria-label="Menu icon" />
      </button>
      <div className={`mobile-accordion-container ${isOpen ? "open" : ""}`}>
        <div className="mobile-accordion-header">
          <h2>Termékek</h2>
          <button className="close-button" onClick={() => setIsOpen(!isOpen)}>
            <img
              src={CloseIcon}
              className="base-svg"
              alt="Close"
              width={34}
              height={34}
            />
          </button>
        </div>

        <hr />
        <AccordionItem title="Népszerűek 🔥">
          <li>
            <Link onClick={handleLinkClick} to="/termekek/teli-termekek">
              Téli varázs ❄️
            </Link>
          </li>
          <li>
            <Link
              onClick={handleLinkClick}
              to="/termekek/termekek-szerelmeseknek"
            >
              Szerelmeseknek 💖
            </Link>
          </li>
          <li>
            <Link onClick={handleLinkClick} to="/termekek/horoszkopos-termekek">
              Horoszkóp ♌
            </Link>
          </li>
          <li>
            <Link onClick={handleLinkClick} to="/termekek/akcios-termekek">
              Akciós termékek 🏷️
            </Link>
          </li>
        </AccordionItem>
        <hr />
        <AccordionItem title="Karkötők">
          <li>
            <Link onClick={handleLinkClick} to="/termekek/osszes-karkoto">
              Összes karkötő
            </Link>
          </li>
          <li>
            <Link onClick={handleLinkClick} to="/termekek/noi-karkotok">
              Női karkötők
            </Link>
          </li>
          <li>
            <Link onClick={handleLinkClick} to="/termekek/ferfi-karkotok">
              Férfi karkötők
            </Link>
          </li>
          <li>
            <Link onClick={handleLinkClick} to="/termekek/paros-karkotok">
              Páros karkötők
            </Link>
          </li>
          <li>
            <Link onClick={handleLinkClick} to="/termekek/natural-karkotok">
              Natural karkötők
            </Link>
          </li>
        </AccordionItem>
        <hr />
        <Link onClick={handleLinkClick} to="/termekek/marokkovek">
          Marokkövek
        </Link>
        <hr />
        <Link onClick={handleLinkClick} to="/termekek/fulbevalok">
          Fülbevalók
        </Link>
        <hr />
        <Link onClick={handleLinkClick} to="/termekek/nyaklancok">
          Nyakláncok 📿
        </Link>
        <hr />
        <Link onClick={handleLinkClick} to="/termekek/aprosagok">
          Apróságok
        </Link>
        <hr />
        <Link onClick={handleLinkClick} to="/termekek/akcios-termekek">
          Akciós termékek 🏷️
        </Link>
        <hr />
        <Link onClick={handleLinkClick} to="/karkoto-tervezo">
          Ékszer tervező (HAMAROSAN)
        </Link>
        <hr />
        <Link onClick={handleLinkClick} to="/asvany-katalogus">
          Ásvány katalógus
        </Link>
        <hr />
      </div>
      <div
        className={`overlay ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>
    </div>
  );
}
