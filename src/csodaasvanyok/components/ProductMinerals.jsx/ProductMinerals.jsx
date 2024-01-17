import { useState } from "react";
import "./product-minerals.scss";

import ExpandMoreIcon from "../../../images/icons/expand-more.svg";

// https://codepen.io/javiervd/pen/MEajJx

export default function ProductMinerals({ product }) {
  const MineralItemAccordion = ({ title, children }) => {
    return (
      <>
        <div className="accordion-style box-shadow-border" tabIndex={0}>
          <h2 className="mineral-name">{title}</h2>
          <img
            src={ExpandMoreIcon}
            className={`rotate-icon base-svg`}
            alt="expand"
          />
        </div>
        <div className={`accordion-content`}>{children}</div>
      </>
    );
  };

  return (
    product && (
      <div className="product-minerals">
        {product.mineral.map((mineralType) => (
          <MineralItemAccordion key={mineralType.name} title={mineralType.name}>
            <div className="mineral-container">
              <p className="mineral-description">{mineralType.description}</p>
              <ul className="mineral-benefits">
                {mineralType.benefit.map((benefit) => (
                  <li
                    className="mineral-benefit-item box-shadow-border"
                    key={benefit._id}
                  >
                    {benefit.name}
                  </li>
                ))}
              </ul>
            </div>
          </MineralItemAccordion>
        ))}
      </div>
    )
  );
}
