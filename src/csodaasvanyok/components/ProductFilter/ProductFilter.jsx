import BenefitFilter from "./BenefitFilter/BenefitFilter";
import ColorFilter from "./ColorFilter/ColorFilter";
import MineralFilter from "./MineralFilter/MineralFilter";
import PriceFilter from "./PriceFilter/PriceFilter";
import "./product-filter.scss";
import "./filter-accordion.scss";
import IsMobileContext from "../../../hooks/isMobileContext";
import { useContext } from "react";
import { ReactComponent as CloseIcon } from "../../../images/icons/close.svg";
import { ReactComponent as DeleteIcon } from "../../../images/icons/delete.svg";

export default function ProductFilter({
  onFilterChange,
  priceRange,
  minMaxValues,
  toggleFilterVisibility,
  productSorter,
  resetFilters,
  showFilter,
}) {
  const isMobile = useContext(IsMobileContext);

  return (
    <div
      className={`product-filter-background ${
        !isMobile || showFilter ? "open" : ""
      }`}
    >
      <div className="product-filter">
        {isMobile && (
          <div className="close-header">
            <p>Szűrő</p>
            <button className="close-button" onClick={toggleFilterVisibility}>
              <CloseIcon
                className="base-svg"
                alt="Close icon"
                width={34}
                height={34}
              />
            </button>
          </div>
        )}
        {isMobile && productSorter && (
          <div className="mobile-product-sorter">{productSorter}</div>
        )}

        <PriceFilter
          onValueChange={(value) => onFilterChange("price", value)}
          priceRange={priceRange}
          minMaxValues={minMaxValues}
        />
        <hr />
        <ColorFilter
          onValueChange={(value) => onFilterChange("color", value)}
        />
        <hr />
        <MineralFilter
          onValueChange={(value) => onFilterChange("mineral", value)}
        />
        <hr />
        <BenefitFilter
          onValueChange={(value) => onFilterChange("benefit", value)}
        />
        {!isMobile && (
          <button className="desktop-filter-reset" onClick={resetFilters}>
            Szűrők törlése{" "}
            <DeleteIcon className="red-svg" width={24} height={24} />
          </button>
        )}
      </div>
      {isMobile && (
        <div className="filter-footer">
          <button className="footer-buttons delete" onClick={resetFilters}>
            Törlés <DeleteIcon className="red-svg" width={24} height={24} />
          </button>
          <button
            className="footer-buttons save"
            onClick={toggleFilterVisibility}
          >
            Mentés
          </button>
        </div>
      )}
    </div>
  );
}
