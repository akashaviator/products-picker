import React, { useEffect, useState } from "react";
import "./styles.css";
import "../../App.css";
import CheckBox from "../CheckBox";
import { placeholderImgUrl, PRIMARY_COLOR } from "../helper";
import VariantRow from "./VariantRow";
import _ from "underscore";

const PickerItem = (props) => {
  const { product, selectedProducts, setSelectedProducts } = props;
  const variantsCount = Math.abs(product.variants.length);
  const hasMultipleVariants = variantsCount > 1;

  const updatePicker = (variantId, shouldRemove = false) => {
    console.log(variantId, shouldRemove);
    const isProductSelected = selectedProducts.find(
      (item) => item.id === product.id
    );
    console.log(selectedProducts, product.id, isProductSelected);
    if (isProductSelected) {
      if (shouldRemove) {
        const products = _.filter(
          selectedProducts,
          (picked) => picked.id === product.id
        );
        const variants = product.variants.filter(
          (item) => item.id === variantId
        );

        const updatedProduct = _.omit(product, "variants");
        updatedProduct.variants = variants;
        setSelectedProducts([...products, updatedProduct]);
      } else {
        const products = _.filter(
          selectedProducts,
          (picked) => picked.id !== product.id
        );
        const selectedProductIndex = _.findIndex(
          selectedProducts,
          (item) => item.id === product.id
        );
        const selectedProduct = _.clone(selectedProducts[selectedProductIndex]);
        const variantToAdd = product.variants.find(
          (item) => item.id === variantId
        );
        selectedProduct.variants.push(variantToAdd);
        products.splice(selectedProductIndex, 0, selectedProduct);
        setSelectedProducts([...products]);
      }
    } else {
      const newSelected = _.omit(product, "variants");
      const variantToAdd = product.variants.find(
        (item) => item.id === variantId
      );
      newSelected.variants = [variantToAdd];
      setSelectedProducts([...selectedProducts, newSelected]);
    }
  };

  useEffect(() => {
    console.log(selectedProducts);
  }, [selectedProducts]);

  return (
    <React.Fragment>
      <li className="picker__item" style={{ height: "50px" }}>
        <CheckBox size={22} color={PRIMARY_COLOR} className="ml-2" />
        <img
          className="item__thumbnail ml-1 mr-1"
          src={product.image.src || placeholderImgUrl}
          alt="Product"
        />
        <div className="product__row">
          <span className="product__title">{product.title}</span>
          {/* {!hasMultipleVariants ? (
            <span>
              <span>
                {`${Math.abs(product.inventory_quantity) || "0"} available`}
              </span>
            </span>
          ) : null} */}
        </div>
      </li>
      {/* {hasMultipleVariants
        ? product.variants.map((variant, i) => <VariantRow variant={variant} />)
        : null} */}
      {product.variants.map((variant, i) => (
        <VariantRow
          key={variant.id}
          variant={variant}
          updatePicker={updatePicker}
        />
      ))}
    </React.Fragment>
  );
};

export default PickerItem;
