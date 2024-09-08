import React, { useEffect, useRef, useState } from "react"
import Row from "./Row"
import Modal from "../Modal"
import ProductPicker from "../ProductPicker.js"
import "./styles.css"
import "../../App.css"
import MovableList from "../MovableList/index.js"

const ProductList = () => {
  const [showModal, setShowModal] = useState(false)
  const [productList, setProductList] = useState([])
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)
  const [container, setContainer] = useState(null)
  const wrapperRef = useRef(null)

  const handleAddProducts = (addedProducts) => {
    setProductList(addedProducts)
  }

  const renderRow = (product, index) => {
    return (
      <Row
        product={product}
        openModal={() => {
          openModal()
        }}
        index={index + 1}
      />
    )
  }

  const handleMovedRow = () => {}
  useEffect(() => {
    console.log(productList, "products list")
  }, [productList])

  useEffect(() => setContainer(wrapperRef.current), [])

  return (
    <div className="product-list">
      <span className="header">Add Products</span>
      <span className="list-header">
        <span>Product</span>
        <span>Discount</span>
      </span>
      <div className="list-container" ref={wrapperRef}>
        {productList.length ? (
          <MovableList
            container={container}
            values={productList}
            onChange={handleMovedRow}
            renderItem={renderRow}
          />
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
