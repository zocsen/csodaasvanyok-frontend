import { useEffect, useState } from "react";
import "./benefit-filter.scss";
import { ReactComponent as ExpandMoreIcon } from "../../../../images/icons/expand-more.svg";
import { useData } from "../../../../hooks/dataContext";
import { Skeleton } from "@mui/material";

export default function BenefitFilter({ onValueChange }) {
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [selectedMinerals, setSelectedMinerals] = useState([]);

  const { allBenefits, benefitsFetching, benefitsError } = useData();

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
        <ExpandMoreIcon className="arrow-img base-svg" />
      </button>

      <div className={`panel ${isPanelVisible ? "open" : ""}`}>
        <div className="box-wrapper">
          {benefitsFetching && (
            <>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </>
          )}
          {allBenefits &&
            !benefitsFetching &&
            allBenefits.map((benefit, i) => (
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
