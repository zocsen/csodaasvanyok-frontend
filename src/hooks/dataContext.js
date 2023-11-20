import { createContext, useContext, useState } from "react";
import useApi from "./useApi";

const DataContext = createContext();

const API_URL = process.env.REACT_APP_API_URL;

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [initialRender, setInitialRender] = useState(true);

  const {
    data: allProducts,
    get: getProducts,
    loading: productsFetching,
    error: productsError,
  } = useApi(API_URL);

  const {
    data: allMinerals,
    get: getMinerals,
    loading: mineralsFetching,
    error: mineralsError,
  } = useApi(API_URL);

  const {
    data: allBenefits,
    get: getBenefits,
    loading: benefitsFetching,
    error: benefitsError,
  } = useApi(API_URL);

  if (initialRender) {
    setInitialRender(false);
    getProducts("/products");
    getMinerals("/minerals");
    getBenefits("/benefits");
  }

  if (productsError || mineralsError || benefitsError !== null) {
    console.error(`Error during products fetch: ${productsError}`);
    console.error(`Error during minerals fetch: ${mineralsError}`);
    console.error(`Error during benefits fetch: ${benefitsError}`);
  }

  const value = {
    allProducts,
    allMinerals,
    allBenefits,
    productsFetching,
    mineralsFetching,
    benefitsFetching,
    productsError,
    mineralsError,
    benefitsError,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
