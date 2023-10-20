import { useContext } from "react";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import IsMobileContext from "../../../hooks/isMobileContext";
import ProductList from "../../components/ProductList/ProductList";
import "./products-page.scss";

export default function ProductsPage({ type }) {
  const isMobile = useContext(IsMobileContext);

  return (
    <div className="products-page">
      <div className="products-page-container">
        <ProductFilter />
        <div className="products-page-main">
          <h1 className="products-page-title">{type}</h1>
          <ProductList />
        </div>
      </div>
    </div>
  );
}
