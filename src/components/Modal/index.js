import React, { Children, useState } from "react";
import "./styles.css";
import "../../App.css";
import { RiCloseLine, RiSearchLine } from "@remixicon/react";
import ProductPicker from "../ProductPicker.js";

const Modal = ({ children, isOpen, onClose }) => {
  const [products, setProducts] = useState([]);

  return (
    isOpen && (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal__body" onClick={(e) => e.stopPropagation()}>
          <div className="modal__header">
            <span className="modal__title">Select Products</span>
            <RiCloseLine
              className="cursor-pointer close-btn"
              onClick={onClose}
            />
          </div>
          <div className="modal__content">
            <div className="search__row">
              <div className="search__input">
                <input placeholder="Search Product" />
                <RiSearchLine size={20} className="search-icon" />
              </div>
            </div>
            {children}
          </div>
          <div className="modal__footer">
            <span className="font15">4 items selected</span>
            <div>
              <span className="btn-secondary font15">Cancel</span>
              <span className="btn-primary font15 ml-1">Add</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
