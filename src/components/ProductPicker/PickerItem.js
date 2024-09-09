import React, { useCallback, useMemo, useState } from "react"
import CheckBox from "../CheckBox"
import { IMG_URL, PRIMARY_COLOR } from "../helper"
import VariantRow from "./VariantRow"
import _ from "underscore"
import * as actions from "./actions"

const PickerItem = (props) => {
  const { product, dispatch, selectedState } = props
  const [checked, setChecked] = useState(false)

  const onClick = () => {
    if (!checked) {
      addProduct()
    } else if (checked) {
      removeProduct()
    }
    setChecked(!checked)
  }
  const allVariantsSelected = useMemo(() => {
    const selected = _.find(
      selectedState,
      (selectedProduct) => selectedProduct.id === product.id
    )
    let allSelected = false
    if (!selected) setChecked(false)
    else {
      allSelected =
        selected && selected.variants.length === product.variants.length
    }

    return allSelected
  }, [selectedState])

  const isDisabled = useMemo(
    () => _.some(product.variants, (variant) => !variant.inventory_quantity),
    []
  )

  const addVariant = useCallback((variant) => {
    dispatch({ type: actions.VARIANT_ADD, payload: { variant, product } })
  }, [])

  const removeVariant = useCallback((variant) => {
    dispatch({ type: actions.VARIANT_REMOVE, payload: { variant, product } })
  }, [])

  const addProduct = useCallback(() => {
    dispatch({ type: actions.PRODUCT_ADD, payload: { product } })
    setChecked(true)
  }, [])

  const removeProduct = useCallback(() => {
    dispatch({ type: actions.PRODUCT_REMOVE, payload: { product } })
    setChecked(false)
  }, [])

  return (
    <React.Fragment>
      <li
        className={`picker__item cursor-pointer ${isDisabled && "disabled"}`}
        style={{ height: "50px" }}
        onClick={onClick}
      >
        <CheckBox
          size={22}
          color={PRIMARY_COLOR}
          className="ml-2"
          isChecked={checked || allVariantsSelected}
          partialSelected={_.some(
            selectedState,
            (item) => item.id === product.id
          )}
        />
        <img
          className="item__thumbnail ml-1 mr-1"
          src={product.image.src || IMG_URL}
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
          isSelected={checked}
          isDisabled={!variant.inventory_quantity}
        />
      ))}
    </React.Fragment>
  )
}

export default PickerItem
