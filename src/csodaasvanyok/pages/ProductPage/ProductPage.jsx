import { useParams } from "react-router-dom";
import "./product-page.scss";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import { useCart } from "../../../hooks/cartContext";
import formatPrice from "../../../hooks/formatPrice";
import { Box, Skeleton } from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);

  const { data: product, loading, error, get: getProduct } = useApi(API_URL);

  if (error !== null) {
    console.error(`Failed to fetch product: ${error}`);
  }

  useEffect(() => {
    getProduct("/products/" + id);
  }, [id]);

  if (!product) return null;

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  console.log(loading);

  return !loading ? (
    <div className="product-page">
      <img src={product?.image} alt="Termék" />
      <div className="product-details">
        <h1 className="product-name">{product?.name}</h1>
        <p className="product-price">{formatPrice(product.price)}</p>
        <p className="product-description">
          <span className="description-header">TERMÉK LEÍRÁSA</span> <br />
          {product?.description}
        </p>
        {product.category.name === "Karkötő" && (
          <div className="product-size-wrapper">
            <h3 className="size-title">Méret</h3>
            <div className="size-boxes">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-box ${
                    selectedSize === size ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          className={`add-to-cart-button ${
            product.category.name === "Karkötő" && selectedSize === null
              ? "disabled"
              : ""
          }`}
          disabled={
            product.category.name === "Karkötő" && selectedSize === null
          }
          onClick={() => {
            openCart();
            addToCart({ ...product, size: selectedSize });
          }}
        >
          Kosárba
        </button>
      </div>
    </div>
  ) : (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Skeleton variant="rounded" width={1400} height={1000} />
    </Box>
  );
};

export default ProductPage;
