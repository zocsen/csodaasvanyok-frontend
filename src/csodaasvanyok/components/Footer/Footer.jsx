import "./footer.scss";
import { Link } from "react-router-dom";
import { ReactComponent as FacebookLogo } from "../../../images/icons/logo-facebook.svg";
import { ReactComponent as InstagramLogo } from "../../../images/icons/logo-instagram.svg";
import { ReactComponent as TikTokLogo } from "../../../images/icons/logo-tiktok.svg";

import MasterCard from "../../../images/icons/payments/MasterCard.png";
import Visa from "../../../images/icons/payments/Visa.png";
import ApplePay from "../../../images/icons/payments/ApplePay.png";
import GooglePay from "../../../images/icons/payments/GooglePay.png";
import StripePay from "../../../images/icons/payments/StripePay.png";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="upper-footer">
          <div className="footer-menu">
            <h3>Menü</h3>
            <Link className="footer-link" to="/rolunk">
              Rólunk
            </Link>
            <Link className="footer-link" to="/termekek/osszes-karkoto">
              Karkötők
            </Link>
            <Link className="footer-link" to="/termekek/marokkovek">
              Marokkövek
            </Link>
            <Link className="footer-link" to="/karkoto-tervezo">
              Ékszer tervező (hamarosan)
            </Link>
            {/* <Link to="/blog">Blog</Link>
            <Link to="/felhasznalo">Fiók</Link> */}
          </div>
          <div className="footer-help">
            <h3>Segítség</h3>
            <Link className="footer-link" to="/meret-segedlet">
              Méret segédlet
            </Link>
            <Link className="footer-link" to="/asvany-katalogus">
              Ásvány katalógus
            </Link>
            <Link className="footer-link" to="/gyakran-ismetelt-kerdesek">
              Gyakran ismételt kérdések
            </Link>
            <Link className="footer-link" to="/aszf">
              ÁSZF
            </Link>
            {/* <Link to="/adatkezelesi-tajekoztato">Adatkezelési tájékoztató</Link> */}
          </div>
          <div className="footer-contact">
            <h3>Elérhetőségeink</h3>
            <p className="email">info@csodaasvanyok.hu</p>
            <div className="contact-icons">
              <a href="https://www.facebook.com/csodaasvanyok">
                <FacebookLogo width={24} />
              </a>
              <a href="https://www.instagram.com/csodaasvanyok">
                <InstagramLogo width={24} />
              </a>
              {/* <a href="https://www.tiktok.com/csodaasvanyok">
                <TikTokLogo width={24} />
              </a> */}
            </div>
          </div>
        </div>
        <hr />
        <div className="lower-footer">
          <p className="law-info">
            © 2024 Csodaásványok. Minden jog fenntartva.
          </p>
          <ul className="payment-options">
            <li>
              <img src={MasterCard} alt="MasterCard" />
            </li>
            <li>
              <img src={Visa} alt="Visa" />
            </li>
            <li>
              <img src={ApplePay} alt="ApplePay" />
            </li>
            <li>
              <img src={GooglePay} alt="GooglePay" />
            </li>
            <li>
              <img src={StripePay} alt="StripePay" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
