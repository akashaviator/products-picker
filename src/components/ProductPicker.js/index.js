import React, { useState, useEffect, useRef, useReducer } from "react";
import "./styles.css";
import "../../App.css";
import axios from "axios";
import APIError from "../APIError";
import PickerItem from "./PickerItem";
import { pickerReducer } from "./reducer";
import { fetchProducts } from "../helper";

const ProductPicker = (props) => {
  const { search = "" } = props;
  const [selectedState, dispatch] = useReducer(pickerReducer, []);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const endOfResult = useRef(false);
  const hasMounted = useRef(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchProducts(page, search)
      .then((res) => {
        if (res) {
          setProducts((prevData) => [...prevData, ...res]);
        } else {
          endOfResult.current = true;
        }
      })
      .catch((err) => {
        setError(<APIError />);
      })
      .finally(() => {});
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading && !endOfResult.current) {
        if (hasMounted.current) setPage((prev) => prev + 1);
        else hasMounted.current = true;
      }
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="picker-list custom-scrollbar font14">
      {error || (
        <ul>
          {products.map((product, index) => (
            <PickerItem
              key={product.id}
              product={product}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          ))}
          <li ref={loaderRef}>Loading</li>
        </ul>
      )}
    </div>
  );
};

export default ProductPicker;
