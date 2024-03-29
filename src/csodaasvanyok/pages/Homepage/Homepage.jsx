import "./homepage.scss";
import HomepageBracelets from "../../../images/homepage-bracelets.webp";
import HomepageMinerals from "../../../images/homepage-minerals.webp";
import HomepageWinter from "../../../images/homepage-winter.webp";
import HomepageLove from "../../../images/homepage-love.webp";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="homepage">
      <h1 className="homepage-main-title">
        Mi hiszünk az ásványok <br /> természetes erejében!
      </h1>
      <div className="homepage-image-links">
        <Link className="image-container" to="/termekek/osszes-karkoto">
          <img
            className="collection-image box-shadow-border"
            src={HomepageBracelets}
            alt="Bracelets Showcase"
            width={500}
            height={500}
          />
          <h2 className="collection-name">Karkötők</h2>
        </Link>
        <Link className="image-container " to="/termekek/marokkovek">
          <img
            className="collection-image box-shadow-border"
            src={HomepageMinerals}
            alt="Minerals Showcase"
            width={500}
            height={500}
          />
          <h2 className="collection-name">Marokkövek</h2>
        </Link>
        <Link className="image-container" to="/termekek/teli-termekek">
          <img
            className="collection-image box-shadow-border"
            src={HomepageWinter}
            alt="Winter Bracelets Showcase"
            width={500}
            height={500}
          />
          <h2 className="collection-name">Téli varázs</h2>
        </Link>
        <Link
          className="image-container"
          to="/termekek/termekek-szerelmeseknek"
        >
          <img
            className="collection-image box-shadow-border"
            src={HomepageLove}
            alt="Love Showcase"
            width={500}
            height={500}
          />
          <h2 className="collection-name">Szerelem</h2>
        </Link>
      </div>
    </div>
  );
}
