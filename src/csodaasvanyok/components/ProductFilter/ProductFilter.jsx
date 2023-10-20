import BenefitFilter from "./BenefitFilter/BenefitFilter";
import ColorFilter from "./ColorFilter/ColorFilter";
import MineralFilter from "./MineralFilter/MineralFilter";
import PriceFilter from "./PriceFilter/PriceFilter";
import "./product-filter.scss";
import "./filter-accordion.scss";

export default function ProductFilter() {
  return (
    <div className="product-filter">
      <PriceFilter />
      <ColorFilter />
      <MineralFilter />
      <BenefitFilter />
    </div>
  );
}
