import formatPrice from "../../../hooks/formatPrice";
import "./product-list.scss";
import { Link } from "react-router-dom";

export default function ProductList({ products }) {
  return (
    <div className="container">
      {products &&
        products.map((product) => {
          // Use a slug or a URL-friendly version of the product name
          function convertToSlug(text) {
            const map = {
              á: "a",
              é: "e",
              í: "i",
              ó: "o",
              ö: "o",
              ő: "o",
              ú: "u",
              ü: "u",
              ű: "u",
              Á: "A",
              É: "E",
              Í: "I",
              Ó: "O",
              Ö: "O",
              Ő: "O",
              Ú: "U",
              Ü: "U",
              Ű: "U",
            };

            return text
              .split("")
              .map((char) => map[char] || char)
              .join("")
              .toLowerCase()
              .replace(/[^a-z0-9]/g, "_") // Replace any non-alphanumeric character with _
              .replace(/_+/g, "_"); // Replace multiple underscores with a single underscore
          }

          const productSlug = convertToSlug(product.name);
          return (
            <div className="grid-item" key={product.id}>
              <Link to={`/termek/${productSlug}/${product.id}`}>
                <img
                  className="product-image"
                  src={product.image}
                  alt="Termék"
                />
              </Link>
              <h1 className="product-name">{product.name}</h1>
              <p className="product-price">{formatPrice(product.price)}</p>
            </div>
          );
        })}
    </div>
  );
}
