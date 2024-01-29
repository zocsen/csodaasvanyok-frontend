import { useEffect, useRef, useState } from "react";
import "./desktop-accordion.scss";
import { Link } from "react-router-dom";

import ExpandMoreIcon from "../../../images/icons/expand-more.svg";

export default function DesktopAccordion() {
  const [isOpen, setIsOpen] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const dropdownRef = useRef(null);

  if (initialRender) {
    setInitialRender(false);
    document.body.classList.remove("no-scroll");
  }

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
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    document.body.classList.add("no-scroll");
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.classList.remove("no-scroll");
  };

  return (
    <div className="desktop-menu" ref={dropdownRef}>
      <button className="desktop-header-menu-btn" onClick={handleOpen}>
        <p className="desktop-header-menu-title">
          Termékek{" "}
          <img
            src={ExpandMoreIcon}
            alt="Expand"
            className={`arrow-img base-svg ${isOpen ? "rotate-180" : ""}`}
            width={34}
            height={34}
          />
        </p>
      </button>
      <div className={`desktop-accordion ${isOpen ? "open" : ""}`}>
        <div className="desktop-accordion-container">
          <nav className="desktop-menu-navigation ">
            <ul className="desktop-menu-items">
              <h2>Népszerűek 🔥</h2>
              <li>
                <Link onClick={handleClose} to="/termekek/teli-termekek">
                  Téli varázs ❄️
                </Link>
              </li>
              <li>
                <Link
                  onClick={handleClose}
                  to="/termekek/termekek-szerelmeseknek"
                >
                  Szerelmeseknek 💖
                </Link>
              </li>
              <li>
                <Link onClick={handleClose} to="/termekek/horoszkopos-termekek">
                  Horoszkóp ♌
                </Link>
              </li>
              <li>
                <Link onClick={handleClose} to="/termekek/akcios-termekek">
                  Akciós termékek 🏷️
                </Link>
              </li>
            </ul>
            <ul className="desktop-menu-items">
              <h2>Karkötők</h2>
              <li>
                <Link onClick={handleClose} to="/termekek/osszes-karkoto">
                  Összes karkötő
                </Link>
              </li>
              <li>
                <Link onClick={handleClose} to="/termekek/noi-karkotok">
                  Női karkötők
                </Link>
              </li>
              <li>
                <Link onClick={handleClose} to="/termekek/ferfi-karkotok">
                  Férfi karkötők
                </Link>
              </li>
              <li>
                <Link onClick={handleClose} to="/termekek/paros-karkotok">
                  Páros karkötők
                </Link>
              </li>
              <li>
                <Link onClick={handleClose} to="/termekek/natural-karkotok">
                  Natural karkötők
                </Link>
              </li>
            </ul>
            <ul className="desktop-menu-items">
              <h2>Egyéb</h2>
              <li>
                <Link onClick={handleClose} to="/termekek/marokkovek">
                  Marokkövek
                </Link>
              </li>
              <li>
                <Link onClick={handleClose} to="/termekek/fulbevalok">
                  Fülbevalók
                </Link>
              </li>
              <li>
                <Link onClick={handleClose} to="/termekek/nyaklancok">
                  Nyakláncok 📿
                </Link>
              </li>
              <li>
                <Link onClick={handleClose} to="/termekek/aprosagok">
                  Apróságok
                </Link>
              </li>
            </ul>
            <ul className="desktop-menu-items">
              <h2>
                <Link onClick={handleClose} to="/asvany-katalogus">
                  Ásvány katalógus
                </Link>
              </h2>
              <h2>
                <Link onClick={handleClose} to="/gyakran-ismetelt-kerdesek">
                  GYIK
                </Link>
              </h2>
              <h2>
                <Link onClick={handleClose} to="/rolunk">
                  Rólunk
                </Link>
              </h2>
              <h2>
                <Link
                  style={{ color: "red" }}
                  onClick={handleClose}
                  to="/karkoto-tervezo"
                >
                  Karkötő tervező <br />
                  (HAMAROSAN)
                </Link>
              </h2>
            </ul>
          </nav>
        </div>
      </div>
      <div
        className={`overlay ${isOpen ? "open" : ""}`}
        onClick={handleClose}
      ></div>
    </div>
  );
}
