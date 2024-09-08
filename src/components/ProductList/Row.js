import React, { useState } from "react"
import { RiCloseLine, RiPencilFill } from "@remixicon/react"
import Select from "react-select"
import { PRIMARY_COLOR } from "../helper.js"
import VariantList from "./VariantList.js"
import { arrayMove } from "react-movable"

const DISCOUNT_OPTIONS = [
  { value: "flat", label: "flat off" },
  { value: "percent", label: "% off" },
]

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
    width: "110px",
  }),
}
const Row = (props) => {
  const {
    removable = true,
    openModal,
    product,
    variant,
    index,
    dispatch,
  } = props
  const [editDiscount, setEditDiscount] = useState(false)
  const [discountType, setDiscountType] = useState(DISCOUNT_OPTIONS[0])

  const handleMovedVariant = ({ oldIndex, newIndex }) => {
    const newOrder = arrayMove(product.variants, oldIndex, newIndex)
    dispatch({
      type: "VARIANTS/REORDER",
      payload: { index, variants: newOrder },
    })
  }
  return (
    <div className={`row ${product ? "product" : "variant"}`}>
      <div className={`list-row ${variant && "child"}`}>
        <div className="details" style={{ display: "flex" }}>
          {variant ? null : (
            <span className="index" style={{ width: "40px" }}>
              {index ? index + 1 : 1}.
            </span>
          )}
          <span className="item-select">
            <input
              placeholder="Select Product"
              value={product ? product.title : variant ? variant.title : ""}
              readOnly
            />
            <span className="edit-btn cursor-pointer" onClick={openModal}>
              <RiPencilFill size={20} className="edit__icon" />
            </span>
          </span>
          {editDiscount ? (
            <React.Fragment>
              <input className="discount highlight" />
              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                options={DISCOUNT_OPTIONS}
                styles={customStyles}
                components={{ IndicatorSeparator: () => null }}
                value={discountType}
                onChange={(selected) => setDiscountType(selected)}
              />
            </React.Fragment>
          ) : (
            <span
              className="ml-3 btn-primary"
              onClick={() => setEditDiscount(!editDiscount)}
            >
              Add Discount
            </span>
          )}

          {removable ? (
            <RiCloseLine className="cursor-pointer close-btn" />
          ) : null}
        </div>
      </div>

      {product && product.variants.length && (
        <VariantList
          variants={product.variants}
          handleMovedVariant={handleMovedVariant}
        />
      )}
    </div>
  )
}

export default Row
