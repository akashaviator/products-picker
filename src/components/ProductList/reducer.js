import _ from "underscore"

const mergeVariants = (arr1, arr2) => {
  const map = new Map()

  arr1.forEach((item) => map.set(item.id, item))
  arr2.forEach((item) => map.set(item.id, item))

  return Array.from(map.values())
}

export const listReducer = (state, action) => {
  const { removedVariant, removedProduct, variants, products, index } =
    action.payload
  console.log(index, "index")
  let newState = null
  const isStateEmpty = _.isNull(index)
  const addEmptyProduct = _.isEmpty(products[0].variants)
  switch (action.type) {
    case "PRODUCTS/ADD":
      if (isStateEmpty || addEmptyProduct) {
        newState = [...state, ...products]
      } else {
        let productsToAdd = []
        const productsPresent = [...state]
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
            // productsToAdd.push(product)
          } else {
            productsToAdd.push(selectedProduct)
          }
        }
        if (productsPresent.length === index) {
          newState = productsPresent.concat(productsToAdd)
        } else {
          console.log("putting in", productsPresent[index])
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
    case "PRODUCT/REMOVE":
      break
    case "VARIANT/REMOVE":
      break
    case "PRODUCTS/REORDER":
      newState = products
      break
    case "VARIANTS/REORDER":
      const productsPresent = [...state]
      productsPresent[index].variants = variants
      newState = productsPresent
      break
    default:
      return newState
  }

  return newState
}
