import { useEffect, useState } from "react";
import useApi from "../../../../hooks/useApi";
import "./mineral-filter.scss";
import { ReactComponent as ExpandMoreIcon } from "../../../../images/icons/expand-more.svg";
const API_URL = process.env.REACT_APP_API_URL;
export default function MineralFilter({ onValueChange }) {
  const { data, error, get } = useApi(API_URL);
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [selectedMinerals, setSelectedMinerals] = useState([]);

  useEffect(() => {
    get("/minerals");
  }, []);

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
        <ExpandMoreIcon className="arrow-img base-svg" />
      </button>
      <div className={`panel ${isPanelVisible ? "open" : ""}`}>
        <div className="box-wrapper">
          {data &&
            data.map((mineral, i) => (
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
