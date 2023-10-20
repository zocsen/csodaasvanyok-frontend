import { useEffect, useRef, useState } from "react";
import "./desktop-accordion.scss";
import { Link } from "react-router-dom";

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
          <img
            className="title-arrow"
            src="/images/icons/expand-more.svg"
            alt=""
            width={34}
            height={34}
          />
        </p>
      </button>
      <div className={`desktop-accordion-container ${isOpen ? "open" : ""}`}>
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

            <li>Női karkötők</li>
            <li>Férfi karkötők</li>
            <li>Páros karkötők</li>
            <li>
              Karkötő tervező <br /> (HAMAROSAN)
            </li>
          </ul>
          <ul className="desktop-menu-items">
            <h2>Marokkövek</h2>
            <h2>Akciós termékek</h2>
            <h2>Blogunk</h2>
            <h2>
              Ékszer tervező <br /> (HAMAROSAN)
            </h2>
          </ul>
        </nav>

        <ul className="desktop-menu-social-container">
          <li>
            <a href="#" className="social-link">
              <img src="/images/icons/logo-facebook.svg" alt="Facebook" />
              <span>Facebook</span>
            </a>
          </li>
          <li>
            <a href="#" className="social-link">
              <img src="/images/icons/logo-instagram.svg" alt="Instagram" />
              <span>Instagram</span>
            </a>
          </li>
          <li>
            <a href="#" className="social-link">
              <img src="/images/icons/logo-tiktok.svg" alt="TikTok" />
              <span>TikTok</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
