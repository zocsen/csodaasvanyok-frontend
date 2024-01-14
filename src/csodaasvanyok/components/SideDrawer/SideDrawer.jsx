import "./side-drawer.scss";

import CloseIcon from "../../../images/icons/close.svg";

export default function SideDrawer({
  isDrawerOpen,
  closeSideDrawer,
  title,
  ContentComponent,
  FooterComponent,
}) {
  return (
    <>
      <div className={`side-drawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="side-drawer-header">
          <h2>{title}</h2>
          <button onClick={() => closeSideDrawer()}>
            <img
              src={CloseIcon}
              className="base-svg"
              alt="Close"
              width={34}
              height={34}
            />
          </button>
        </div>
        <div className="side-drawer-content">{ContentComponent}</div>
        <div className="side-drawer-footer">{FooterComponent}</div>
      </div>
      <div
        className={`overlay ${isDrawerOpen ? "open" : ""}`}
        onClick={() => closeSideDrawer()}
      ></div>
    </>
  );
}
