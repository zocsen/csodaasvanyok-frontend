import { useContext, useEffect, useState } from "react";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import ProductList from "../../components/ProductList/ProductList";
import "./products-page.scss";
import IsMobileContext from "../../../hooks/isMobileContext";
import { ReactComponent as FilterIcon } from "../../../images/icons/filter.svg";
import ProductSorter from "../../components/ProductSorter/ProductSorter";
import { useData } from "../../../hooks/dataContext";
import { forceCheck } from "react-lazyload";

function filterProductsByType(product, type) {
  switch (type) {
    case "Női":
    case "Férfi":
      return product.subcategory.some(
        (subcategory) =>
          subcategory.name === type || subcategory.name === "Páros"
      );
    case "Páros":
    case "Tél":
    case "Szerelem":
    case "Horoszkóp":
    case "Akció":
      return product.subcategory.some(
        (subcategory) => subcategory.name === type
      );
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
  const [sortTitle, setSortTitle] = useState("");
  const isMobile = useContext(IsMobileContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterKey, setFilterKey] = useState(0);
  const [mineralsAvailable, setMineralsAvailable] = useState([]);
  const [benefitsAvailable, setBenefitsAvailable] = useState([]);

  const { allProducts, productsFetching, productsError } = useData();

  const [filteredProductsByType, setFilteredProductsByType] = useState();

  useEffect(() => {
    setInitialRender(true);
  }, [type]);

  const resetFilters = () => {
    setSortTitle("");

    setFilterKey((prevKey) => prevKey + 1);
  };

  if (allProducts && initialRender && !productsFetching) {
    setInitialRender(false);
    resetFilters();
    let maxPriceValue = 0;
    let minPriceValue = Infinity;
    let tempProducts = new Set();

    allProducts.forEach((product) => {
      if (filterProductsByType(product, type)) {
        maxPriceValue = Math.max(maxPriceValue, product.price);
        minPriceValue = Math.min(minPriceValue, product.price);
        tempProducts.add(product);
      }
    });

    if (minPriceValue === Infinity) {
      minPriceValue = 0;
    }

    const convertedTempProducts = Array.from(tempProducts.values());

    setInitialPriceRange([minPriceValue, maxPriceValue]);
    setPriceRange([minPriceValue, maxPriceValue]);
    determineMinerals(convertedTempProducts);
    setFilteredProductsByType(convertedTempProducts);
  }

  useEffect(() => {
    if (mineralsAvailable) {
      determineBenefits(mineralsAvailable);
    }
  }, [mineralsAvailable]);

  function determineMinerals(products) {
    const uniqueMinerals = new Map();

    products.forEach((product) => {
      if (product.mineral && Array.isArray(product.mineral)) {
        product.mineral.forEach((mineral) => {
          if (mineral._id && !uniqueMinerals.has(mineral._id)) {
            uniqueMinerals.set(mineral._id, mineral);
          }
        });
      }
    });

    const uniqueMineralObjects = Array.from(uniqueMinerals.values());

    uniqueMineralObjects.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    setMineralsAvailable(uniqueMineralObjects);
  }

  function determineBenefits(minerals) {
    const uniqueBenefits = new Map();

    minerals.forEach((mineral) => {
      if (mineral.benefit && Array.isArray(mineral.benefit)) {
        mineral.benefit.forEach((benefit) => {
          if (benefit._id && !uniqueBenefits.has(benefit._id)) {
            uniqueBenefits.set(benefit._id, benefit);
          }
        });
      }
    });

    const uniqueBenefitObjects = Array.from(uniqueBenefits.values());

    uniqueBenefitObjects.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    setBenefitsAvailable(uniqueBenefitObjects);
  }

  function applyFilters(products) {
    return products.filter((product) => {
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesColor =
        colorFilter.length === 0 ||
        product.color.some((pColor) => colorFilter.includes(pColor.code));
      const matchesMineral =
        mineralFilter.length === 0 ||
        product.mineral.some((pMineral) =>
          mineralFilter.includes(pMineral.name)
        );
      const matchesBenefit =
        benefitFilter.length === 0 ||
        product.mineral.some((mineralItem) =>
          mineralItem.benefit.some((pBenefit) =>
            benefitFilter.includes(pBenefit.id)
          )
        );

      return matchesPrice && matchesColor && matchesMineral && matchesBenefit;
    });
  }

  function applySorting(products) {
    let sortedProducts = [...products];
    switch (sortTitle) {
      case 1: // Price Ascending
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 2: // Price Descending
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 3: // Newest
        sortedProducts.sort(
          (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
        );
        break;
      default:
        break;
    }

    return sortedProducts;
  }

  useEffect(() => {
    if (filteredProductsByType) {
      let filtered = applyFilters(filteredProductsByType);
      let sortedFiltered = applySorting(filtered);
      setFilteredProducts(sortedFiltered);
    }
  }, [
    filteredProductsByType,
    type,
    priceRange,
    colorFilter,
    mineralFilter,
    benefitFilter,
    sortTitle,
  ]);

  useEffect(() => {
    forceCheck();
  }, [filteredProducts]);

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

  const toggleFilterVisibility = () => {
    setShowFilter(!showFilter);
    if (!showFilter) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  return (
    <div className="products-page">
      {showFilter && isMobile && (
        <div
          className="overlay"
          style={{ display: "block" }}
          onClick={toggleFilterVisibility}
        ></div>
      )}
      <div className="products-page-container">
        <div
          className={`product-filter-container ${
            showFilter || !isMobile ? "visible" : "hidden"
          }`}
        >
          <ProductFilter
            key={filterKey}
            onFilterChange={handleFilterChange}
            priceRange={priceRange}
            minMaxValues={initialPriceRange}
            toggleFilterVisibility={toggleFilterVisibility}
            resetFilters={resetFilters}
            showFilter={showFilter}
            mineralsAvailable={mineralsAvailable}
            benefitsAvailable={benefitsAvailable}
            productSorter={
              <ProductSorter
                sortTitle={sortTitle}
                handleSortChange={handleSortChange}
              />
            }
          />
        </div>
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
              <ProductSorter
                sortTitle={sortTitle}
                handleSortChange={handleSortChange}
              />
            ) : (
              ""
            )}
          </h1>
          {isMobile ? (
            <div className="products-page-divider">
              <div className="filtered-products-counter">
                {filteredProducts ? filteredProducts.length + " termék" : ""}
              </div>
              <button
                className="filter-button"
                onClick={toggleFilterVisibility}
              >
                <FilterIcon className="base-svg" /> <span>Szűrő</span>
              </button>
            </div>
          ) : (
            ""
          )}

          {productsError === null && filteredProducts.length !== 0 ? (
            <ProductList products={filteredProducts} />
          ) : (
            <p>
              Sajnáljuk, de jelen pillanatban, nem tudunk terméket
              megjeleníteni. Készletünk folyamatosan növekszik, nézz vissza
              később! ❤️
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
