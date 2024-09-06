import React from "react";
import Row from "./Row";

const ProductList = () => {
  return (
    <div className="product-list">
      <span className="header">Add Products</span>
      <div className="list-container">
        <span className="list-header">
          <span>Product</span>
          <span>Discount</span>
        </span>
        <span>
          <Row />
        </span>
      </div>
    </div>
  );
};

export default ProductList;
