import { useEffect, useState } from "react";
import useApi from "../../../../hooks/useApi";
import "./benefit-filter.scss";

export default function BenefitFilter({ onValueChange }) {
  const { data, error, get } = useApi(
    "https://csodaasvanyok.up.railway.app/api/v1"
  );

  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [selectedMinerals, setSelectedMinerals] = useState([]);

  useEffect(() => {
    get("/benefits");
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
        onClick={() => setIsPanelVisible(!isPanelVisible)}
      >
        <span>Jótékony hatások</span>
        <img
          className="arrow-img"
          src="/images/icons/expand-more.svg"
          alt="V"
        />
      </button>

      <div className={`panel ${isPanelVisible ? "open" : ""}`}>
        <div className="box-wrapper">
          {data &&
            data.map((benefit, i) => (
              <div key={benefit.id} className="item">
                <input
                  id={`benefit${i + 1}`}
                  className="css-checkbox"
                  type="checkbox"
                  value={benefit.name}
                  onChange={(e) => handleChange(benefit.id, e.target.checked)}
                />
                <label htmlFor={`benefit${i + 1}`}>{benefit.name}</label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
