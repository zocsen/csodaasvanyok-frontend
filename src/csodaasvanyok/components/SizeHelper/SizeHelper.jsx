import SideDrawer from "../SideDrawer/SideDrawer";
import "./size-helper.scss";

export default function SizeHelper({
  handleSizeHelperVisibility,
  isSizeHelperOpen,
}) {
  const SizeHelperContent = () => {
    return (
      <div className="size-helper-content">
        <p>Hamarosan...</p>
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
