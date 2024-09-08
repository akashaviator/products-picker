import React, { useCallback, useMemo, useState } from "react"
import "./styles.css"
import "../../App.css"
import CheckBox from "../CheckBox"
import { placeholderImgUrl, PRIMARY_COLOR } from "../helper"
import VariantRow from "./VariantRow"
import _ from "underscore"

const PickerItem = (props) => {
  const { product, dispatch, selectedState } = props
  const [selectAllVariants, setSelectAllVariants] = useState(false)

  const allVariantsSelected = useMemo(() => {
    const selected = _.find(
      selectedState,
      (selectedProduct) => selectedProduct.id === product.id
    )
    const allSelected =
      selected && selected.variants.length === product.variants.length
    if (allSelected) setSelectAllVariants(true)
    return allSelected
  }, [selectedState])

  const isDisabled = useMemo(() =>
    _.some(product.variants, (variant) => !variant.inventory_quantity)
  )

  const addVariant = useCallback((variant) => {
    dispatch({ type: "VARIANT/ADD", payload: { variant, product } })
  }, [])

  const removeVariant = useCallback((variant) => {
    dispatch({ type: "VARIANT/REMOVE", payload: { variant, product } })
  }, [])

  const addProduct = useCallback(() => {
    dispatch({ type: "PRODUCT/ADD", payload: { product } })
    setSelectAllVariants(true)
  }, [])

  const removeProduct = useCallback(() => {
    dispatch({ type: "PRODUCT/REMOVE", payload: { product } })
    setSelectAllVariants(false)
  }, [])

  return (
    <React.Fragment>
      <li
        className={`picker__item ${isDisabled && "disabled"}`}
        style={{ height: "50px" }}
      >
        <CheckBox
          size={22}
          color={PRIMARY_COLOR}
          className="ml-2"
          onCheck={addProduct}
          onUncheck={removeProduct}
          isChecked={allVariantsSelected}
          partialSelected={_.some(
            selectedState,
            (item) => item.id === product.id
          )}
        />
        <img
          className="item__thumbnail ml-1 mr-1"
          src={product.image.src || placeholderImgUrl}
          alt="Product"
        />
        <div className="product__row">
          <span className="product__title">{product.title}</span>
        </div>
      </li>
      {product.variants.map((variant, i) => (
        <VariantRow
          key={variant.id}
          variant={variant}
          addVariant={addVariant}
          removeVariant={removeVariant}
          isSelected={selectAllVariants}
          isDisabled={!variant.inventory_quantity}
        />
      ))}
    </React.Fragment>
  )
}

export default PickerItem
