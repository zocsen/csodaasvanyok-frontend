import { useEffect, useState } from "react";
import "./benefit-filter.scss";
import ExpandMoreIcon from "../../../../images/icons/expand-more.svg";

export default function BenefitFilter({ onValueChange, benefitsAvailable }) {
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [selectedMinerals, setSelectedMinerals] = useState([]);

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
          src={ExpandMoreIcon}
          className={`arrow-img base-svg ${isPanelVisible ? "rotate-180" : ""}`}
          alt="expand"
        />
      </button>

      <div className={`panel ${isPanelVisible ? "open" : ""}`}>
        <div className="box-wrapper">
          {benefitsAvailable &&
            benefitsAvailable.map((benefit, i) => (
              <div key={benefit.id} className="item">
                <input
                  id={`benefit${i + 1}`}
                  className="css-checkbox"
                  type="checkbox"
                  value={benefit.name}
                  onChange={(e) => handleChange(benefit._id, e.target.checked)}
                />
                <label htmlFor={`benefit${i + 1}`}>{benefit.name}</label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
