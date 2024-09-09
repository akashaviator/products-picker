import React, { useEffect, useReducer, useRef, useState } from "react"
import Row from "./Row.js"
import Modal from "../Modal"
import ProductPicker from "../ProductPicker/index.js"
import MovableList from "../MovableList/index.js"
import { arrayMove } from "react-movable"
import { listReducer } from "./reducer.js"
import Button from "../Button.js"
import { EMPTY_PRODUCT } from "../helper.js"
import * as actions from "./actions"
import "./styles.css"

const ProductList = () => {
  const [productList, dispatch] = useReducer(listReducer, [EMPTY_PRODUCT])
  const [showModal, setShowModal] = useState(false)
  const [container, setContainer] = useState(null)
  const wrapperRef = useRef(null)
  const rowIndexEdited = useRef(null)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const handleAddProducts = (selectedProducts) => {
    dispatch({
      type: actions.PRODUCTS_ADD,
      payload: { products: selectedProducts, index: rowIndexEdited.current },
    })
  }

  const handleMovedRow = ({ oldIndex, newIndex }) => {
    const newOrder = arrayMove(productList, oldIndex, newIndex)
    dispatch({
      type: actions.PRODUCTS_REORDER,
      payload: { products: newOrder },
    })
  }

  const renderRow = (product, index) => {
    return (
      <Row
        dispatch={dispatch}
        product={product}
        removable={productList.length > 1}
        openModal={() => {
          rowIndexEdited.current = index
          openModal()
        }}
        index={index}
      />
    )
  }

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
      <div className="mt-2 add-products-row">
        <Button
          type="secondary"
          text="Add Product"
          className="add-products-button"
          onClick={() => {
            handleAddProducts([{ id: `${new Date()}`, variants: [] }])
          }}
        />
      </div>
    </div>
  )
}

export default ProductList
