import React, { useState, useEffect } from "react";
import "./price-filter.scss";
import { Slider } from "@mui/material";

import ExpandMoreIcon from "../../../../images/icons/expand-more.svg";

function PriceFilter({ onValueChange, priceRange, minMaxValues }) {
  const [rangeValues, setRangeValues] = useState(priceRange);
  const [currentRange, setCurrentRange] = useState(priceRange);
  const [isPanelVisible, setIsPanelVisible] = useState(true);

  useEffect(() => {
    onValueChange(currentRange);
    setRangeValues(currentRange);
  }, [currentRange, onValueChange]);

  useEffect(() => {
    if (minMaxValues?.length === 2) {
      setCurrentRange(minMaxValues);
    }
  }, [minMaxValues]);

  const togglePanelVisibility = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  return (
    <div className="filter-block">
      <button className="filter-accordion" onClick={togglePanelVisibility}>
        <span>Ár</span>
        <img
          src={ExpandMoreIcon}
          className={`arrow-img base-svg ${isPanelVisible ? "rotate-180" : ""}`}
          alt="expand"
        />
      </button>
      <div className={`faster-panel ${isPanelVisible ? "open" : ""} panel`}>
        <div className="min-max">
          <div className="price-box">
            <label>Min: {rangeValues[0]} Ft</label>
          </div>
          <div className="price-box">
            <label>Max: {rangeValues[1]} Ft</label>
          </div>
        </div>
        <div className="price-slider">
          <Slider
            min={minMaxValues[0]}
            max={minMaxValues[1]}
            value={currentRange}
            onChange={(event, newValue) => setCurrentRange(newValue)}
            step={50}
            sx={{
              color: "var(--primary-font-color)",
              height: 4,
              "& .MuiSlider-thumb": {
                width: 20,
                height: 20,
                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                "&:before": {
                  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
                },
                "&.Mui-active": {
                  width: 20,
                  height: 20,
                },
              },
              "& .MuiSlider-rail": {
                opacity: 0.28,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PriceFilter;
