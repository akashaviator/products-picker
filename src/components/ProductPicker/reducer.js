import _ from "underscore"
import * as actions from "./actions"

export const pickerReducer = (state, action) => {
  const { variant, product } = action.payload
  let newState = null
  switch (action.type) {
    case actions.VARIANT_ADD:
      const isProductInState = _.some(state, (item) => item.id === product.id)
      if (isProductInState) {
        const products = _.filter(state, (item) => item.id !== product.id)
        const selectedProductIndex = _.findIndex(
          state,
          (item) => item.id === product.id
        )
        const selectedProduct = _.clone(state[selectedProductIndex])
        const variantToAdd = variant
        selectedProduct.variants.push(variantToAdd)
        products.splice(selectedProductIndex, 0, selectedProduct)
        newState = [...products]
      } else {
        const newSelected = _.omit(product, "variants")
        newSelected.variants = [variant]
        newState = [...state, newSelected]
      }
      break
    case actions.VARIANT_REMOVE:
      const products = _.filter(state, (picked) => picked.id !== product.id)
      const unselectedProductIndex = _.findIndex(
        state,
        (item) => item.id === product.id
      )
      const unselectedProduct = _.clone(state[unselectedProductIndex])
      const variants = unselectedProduct.variants.filter(
        (item) => item.id !== variant.id
      )

      const updatedProduct = _.omit(unselectedProduct, "variants")
      if (variants.length === 0) {
        newState = [...products]
      } else {
        updatedProduct.variants = variants
        newState = [...products, updatedProduct]
      }
      break
    case actions.PRODUCT_ADD:
      let currentIndex = _.findIndex(state, (item) => item.id === product.id)
      const productsInState = [...state]
      if (currentIndex >= 0) {
        productsInState.splice(currentIndex, 1, product)
        newState = productsInState
      } else {
        newState = [...state, product]
      }
      break
    case actions.PRODUCT_REMOVE:
      newState = _.filter(state, (item) => item.id !== product.id)
      break
    default:
      return state
  }

  return newState
}
