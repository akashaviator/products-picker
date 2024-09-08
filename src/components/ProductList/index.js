import React, { useEffect, useReducer, useRef, useState } from "react"
import Row from "./Row"
import Modal from "../Modal"
import ProductPicker from "../ProductPicker.js"
import "./styles.css"
import "../../App.css"
import MovableList from "../MovableList/index.js"
import { arrayMove } from "react-movable"
import { listReducer } from "./reducer.js"
import Button from "../Button.js"
import { EMPTY_PRODUCT } from "../helper.js"

const ProductList = () => {
  const [showModal, setShowModal] = useState(false)
  const [productList, dispatch] = useReducer(listReducer, [EMPTY_PRODUCT])
  const [container, setContainer] = useState(null)

  const wrapperRef = useRef(null)
  const rowIndexEdited = useRef(null)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const handleAddProducts = (selectedProducts) => {
    dispatch({
      type: "PRODUCTS/ADD",
      payload: { products: selectedProducts, index: rowIndexEdited.current },
    })
  }

  const handleMovedRow = ({ oldIndex, newIndex }) => {
    const newOrder = arrayMove(productList, oldIndex, newIndex)
    dispatch({
      type: "PRODUCTS/REORDER",
      payload: { products: newOrder },
    })
  }

  const renderRow = (product, index) => {
    console.log("row rendered")
    return (
      <Row
        dispatch={dispatch}
        product={product}
        openModal={() => {
          console.log(index, "index")
          rowIndexEdited.current = index
          openModal()
        }}
        index={index}
      />
    )
  }

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
      </div>
      {showModal ? (
        <Modal onClose={closeModal}>
          <ProductPicker onClose={closeModal} onAdd={handleAddProducts} />
        </Modal>
      ) : null}
      <div
        className="mt-2"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Button
          type="secondary"
          text="Add Product"
          style={{ padding: "10px 40px" }}
          onClick={() => {
            handleAddProducts([EMPTY_PRODUCT])
          }}
        />
      </div>
    </div>
  )
}

export default ProductList
