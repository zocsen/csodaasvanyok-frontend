import { useEffect } from "react";
import useApi from "../../../hooks/useApi";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import "./product-list.scss";

export default function ProductList() {
  const { data, error, get } = useApi(
    "https://csodaasvanyok.up.railway.app/api/v1"
  );

  useEffect(() => {
    get("/products");
  }, []);

  return (
    <div className="container">
      {data &&
        data.map((product) => {
          // Convert the price to a string and then format it with a space every 3rd number
          const formattedPrice = String(product.price).replace(
            /\B(?=(\d{3})+(?!\d))/g,
            " "
          );

          return (
            <div className="grid-item" key={product.id}>
              <img className="product-image" src={product.image} alt="Termék" />
              <h1 className="product-name">{product.name}</h1>
              <p className="product-price">{`${formattedPrice} Ft`}</p>
            </div>
          );
        })}
    </div>
  );
}
