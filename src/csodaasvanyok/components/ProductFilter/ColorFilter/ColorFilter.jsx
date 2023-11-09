import { useEffect, useState } from "react";
import "./color-filter.scss";
import { ReactComponent as ExpandMoreIcon } from "../../../../images/icons/expand-more.svg";
function ColorFilter({ onValueChange }) {
  const colors = [
    { code: "#FF000D", name: "Piros" },
    { code: "#FFA756", name: "Narancssárga" },
    { code: "#FFFF00", name: "Citromsárga" },
    { code: "#008F00", name: "Zöld" },
    { code: "#1371D5", name: "Kék" },
    { code: "#6E2FCC", name: "Lila" },
    { code: "#F9B7FF", name: "Rózsaszín" },
    { code: "#212121", name: "Fekete" },
    { code: "#FFFFFF", name: "Fehér" },
    { code: "#8F6C4E", name: "Barna" },
    { code: "#A3A3A1", name: "Szürke" },
    { code: "#F6C61B", name: "Arany" },
    { code: "#F1D0CC", name: "Rose Gold" },
    { code: "#BCC6CC", name: "Ezüst" },
  ];

  const [selectedColors, setSelectedColors] = useState([]);
  const [isPanelVisible, setIsPanelVisible] = useState(true);

  const onColorSelect = (color) => {
    if (isSelected(color)) {
      setSelectedColors((prevColors) =>
        prevColors.filter((c) => c !== color.code)
      );
    } else {
      setSelectedColors((prevColors) => [...prevColors, color.code]);
    }
  };

  const isSelected = (color) => {
    return selectedColors.includes(color.code);
  };

  useEffect(() => {
    onValueChange(selectedColors);
  }, [selectedColors]);

  return (
    <div className="filter-block">
      <button
        className="filter-accordion"
        onClick={() => setIsPanelVisible(!isPanelVisible)}
      >
        <span>Szín</span>
        <ExpandMoreIcon className="arrow-img base-svg" />
      </button>
      <div className={`${isPanelVisible ? "open" : ""} panel`}>
        <div class="color-palette">
          <div class="color-swatch" style={{ backgroundColor: "#E5B80B" }}>
            <span>Arany</span>
          </div>
          <div class="color-swatch" style={{ backgroundColor: "#B98332" }}>
            <span>Barna</span>
          </div>
          <div class="color-swatch" style={{ backgroundColor: "#FFEF5F" }}>
            <span>Citrom</span>
          </div>
          <div class="color-swatch" style={{ backgroundColor: "#D3D3D3" }}>
            <span>Ezüst</span>
          </div>
          <div class="color-swatch" style={{ backgroundColor: "#FFFFFF" }}>
            <span>Fehér</span>
          </div>
          <div class="color-swatch" style={{ backgroundColor: "#303030" }}>
            <span>Fekete</span>
          </div>
          <div class="color-swatch" style={{ backgroundColor: "#1371D5" }}>
            <span>Kék</span>
          </div>
          <div class="color-swatch" style={{ backgroundColor: "#AB40FF" }}>
            <span>Lila</span>
          </div>
          <div class="color-swatch" style={{ backgroundColor: "#FFA756" }}>
            <span>Narancs</span>
          </div>
          <div class="color-swatch" style={{ backgroundColor: "#FF2F2F" }}>
            <span>Piros</span>
          </div>
          <div class="color-swatch" style={{ backgroundColor: "#F1D0CC" }}>
            <span>
              <nobr>Rose gold</nobr>
            </span>
          </div>
          <div class="color-swatch" style={{ backgroundColor: "#F9B7FF" }}>
            <span>Rózsaszín</span>
          </div>
          <div class="color-swatch" style={{ backgroundColor: "#E4E4E4" }}>
            <span>Szürke</span>
          </div>
          <div class="color-swatch" style={{ backgroundColor: "#008F00" }}>
            <span>Zöld</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColorFilter;
