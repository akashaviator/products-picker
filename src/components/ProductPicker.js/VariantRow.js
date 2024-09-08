import React, { useEffect, useState } from "react"
import CheckBox from "../CheckBox"
import { PRIMARY_COLOR } from "../helper"

const VariantRow = (props) => {
  const { variant, removeVariant, addVariant, isSelected, isDisabled } = props
  const [checked, setChecked] = useState(false)
  const onClick = () => {
    if (!checked) {
      addVariant(variant)
    } else if (checked) {
      removeVariant(variant)
    }
    setChecked(!checked)
  }
  useEffect(() => {
    setChecked(isSelected)
  }, [isSelected])

  return (
    <li
      className={`picker__item variant cursor-pointer ${
        isDisabled && "disabled"
      }`}
      onClick={onClick}
    >
      <CheckBox
        size={22}
        color={PRIMARY_COLOR}
        className="ml-5"
        isChecked={checked}
      />
      <div
        className="variant__row ml-1"
        style={{ paddingTop: "15px", paddingBottom: "15px" }}
      >
        <span>{variant.title}</span>
        <span>
          <span>
            {`${Math.abs(variant.inventory_quantity) || "0"} available`}
          </span>
          <span style={{ marginLeft: "40px" }}>{`$${
            Math.abs(variant.price) || "0"
          }`}</span>
        </span>
      </div>
    </li>
  )
}

export default VariantRow
