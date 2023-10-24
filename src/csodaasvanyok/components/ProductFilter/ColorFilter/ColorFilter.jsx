import { useEffect, useState } from "react";
import "./color-filter.scss";
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
        <img
          className="arrow-img"
          src="/images/icons/expand-more.svg"
          alt="V"
        />
      </button>
      <div className={`faster-panel ${isPanelVisible ? "open" : ""} panel`}>
        <div className="color-box-wrapper">
          {colors.map((color) => (
            <div
              key={color.code}
              className={`color-box ${isSelected(color) ? "selected" : ""}`}
              onClick={() => onColorSelect(color)}
              style={{ background: color.code }}
              title={color.name}
            >
              {isSelected(color) && (
                <div className="selected-checkmark">
                  <img src="/images/icons/checkmark.svg" alt="Selected" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ColorFilter;
