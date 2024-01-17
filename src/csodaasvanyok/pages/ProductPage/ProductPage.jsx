import { useParams } from "react-router-dom";
import "./product-page.scss";
import { useState } from "react";
import useApi from "../../../hooks/useApi";
import { useCart } from "../../../hooks/cartContext";
import formatPrice from "../../../hooks/formatPrice";
import SizeHelper from "../../components/SizeHelper/SizeHelper";
import ProductMinerals from "../../components/ProductMinerals.jsx/ProductMinerals";

const API_URL = process.env.REACT_APP_API_URL;

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);

  const { data: product, loading, error, get: getProduct } = useApi(API_URL);

  const [isSizeHelperOpen, setIsSizeHelperOpen] = useState(false);

  const [initialRender, setInitialRender] = useState(true);

  const openSizeHelper = () => {
    setIsSizeHelperOpen(true);
    document.body.classList.add("no-scroll");
  };

  const closeSizeHelper = () => {
    setIsSizeHelperOpen(false);
    document.body.classList.remove("no-scroll");
  };

  if (error !== null) {
    console.error(`Failed to fetch product: ${error}`);
  }

  if (initialRender) {
    setInitialRender(false);
    getProduct("/products/" + id);
  }

  if (!product) return null;

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  console.log(loading);

  return (
    <>
      <div className="product-page">
        <img
          className="product-image box-shadow-border"
          src={product?.image}
          alt="Termék"
        />
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
              <button
                className="size-helper-button"
                onClick={() => openSizeHelper()}
              >
                Méret segédlet
              </button>
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
        <SizeHelper
          handleSizeHelperVisibility={() => closeSizeHelper()}
          isSizeHelperOpen={isSizeHelperOpen}
        />
      </div>
      <ProductMinerals product={product} />
    </>
  );
};

export default ProductPage;
