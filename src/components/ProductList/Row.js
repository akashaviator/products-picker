import React, { useState } from "react";
import { RiCloseLine, RiDraggable, RiPencilFill } from "@remixicon/react";
import Select from "react-select";
import { PRIMARY_COLOR } from "../helper.js";
import Modal from "../Modal/index.js";
import ProductPicker from "../ProductPicker.js/index.js";
const customStyles = {
  control: (base, state) => ({
    ...base,
    boxShadow: state.isFocused ? 0 : 0,
    "&:hover": {
      borderColor: PRIMARY_COLOR,
    },
    border: state.isFocused
      ? `2px solid ${PRIMARY_COLOR}`
      : "2px solid #ededed",
    height: "30px",
  }),
};
const Row = (props) => {
  const { variant = "parent", removable = true, openModal } = props;

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div className={`list-row ${variant}`}>
      <RiDraggable size={20} color="gray" className="cursor-pointer" />
      <div className="details" style={{ display: "flex" }}>
        <span
          style={{
            fontSize: "16px",
            fontWeight: "500",
            marginLeft: "15px",
            marginRight: "10px",
          }}
        >
          1.
        </span>
        <span className="item-select">
          <input placeholder="Select Product" readOnly />
          <span className="edit-btn cursor-pointer" onClick={() => openModal()}>
            <RiPencilFill size={20} color="#006f61" className="edit-icon" />
          </span>
        </span>
        <input className="discount highlight" />
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={options}
          styles={customStyles}
          components={{ IndicatorSeparator: () => null }}
        />
        {removable ? (
          <RiCloseLine className="cursor-pointer close-btn" />
        ) : null}
        {/* <Modal isOpen={isOpen} onClose={closeModal}>
          <ProductPicker />
        </Modal> */}
      </div>
    </div>
  );
};

export default Row;
