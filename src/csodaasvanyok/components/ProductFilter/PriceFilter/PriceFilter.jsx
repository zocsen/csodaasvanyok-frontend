import React, { useState, useEffect } from "react";
import "./price-filter.scss";
import { Slider, styled } from "@mui/material";
import { useTheme } from "@emotion/react";

function PriceFilter({ onValueChange }) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(19990);
  const [rangeValues, setRangeValues] = useState([minPrice, maxPrice]);
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    onValueChange(rangeValues);
  }, [rangeValues]);

  return (
    <div className="filter-block">
      <button
        className="filter-accordion"
        onClick={() => {
          setIsPanelVisible(!isPanelVisible);
        }}
      >
        <span>Ár</span>
        <img
          className="arrow-img"
          src="/images/icons/expand-more.svg"
          alt="V"
        />
      </button>
      <div className={`faster-panel ${isPanelVisible ? "open" : ""} panel`}>
        <div className="min-max">
          <div className="price-box">
            <label>Min: {minPrice} Ft</label>
          </div>
          <div className="price-box">
            <label>Max: {maxPrice} Ft</label>
          </div>
        </div>
        <div className="price-slider">
          <Slider
            min={0}
            max={19999}
            value={rangeValues}
            onChange={(event, newValue) => setRangeValues(newValue)}
            step={100}
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
