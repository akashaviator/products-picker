import React, { useEffect, useReducer, useRef, useState } from "react"
import Row from "./Row"
import Modal from "../Modal"
import ProductPicker from "../ProductPicker.js"
import "./styles.css"
import "../../App.css"
import MovableList from "../MovableList/index.js"
import { arrayMove } from "react-movable"
import { listReducer } from "./listReducer.js"

const ProductList = () => {
  const [showModal, setShowModal] = useState(false)
  const [productList, dispatch] = useReducer(listReducer, [])

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)
  const [container, setContainer] = useState(null)
  const wrapperRef = useRef(null)
  const rowIndexEdited = useRef(null)

  const handleAddProducts = (selectedProducts, index) => {
    dispatch({
      type: "PRODUCTS/ADD",
      payload: { products: selectedProducts, index: rowIndexEdited.current },
    })
  }

  const renderRow = (product, index) => {
    console.log("row rendered")
    return (
      <Row
        dispatch={dispatch}
        product={product}
        openModal={() => {
          rowIndexEdited.current = index
          openModal()
        }}
        index={index}
      />
    )
  }

  const handleMovedRow = ({ oldIndex, newIndex }) => {
    const newOrder = arrayMove(productList, oldIndex, newIndex)
    dispatch({
      type: "PRODUCTS/REORDER",
      payload: { products: newOrder },
    })
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
