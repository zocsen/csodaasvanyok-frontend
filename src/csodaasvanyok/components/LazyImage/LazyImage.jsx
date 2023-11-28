import React from "react";
import LazyLoad from "react-lazyload";

const LazyImage = ({ src, alt }) => {
  return (
    <LazyLoad height={250} offset={100}>
      <img
        width={250}
        height={250}
        className="product-image"
        src={src}
        alt={alt}
      />
    </LazyLoad>
  );
};

export default LazyImage;
