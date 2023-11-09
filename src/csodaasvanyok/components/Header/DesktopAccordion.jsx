import { useEffect, useRef, useState } from "react";
import "./desktop-accordion.scss";
import { Link } from "react-router-dom";

import { ReactComponent as ExpandMoreIcon } from "../../../images/icons/expand-more.svg";

import { ReactComponent as FacebookIcon } from "../../../images/icons/logo-facebook.svg";
import { ReactComponent as InstagramIcon } from "../../../images/icons/logo-instagram.svg";
import { ReactComponent as TikTokIcon } from "../../../images/icons/logo-tiktok.svg";

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
              <li>Téli kollekció</li>
              <li>Szerelmesek kollekciója</li>
              <li>Horoszkóp kollekció</li>
              <li>Akciós termékek</li>
            </ul>
            <ul className="desktop-menu-items">
              <h2>Karkötők</h2>
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
                <Link to="/tervezo">
                  Karkötő Tervező <br /> (HAMAROSAN)
                </Link>
              </li>
            </ul>
            <ul className="desktop-menu-items">
              <h2>
                <Link to="/termekek/marokkovek">Marokkövek</Link>
              </h2>
              <h2>
                <Link to="/termekek/akcio">Akciós termékek</Link>
              </h2>
              <h2>
                <Link to="blog">Blogunk</Link>
              </h2>
              <h2>
                <Link to="/tervezo">
                  Ékszer tervező <br />
                  (HAMAROSAN)
                </Link>
              </h2>
            </ul>
          </nav>

          <ul className="desktop-menu-social-container">
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
      </div>
    </div>
  );
}
