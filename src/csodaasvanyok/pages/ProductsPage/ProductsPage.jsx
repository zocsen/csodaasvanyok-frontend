import { useContext, useEffect, useState } from "react";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import IsMobileContext from "../../../hooks/isMobileContext";
import ProductList from "../../components/ProductList/ProductList";
import "./products-page.scss";
import useApi from "../../../hooks/useApi";

export default function ProductsPage({ header, type }) {
  const {
    data: allProducts,
    error,
    get,
  } = useApi("https://csodaasvanyok.up.railway.app/api/v1");

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 19990]);
  const [colorFilter, setColorFilter] = useState([]);
  const [mineralFilter, setMineralFilter] = useState([]);
  const [benefitFilter, setBenefitFilter] = useState([]);

  useEffect(() => {
    get("/products");
  }, []);

  console.log(allProducts);
  useEffect(() => {
    if (allProducts) {
      console.log(allProducts);
      let filtered = allProducts.filter((product) => {
        let matchesCategory;
        switch (type) {
          case "Női":
            matchesCategory = product.subcategory[0].name === type;
            console.log(matchesCategory);
            break;
          case "Férfi":
            matchesCategory = product.subcategory[0].name === type;
            break;
          case "Páros":
            matchesCategory = product.subcategory[0].name === type;
            break;
          case "Karkötő":
            matchesCategory = product.category.name === type;
            break;
          case "Ásványok": //marokkövek
            matchesCategory = product.category.name === type;
            break;
          default:
            break;
        }
        let matchesPrice =
          product.price >= priceRange[0] && product.price <= priceRange[1];
        let matchesColor =
          colorFilter.length === 0 ||
          product.color.some((pColor) => colorFilter.includes(pColor.code));
        let matchesMineral =
          mineralFilter.length === 0 ||
          product.mineral.some((pMineral) =>
            mineralFilter.includes(pMineral.name)
          );

        let matchesBenefit =
          benefitFilter.length === 0 ||
          product.mineral.some((mineralItem) =>
            mineralItem.benefit.some((pBenefit) =>
              benefitFilter.includes(pBenefit)
            )
          );

        return (
          matchesCategory &&
          matchesPrice &&
          matchesColor &&
          matchesMineral &&
          matchesBenefit
        );
      });
      setFilteredProducts(filtered);
    }
  }, [
    allProducts,
    type,
    priceRange,
    colorFilter,
    mineralFilter,
    benefitFilter,
  ]);

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case "price":
        setPriceRange(value);
        break;
      case "color":
        setColorFilter(value);
        break;
      case "mineral":
        setMineralFilter(value);
        break;
      case "benefit":
        setBenefitFilter(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="products-page">
      <div className="products-page-container">
        <ProductFilter onFilterChange={handleFilterChange} />
        <div className="products-page-main">
          <h1 className="products-page-title">{header}</h1>
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
