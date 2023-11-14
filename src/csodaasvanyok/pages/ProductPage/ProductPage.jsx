import { useParams } from "react-router-dom";
import "./product-page.scss";
import { useEffect } from "react";
import useApi from "../../../hooks/useApi";
import { useCart } from "../../../hooks/cartContext";

const ProductPage = () => {
  const { slug, id } = useParams();
  const { addToCart } = useCart();

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
  const formattedPrice = String(product.price).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  return (
    <div className="product-page">
      <img src={product?.image} alt="Termék" />
      <div className="product-details">
        <h1 className="product-name">{product?.name}</h1>
        <p className="product-price">{formattedPrice} Ft</p>
        <p className="product-description">{product?.description}</p>
        <button
          className="add-to-cart-button"
          onClick={() => addToCart(product)}
        >
          Kosárba
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
