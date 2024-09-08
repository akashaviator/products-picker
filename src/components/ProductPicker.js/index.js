import "./styles.css"
import "../../App.css"
import React, { useState, useEffect, useRef, useReducer, useMemo } from "react"
import { RiLoader4Line, RiSearchLine } from "@remixicon/react"
import _ from "underscore"
import APIError from "../APIError"
import PickerItem from "./PickerItem"
import { pickerReducer } from "./reducer"
import { fetchProductsAPI, PRIMARY_COLOR } from "../helper"
import Loader from "../Loader"
import Button from "../Button"

const ProductPicker = (props) => {
  const { onClose, onAdd } = props
  const [selectedState, dispatch] = useReducer(pickerReducer, [])
  const [search, setSearch] = useState(null)
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [endOfResult, setEndOfResult] = useState(false)
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

  const fetchProducts = (page, search, onSuccess, onFinally) => {
    fetchProductsAPI(page, search)
      .then((res) => {
        onSuccess(res)
        let hasMore
        if (res && res.length === 10) {
          hasMore = true
        } else {
          hasMore = false
        }
        setEndOfResult(!hasMore)
      })
      .catch((err) => {
        setError(<APIError />)
      })
      .finally(() => {
        if (onFinally) onFinally()
      })
  }
  useEffect(() => {
    const debounceId = setTimeout(() => {
      const firstPage = 1

      if (!_.isNull(search)) {
        console.log("running search")
        setIsLoading(true)
        setEndOfResult(false)
        fetchProducts(
          firstPage,
          search,
          (res) => setProducts(res ? [...res] : []),
          () => {
            setPage(firstPage)
            setIsLoading(false)
          }
        )
      } else {
        hasMounted.current = true
      }
    }, 500)

    return () => clearTimeout(debounceId)
  }, [search])

  useEffect(() => {
    console.log("running normal api")
    fetchProducts(page, search, (res) => {
      if (res) {
        setProducts((prevData) => [...prevData, ...res])
      }
    })
  }, [page])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !endOfResult) {
        if (hasMounted.current) setPage((prev) => prev + 1)
        else hasMounted.current = true
      }
    })
    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [products])

  return (
    <React.Fragment>
      <div className="search__row">
        <div className="search__input">
          <input
            placeholder="Search Product"
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
          />
          <RiSearchLine size={20} className="search-icon" />
        </div>
      </div>
      <div ref={containerRef} className="picker-list custom-scrollbar font14">
        {error || (isLoading && <Loader />) || (
          <ul>
            {products.map((product, index) => (
              <PickerItem
                key={product.id}
                product={product}
                dispatch={dispatch}
                selectedState={selectedState}
              />
            ))}
            {endOfResult ? null : (
              <li
                ref={loaderRef}
                style={{
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <RiLoader4Line
                  className="loader"
                  size={24}
                  color={PRIMARY_COLOR}
                />
              </li>
            )}
          </ul>
        )}
      </div>
      <div className="modal__footer">
        <span className="ml-1 font15">{selectedItemsCount} items selected</span>
        <div>
          <Button
            className="font15"
            text="Cancel"
            type="default"
            onClick={onClose}
          />

          <Button
            className="ml-1 font15"
            text="Add"
            type="primary"
            onClick={onClickAdd}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProductPicker
