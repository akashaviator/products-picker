import React, { useState } from "react";
import Row from "./Row";
import Modal from "../Modal";
import ProductPicker from "../ProductPicker.js";

const ProductList = () => {
  const [showModal, setShowModal] = useState(true);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="product-list">
      <span className="header">Add Products</span>
      <div className="list-container">
        <span className="list-header">
          <span>Product</span>
          <span>Discount</span>
        </span>
        <span>
          <Row openModal={openModal} />
        </span>
      </div>
      {showModal ? (
        <Modal onClose={closeModal}>
          <ProductPicker />
        </Modal>
      ) : null}
    </div>
  );
};

export default ProductList;
