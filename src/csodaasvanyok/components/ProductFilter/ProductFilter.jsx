import BenefitFilter from "./BenefitFilter/BenefitFilter";
import ColorFilter from "./ColorFilter/ColorFilter";
import MineralFilter from "./MineralFilter/MineralFilter";
import PriceFilter from "./PriceFilter/PriceFilter";
import "./product-filter.scss";
import "./filter-accordion.scss";

export default function ProductFilter({
  onFilterChange,
  priceRange,
  minMaxValues,
}) {
  return (
    <div className="product-filter">
      <PriceFilter
        onValueChange={(value) => onFilterChange("price", value)}
        priceRange={priceRange}
        minMaxValues={minMaxValues}
      />
      <ColorFilter onValueChange={(value) => onFilterChange("color", value)} />
      <MineralFilter
        onValueChange={(value) => onFilterChange("mineral", value)}
      />
      <BenefitFilter
        onValueChange={(value) => onFilterChange("benefit", value)}
      />
    </div>
  );
}
