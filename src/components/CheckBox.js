import {
  RiCheckboxBlankLine,
  RiCheckboxFill,
  RiCheckboxIndeterminateFill,
} from "@remixicon/react"
import React from "react"

const CheckBox = (props) => {
  const { isChecked, color, size, partialSelected, className = "" } = props

  const renderCheckedState = () => {
    let icon = <RiCheckboxBlankLine color="gray" size={size} />
    if (isChecked) {
      icon = <RiCheckboxFill color={color} size={size} />
    } else if (partialSelected) {
      icon = <RiCheckboxIndeterminateFill color={color} size={size} />
    }
    return icon
  }

  return (
    <span
      style={{ display: "flex", alignItems: "center" }}
      className={`checkbox cursor-pointer ${className}`}
    >
      {renderCheckedState()}
    </span>
  )
}

export default CheckBox
