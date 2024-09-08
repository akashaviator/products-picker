import React, { useEffect, useState } from "react"
import Row from "./Row"
import Modal from "../Modal"
import ProductPicker from "../ProductPicker.js"
import "./styles.css"
import "../../App.css"

const ProductList = () => {
  const [showModal, setShowModal] = useState(true)
  const [productList, setProductList] = useState([])
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const handleAddProducts = (addedProducts) => {
    setProductList(addedProducts)
  }
  useEffect(() => {
    console.log(productList, "products list")
  }, [productList])
  return (
    <div className="product-list">
      <span className="header">Add Products</span>
      <div className="list-container">
        <span className="list-header">
          <span>Product</span>
          <span>Discount</span>
        </span>

        {productList.length ? (
          productList.map((product, i) => (
            <Row
              product={product}
              openModal={() => {
                console.log(i)
                openModal()
              }}
              index={i + 1}
            />
          ))
        ) : (
          <Row openModal={openModal} />
        )}
        <span></span>
      </div>
      {showModal ? (
        <Modal onClose={closeModal}>
          <ProductPicker onClose={closeModal} onAdd={handleAddProducts} />
        </Modal>
      ) : null}
    </div>
  )
}

export default ProductList
