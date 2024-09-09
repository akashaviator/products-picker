import React, { useState } from "react"
import { RiCloseLine, RiPencilFill } from "@remixicon/react"
import Select from "react-select"
import { PRIMARY_COLOR } from "../helper.js"
import VariantList from "./VariantList.js"
import { arrayMove } from "react-movable"
import Button from "../Button.js"
import * as actions from "./actions.js"

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
      type: actions.VARIANTS_REORDER,
      payload: { index, variants: newOrder },
    })
  }

  const handleDelete = () => {
    let type, payload
    if (product) {
      type = actions.PRODUCT_DELETE
      payload = { productId: product.id }
    } else {
      type = actions.VARIANT_DELETE
      payload = { variantId: variant.id, productId: variant.product_id }
    }

    dispatch({ type, payload })
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
            <Button
              text="Add Discount"
              className="ml-3"
              type="primary"
              onClick={() => setEditDiscount(!editDiscount)}
              style={{ padding: "6px 26px" }}
            />
          )}

          {removable ? (
            <RiCloseLine
              className="cursor-pointer close-btn"
              onClick={handleDelete}
            />
          ) : null}
        </div>
      </div>

      {product && product.variants.length ? (
        <VariantList
          variants={product.variants}
          handleMovedVariant={handleMovedVariant}
          dispatch={dispatch}
        />
      ) : null}
    </div>
  )
}

export default Row
