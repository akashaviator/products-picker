import React from "react";
import CheckBox from "../CheckBox";
import { PRIMARY_COLOR } from "../helper";

const VariantRow = (props) => {
  const { variant, updatePicker } = props;

  return (
    <li className="picker__item variant">
      <CheckBox
        size={22}
        color={PRIMARY_COLOR}
        className="ml-5"
        onCheck={() => updatePicker(variant.id)}
        onUncheck={() => updatePicker(variant.id, true)}
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
        </span>
      </div>
    </li>
  );
};

export default VariantRow;
