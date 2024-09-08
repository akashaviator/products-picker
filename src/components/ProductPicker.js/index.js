import React, { useState, useEffect, useRef, useReducer, useMemo } from "react"
import "./styles.css"
import "../../App.css"
import APIError from "../APIError"
import PickerItem from "./PickerItem"
import { pickerReducer } from "./reducer"
import { fetchProducts, PRIMARY_COLOR } from "../helper"
import { RiLoader5Line, RiSearchLine } from "@remixicon/react"
import _ from "underscore"

const ProductPicker = (props) => {
  const { onClose, onAdd } = props
  const [selectedState, dispatch] = useReducer(pickerReducer, [])
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const endOfResult = useRef(false)
  const hasMounted = useRef(false)
  const loaderRef = useRef(null)
  const containerRef = useRef(null)

  const selectedItemsCount = useMemo(() => {
    let count = 0
    _.forEach(selectedState, (item) => {
      count += item.variants.length
    })
    return count
  }, [selectedState])

  const onClickAdd = () => {
    onAdd(selectedState)
    onClose()
  }

  useEffect(() => {
    fetchProducts(page, search)
      .then((res) => {
        if (res) {
          setProducts((prevData) => [...prevData, ...res])
        } else {
          endOfResult.current = true
        }
      })
      .catch((err) => {
        setError(<APIError />)
      })
      .finally(() => {})
  }, [page])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading && !endOfResult.current) {
        if (hasMounted.current) setPage((prev) => prev + 1)
        else hasMounted.current = true
      }
    })
    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [])

  // useEffect(() => {
  //   console.log("selected state", selectedState);
  // }, [selectedState]);

  return (
    <React.Fragment>
      <div className="search__row">
        <div className="search__input">
          <input placeholder="Search Product" />
          <RiSearchLine size={20} className="search-icon" />
        </div>
      </div>
      <div ref={containerRef} className="picker-list custom-scrollbar font14">
        {error || (
          <ul>
            {products.map((product, index) => (
              <PickerItem
                key={product.id}
                product={product}
                dispatch={dispatch}
                selectedState={selectedState}
              />
            ))}
            <li
              ref={loaderRef}
              style={{
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RiLoader5Line
                className="loader"
                size={24}
                color={PRIMARY_COLOR}
              />
            </li>
          </ul>
        )}
      </div>
      <div className="modal__footer">
        <span className="ml-1 font15">{selectedItemsCount} items selected</span>
        <div>
          <span className="btn-default font15" onClick={onClose}>
            Cancel
          </span>
          <span className="btn-primary font15 ml-1" onClick={onClickAdd}>
            Add
          </span>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProductPicker
