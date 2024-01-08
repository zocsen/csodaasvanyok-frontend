import { useEffect, useState } from "react";
import "./mineral-filter.scss";
import ExpandMoreIcon from "../../../../images/icons/expand-more.svg";
import { useData } from "../../../../hooks/dataContext";
import { Skeleton } from "@mui/material";
export default function MineralFilter({ onValueChange }) {
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [selectedMinerals, setSelectedMinerals] = useState([]);

  const { allMinerals, mineralsFetching } = useData();

  const handleChange = (mineral, checked) => {
    if (checked) {
      setSelectedMinerals((prevState) => [...prevState, mineral]);
    } else {
      setSelectedMinerals((prevState) =>
        prevState.filter((item) => item !== mineral)
      );
    }
  };

  useEffect(() => {
    onValueChange(selectedMinerals);
  }, [selectedMinerals, onValueChange]);

  return (
    <div className="filter-block">
      <button
        className="filter-accordion"
        onClick={() => {
          setIsPanelVisible(!isPanelVisible);
        }}
      >
        <span>Ásvány</span>
        <img
          src={ExpandMoreIcon}
          className={`arrow-img base-svg ${isPanelVisible ? "rotate-180" : ""}`}
          alt="expand"
        />
      </button>
      <div className={`panel ${isPanelVisible ? "open" : ""}`}>
        <div className="box-wrapper">
          {mineralsFetching && (
            <>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </>
          )}
          {allMinerals &&
            !mineralsFetching &&
            allMinerals.map((mineral, i) => (
              <div key={mineral.id} className="item">
                <input
                  id={`mineral${i + 1}`}
                  className="css-checkbox"
                  type="checkbox"
                  value={mineral.name}
                  onChange={(e) => handleChange(mineral.name, e.target.checked)}
                />
                <label htmlFor={`mineral${i + 1}`}>{mineral.name}</label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
