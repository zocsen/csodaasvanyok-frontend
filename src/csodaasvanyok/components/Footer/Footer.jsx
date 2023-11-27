import "./footer.scss";
import { ReactComponent as FacebookLogo } from "../../../images/icons/logo-facebook.svg";
import { ReactComponent as InstagramLogo } from "../../../images/icons/logo-instagram.svg";
import { ReactComponent as TikTokLogo } from "../../../images/icons/logo-tiktok.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="contact-info">
          <h3>Elérhetőségeink</h3>
          <p className="email">info@csodaasvanyok.hu</p>
          <div className="contact-icons">
            <a href="https://www.facebook.com/csodaasvanyok">
              <FacebookLogo width={40} />
            </a>
            <a href="https://www.instagram.com/csodaasvanyok">
              <InstagramLogo width={40} />
            </a>
            <a href="https://www.tiktok.com/csodaasvanyok">
              <TikTokLogo width={40} />
            </a>
          </div>
        </div>
        <p className="law-info">
          © 2023 Csodaásványok . Minden jog fenntartva.
          <Link className="" to="aszf">
            ÁSZF
          </Link>
        </p>
      </div>
    </div>
  );
}
