import { useContext, useEffect, useState } from "react";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import ProductList from "../../components/ProductList/ProductList";
import "./products-page.scss";
import IsMobileContext from "../../../hooks/isMobileContext";
import { ReactComponent as FilterIcon } from "../../../images/icons/filter.svg";
import ProductSorter from "../../components/ProductSorter/ProductSorter";
import { useData } from "../../../hooks/dataContext";

function filterProductsByType(product, type) {
  switch (type) {
    case "Női":
    case "Férfi":
    case "Páros":
    case "Tél":
    case "Szerelem":
    case "Horoszkóp":
    case "Akció":
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
  const [sortTitle, setSortTitle] = useState("");
  const isMobile = useContext(IsMobileContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterKey, setFilterKey] = useState(0);

  const { allProducts, productsFetching, productsError } = useData();

  useEffect(() => {
    setInitialRender(true);
  }, [type]);

  if (allProducts && initialRender && !productsFetching) {
    setInitialRender(false);
    let maxPriceValue = 0;
    let minPriceValue = Infinity;
    allProducts.forEach((product) => {
      let matchesType = false;

      switch (type) {
        case "Női":
        case "Férfi":
        case "Páros":
        case "Tél":
        case "Szerelem":
        case "Horoszkóp":
        case "Akció":
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

  function applyFilters(products) {
    return products.filter((product) => {
      const matchesCategory = filterProductsByType(product, type);
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
    if (allProducts) {
      let filtered = applyFilters(allProducts);
      let sortedFiltered = applySorting(filtered);
      setFilteredProducts(sortedFiltered);
    }
  }, [
    allProducts,
    type,
    priceRange,
    colorFilter,
    mineralFilter,
    benefitFilter,
    sortTitle,
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

  const toggleFilterVisibility = () => {
    setShowFilter(!showFilter);
    if (!showFilter) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  const resetFilters = () => {
    setSortTitle("");

    setFilterKey((prevKey) => prevKey + 1);
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
              megjeleníteni.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
