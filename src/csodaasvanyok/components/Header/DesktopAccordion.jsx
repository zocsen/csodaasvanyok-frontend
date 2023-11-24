import { useEffect, useRef, useState } from "react";
import "./desktop-accordion.scss";
import { Link } from "react-router-dom";

import { ReactComponent as ExpandMoreIcon } from "../../../images/icons/expand-more.svg";

export default function DesktopAccordion() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };
  return (
    <div className="desktop-menu" ref={dropdownRef}>
      <button
        className="desktop-header-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="desktop-header-menu-title">
          Termékek{" "}
          <ExpandMoreIcon
            className="arrow-img base-svg"
            width={34}
            height={34}
          />
        </p>
      </button>
      <div className={`desktop-accordion ${isOpen ? "open" : ""}`}>
        <div className="desktop-accordion-container">
          <nav className="desktop-menu-navigation">
            <ul className="desktop-menu-items">
              <h2>Népszerűek</h2>
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
                <Link
                  onClick={handleLinkClick}
                  to="/termekek/horoszkopos-termekek"
                >
                  Horoszkóp ♌
                </Link>
              </li>
              <li>
                <Link onClick={handleLinkClick} to="/termekek/akcios-termekek">
                  Akciós termékek 🏷️
                </Link>
              </li>
            </ul>
            <ul className="desktop-menu-items">
              <h2>Karkötők</h2>
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
                <Link onClick={handleLinkClick} to="/karkoto-tervezo">
                  Karkötő Tervező <br /> (HAMAROSAN)
                </Link>
              </li>
            </ul>
            <ul className="desktop-menu-items">
              <h2>
                <Link onClick={handleLinkClick} to="/termekek/marokkovek">
                  Marokkövek
                </Link>
              </h2>
              <h2>
                <Link onClick={handleLinkClick} to="/termekek/akcios-termekek">
                  Akciós termékek 🏷️
                </Link>
              </h2>
              <h2>
                <Link onClick={handleLinkClick} to="/karkoto-tervezo">
                  Ékszer tervező <br />
                  (HAMAROSAN)
                </Link>
              </h2>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
