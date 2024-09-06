import React, { useState, useEffect, useRef, useCallback } from "react";
import "./styles.css";
import "../../App.css";
import axios from "axios";
import { placeholderImgUrl } from "../helper";
import APIError from "../APIError";
const PickerList = (props) => {
  const { ssss = [], search = "" } = props;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const endOfResult = useRef(false);
  const hasMounted = useRef(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);
  const containerRef = useRef(null);
  const fetchData = () => {
    axios
      .get(
        `https://stageapi.monkcommerce.app/task/products/search?search=${search}&page=${page}&limit=10`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "72njgfa948d9aS7gs5",
          },
        }
      )
      .then((res) => {
        if (res.data) {
          setProducts((prevData) => [...prevData, ...res.data]);
        } else {
          endOfResult.current = true;
        }
      })
      .catch((error) => {
        console.log("error aa haya");
        setError(<APIError />);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const Row = ({ product, index, style }) => (
    <div key={products[index].id} style={style}>
      <span>{index}</span>
      <span>
        <img src={products[index].image.src || placeholderImgUrl} width={50} />
      </span>
      <span>{products[index].title}</span>
    </div>
  );
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
    <div ref={containerRef} className="picker-list custom-scrollbar ">
      {error || (
        <ul>
          {products.map((product, index) => (
            <li key={product.id} style={{ height: "50px" }}>
              <span></span>
              {product.title}
            </li>
          ))}
          <li ref={loaderRef}>Loading</li>
        </ul>
      )}
    </div>
  );
};

export default PickerList;
