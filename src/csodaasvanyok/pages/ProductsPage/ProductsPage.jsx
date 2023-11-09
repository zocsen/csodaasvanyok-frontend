import { useEffect, useState } from "react";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import ProductList from "../../components/ProductList/ProductList";
import "./products-page.scss";
import useApi from "../../../hooks/useApi";

function filterProductsByType(product, type) {
  switch (type) {
    case "Női":
    case "Férfi":
    case "Páros":
      return product.subcategory[0].name === type;
    case "Karkötő":
    case "Ásványok":
      return product.category.name === type;
    default:
      return false;
  }
}

export default function ProductsPage({ header, type }) {
  const [initialPriceRange, setInitialPriceRange] = useState([0, 0]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [colorFilter, setColorFilter] = useState([]);
  const [mineralFilter, setMineralFilter] = useState([]);
  const [benefitFilter, setBenefitFilter] = useState([]);
  const [maxProductCount, setMaxProductCount] = useState(0);
  const [initialRender, setInitialRender] = useState(true);

  const {
    data: allProducts,
    loading,
    error,
    get,
  } = useApi("http://192.168.1.8:3000/api/v1");

  useEffect(() => {
    get("/products");
  }, []);

  useEffect(() => {
    setInitialRender(true);
  }, [type]);

  if (allProducts && initialRender) {
    setInitialRender(false);
    let maxPriceValue = 0;
    let minPriceValue = Infinity;
    let count = 0;
    allProducts.forEach((product) => {
      let matchesType = false;

      switch (type) {
        case "Női":
        case "Férfi":
        case "Páros":
          if (product.subcategory[0].name === type) {
            matchesType = true;
            count++;
          }
          break;
        case "Karkötő":
        case "Ásványok": //marokkövek
          if (product.category.name === type) {
            matchesType = true;
            count++;
          }
          break;
        default:
          break;
      }
      if (matchesType) {
        maxPriceValue = Math.max(maxPriceValue, product.price);
        minPriceValue = Math.min(minPriceValue, product.price);
      }
    });

    setMaxProductCount(count);
    if (minPriceValue === Infinity) {
      minPriceValue = 0;
    }
    setInitialPriceRange([minPriceValue, maxPriceValue]);
    setPriceRange([minPriceValue, maxPriceValue]);
  }

  useEffect(() => {
    if (allProducts) {
      let filtered = allProducts.filter((product) => {
        const matchesCategory = filterProductsByType(product, type);
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
    const filterSetters = {
      price: setPriceRange,
      color: setColorFilter,
      mineral: setMineralFilter,
      benefit: setBenefitFilter,
    };
    filterSetters[filterType]?.(value);
  };

  return (
    <div className="products-page">
      <div className="products-page-container">
        <ProductFilter
          onFilterChange={handleFilterChange}
          priceRange={priceRange}
          minMaxValues={initialPriceRange}
        />
        <div className="products-page-main">
          <h1 className="products-page-title">
            {header}{" "}
            <span>({filteredProducts ? filteredProducts.length : 0} db)</span>
          </h1>
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
