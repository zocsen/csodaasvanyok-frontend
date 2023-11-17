import { useParams } from "react-router-dom";
import "./product-page.scss";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import { useCart } from "../../../hooks/cartContext";
import formatPrice from "../../../hooks/formatPrice";

const ProductPage = () => {
  const { slug, id } = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);

  console.log("ProductPage rendered", slug, id);

  const {
    data: product,
    loading,
    error,
    get: getProduct,
  } = useApi("http://192.168.1.8:3000/api/v1");

  useEffect(() => {
    getProduct("/products/" + id);
  }, [id]);

  if (!product) return;
  console.log(product);

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <div className="product-page">
      <img src={product?.image} alt="Termék" />
      <div className="product-details">
        <h1 className="product-name">{product?.name}</h1>
        <p className="product-price">{formatPrice(product.price)}</p>
        <p className="product-description">{product?.description}</p>
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
          className="add-to-cart-button"
          disabled={
            product.category.name === "Karkötő" && selectedSize === null
          }
          onClick={() => addToCart({ ...product, size: selectedSize })}
        >
          Kosárba
        </button>
      </div>
    </div>
  );
};

export default ProductPage;