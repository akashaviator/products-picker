import _ from "underscore"
import { EMPTY_PRODUCT } from "../helper"
import * as actions from "./actions"

const mergeVariants = (arr1, arr2) => {
  const map = new Map()

  arr1.forEach((item) => map.set(item.id, item))
  arr2.forEach((item) => map.set(item.id, item))

  return Array.from(map.values())
}

export const listReducer = (state, action) => {
  const { variants, products, index } = action.payload
  let productsPresent
  let newState = null

  switch (action.type) {
    case actions.PRODUCTS_ADD:
      const addEmptyProduct = _.isEmpty(products[0].variants)
      const isStateEmpty = _.isNull(index)

      if (isStateEmpty || addEmptyProduct) {
        newState = [...state, ...products]
      } else {
        let productsToAdd = []
        productsPresent = [...state]
        for (const selectedProduct of products) {
          const productPresentIndex = _.findIndex(
            productsPresent,
            (item) => item.id === selectedProduct.id
          )
          if (productPresentIndex !== -1) {
            const productPresent = _.clone(productsPresent[productPresentIndex])
            const mergedVariants = mergeVariants(
              productPresent.variants,
              selectedProduct.variants
            )
            selectedProduct.variants = mergedVariants

            productsPresent.splice(productPresentIndex, 1, selectedProduct)
          } else {
            productsToAdd.push(selectedProduct)
          }
        }
        if (productsPresent.length === index) {
          newState = productsPresent.concat(productsToAdd)
        } else {
          const isEmptyProduct = _.isEmpty(productsPresent[index].variants)
          productsPresent.splice(
            index,
            isEmptyProduct ? 1 : 0,
            ...productsToAdd
          )
          newState = productsPresent
        }
      }
      break
    case actions.PRODUCT_DELETE:
      newState = _.filter(state, (item) => item.id !== action.payload.productId)
      if (_.isEmpty(newState)) {
        newState = [EMPTY_PRODUCT]
      }
      break
    case actions.VARIANT_DELETE:
      const { productId, variantId } = action.payload
      productsPresent = [...state]
      const productIndex = _.findIndex(
        productsPresent,
        (item) => item.id === productId
      )
      const newVariants = _.filter(
        productsPresent[productIndex].variants,
        (item) => item.id !== variantId
      )
      if (_.isEmpty(newVariants)) {
        productsPresent.splice(productIndex, 1)
      } else {
        productsPresent[productIndex].variants = newVariants
      }
      newState = productsPresent
      break
    case actions.VARIANTS_REORDER:
      productsPresent = [...state]
      productsPresent[index].variants = variants
      newState = productsPresent
      break
    case actions.PRODUCTS_REORDER:
      newState = [...products]
      break
    default:
      return state
  }

  return newState
}
