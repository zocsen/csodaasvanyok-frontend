import SideDrawer from "../SideDrawer/SideDrawer";
import "./size-helper.scss";

export default function SizeHelper({
  handleSizeHelperVisibility,
  isSizeHelperOpen,
}) {
  const SizeHelperContent = () => {
    return (
      <div className="size-helper-content">
        <h2>Hogyan mérd le a karkötő méreted?</h2>
        <br />
        <p>
          Egy mérőszalag vagy centi segítségével könnyedén meghatározhatod az
          ideális karkötő méretet. Tekerjük a mérőszalagot szorosan, de nem
          összeszorítva a csuklónk köré ahol a karkötőt hordani fogjuk.
        </p>
        <br />
        <p>
          Ennek hiányában egy cérnaszálat vagy egy papír csíkot is használhatsz:
          tekerd körbe a csuklódon, tollal jelöld be, majd mérd le egy vonalzó
          segítségével.
        </p>
        <br />
        <h2>Válaszd ki a neked megfelelő méretet.</h2>
        <br />
        <p></p>
        <ul>
          <li>
            <strong>XS</strong> - 13-14 cm
          </li>
          <li>
            <strong>S</strong> - 15-16 cm
          </li>
          <li>
            <strong>M</strong> - 17 cm
          </li>
          <li>
            <strong>L</strong> - 18 cm
          </li>
          <li>
            <strong>XL</strong> - 19 cm
          </li>
          <li>
            <strong>XXL</strong> - 20-21 cm
          </li>
        </ul>
      </div>
    );
  };

  const SizeHelperFooter = () => {
    return (
      <button
        className="close-size-helper"
        onClick={handleSizeHelperVisibility}
      >
        Vissza
      </button>
    );
  };

  return (
    <SideDrawer
      isDrawerOpen={isSizeHelperOpen}
      closeSideDrawer={handleSizeHelperVisibility}
      title={"Méret segédlet"}
      ContentComponent={SizeHelperContent()}
      FooterComponent={SizeHelperFooter()}
    />
  );
}
