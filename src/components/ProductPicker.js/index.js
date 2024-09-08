import React, { useState, useEffect, useRef, useReducer, useMemo } from "react"
import "./styles.css"
import "../../App.css"
import APIError from "../APIError"
import PickerItem from "./PickerItem"
import { pickerReducer } from "./reducer"
import { fetchProducts, PRIMARY_COLOR } from "../helper"
import { RiLoader4Line, RiSearchLine } from "@remixicon/react"
import _ from "underscore"
import Loader from "../Loader"

const ProductPicker = (props) => {
  const { onClose, onAdd } = props
  const [selectedState, dispatch] = useReducer(pickerReducer, [])
  const [search, setSearch] = useState("")
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

  const getProducts = (search, page) => {}
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (hasMounted.current) {
        console.log("running search")
        setIsLoading(true)
        setEndOfResult(false)
        fetchProducts(1, search)
          .then((res) => {
            // console.log("res", res)
            let hasMore
            setProducts(res ? [...res] : [])
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
            setPage(1)

            setIsLoading(false)
          })
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [search])

  useEffect(() => {
    console.log("running normal api")
    fetchProducts(page, search)
      .then((res) => {
        // console.log("res", res)
        if (res) {
          setProducts((prevData) => [...prevData, ...res])
        }
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
  }, [page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries[0])
        if (entries[0].isIntersecting && !isLoading && !endOfResult) {
          if (hasMounted.current) setPage((prev) => prev + 1)
          else hasMounted.current = true
        }
      },
      { root: containerRef.current }
    )
    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <React.Fragment>
      <div className="search__row">
        <div className="search__input">
          <input
            placeholder="Search Product"
            value={search}
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
