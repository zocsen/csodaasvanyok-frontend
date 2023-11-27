import "./homepage.scss";
import HomepageBracelets from "../../../images/homepage-bracelets.png";
import HomepageMinerals from "../../../images/homepage-minerals.png";
import HomepageWinter from "../../../images/homepage-winter.png";
import HomepageLove from "../../../images/homepage-love.png";
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
            className="collection-image"
            src={HomepageBracelets}
            alt="Homepage Arm"
          />
          <h2 className="collection-name">Karkötők</h2>
        </Link>
        <Link className="image-container" to="/termekek/marokkovek">
          <img
            className="collection-image"
            src={HomepageMinerals}
            alt="Homepage Arm"
          />
          <h2 className="collection-name">Marokkövek</h2>
        </Link>
        <Link className="image-container" to="/termekek/teli-termekek">
          <img
            className="collection-image"
            src={HomepageWinter}
            alt="Homepage Arm"
          />
          <h2 className="collection-name">Téli varázs</h2>
        </Link>
        <Link
          className="image-container"
          to="/termekek/termekek-szerelmeseknek"
        >
          <img
            className="collection-image"
            src={HomepageLove}
            alt="Homepage Arm"
          />
          <h2 className="collection-name">Szerelem</h2>
        </Link>
      </div>
    </div>
  );
}
