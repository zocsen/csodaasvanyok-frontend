import { useContext, useEffect, useState } from "react";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import ProductList from "../../components/ProductList/ProductList";
import "./products-page.scss";
import useApi from "../../../hooks/useApi";
import IsMobileContext from "../../../hooks/isMobileContext";
import { ReactComponent as FilterIcon } from "../../../images/icons/filter.svg";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
  const [initialRender, setInitialRender] = useState(true);
  const [sortTitle, setSortTitle] = useState("Rendezés");
  const isMobile = useContext(IsMobileContext);

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
    allProducts.forEach((product) => {
      let matchesType = false;

      switch (type) {
        case "Női":
        case "Férfi":
        case "Páros":
          if (product.subcategory[0].name === type) {
            matchesType = true;
          }
          break;
        case "Karkötő":
        case "Ásványok": //marokkövek
          if (product.category.name === type) {
            matchesType = true;
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

  const handleSortChange = (event) => {
    setSortTitle(event.target.value);
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
            <div className="actual-title">
              {header}{" "}
              <span>
                {!isMobile && filteredProducts
                  ? "(" + filteredProducts.length + " termék)"
                  : ""}
              </span>
            </div>

            {!isMobile ? (
              <FormControl>
                <Select
                  value={sortTitle}
                  onChange={handleSortChange}
                  label="Rendezés"
                >
                  <MenuItem value={1}>Alapértelmezett</MenuItem>
                  <MenuItem value={2}>Ár (növekvő)</MenuItem>
                  <MenuItem value={3}>Ár (csökkenő)</MenuItem>
                  <MenuItem value={4}>Legnépszerűbb</MenuItem>
                  <MenuItem value={5}>Legújabb</MenuItem>
                </Select>
              </FormControl>
            ) : (
              ""
            )}
          </h1>
          {isMobile ? (
            <div className="products-page-divider">
              <div className="filtered-products-counter">
                {filteredProducts ? filteredProducts.length + " termék" : ""}
              </div>
              <button className="filter-button">
                <FilterIcon /> <span>Szűrő</span>
              </button>
            </div>
          ) : (
            ""
          )}

          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
