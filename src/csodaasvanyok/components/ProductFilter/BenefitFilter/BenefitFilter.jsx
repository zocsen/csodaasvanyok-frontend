import { useEffect, useState } from "react";
import useApi from "../../../../hooks/useApi";
import "./benefit-filter.scss";

export default function BenefitFilter() {
  const { data, error, get } = useApi(
    "https://csodaasvanyok.up.railway.app/api/v1"
  );

  const [isPanelVisible, setIsPanelVisible] = useState(true);

  useEffect(() => {
    get("/benefits");
  }, []);

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
                  //   checked={benefitCheckboxStates[benefit.id]}
                  //   onChange={() => onbenefitSelect(benefit)}
                />
                <label htmlFor={`benefit${i + 1}`}>{benefit.name}</label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
