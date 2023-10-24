import { useEffect, useState } from "react";
import useApi from "../../../../hooks/useApi";
import "./mineral-filter.scss";

export default function MineralFilter({ onValueChange }) {
  const { data, error, get } = useApi(
    "https://csodaasvanyok.up.railway.app/api/v1"
  );
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
        <img
          className="arrow-img"
          src="/images/icons/expand-more.svg"
          alt="V"
        />
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
