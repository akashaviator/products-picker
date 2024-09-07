import { RiCheckboxBlankLine, RiCheckboxFill } from "@remixicon/react";
import React, { useState } from "react";

const CheckBox = (props) => {
  const {
    onCheck,
    onUncheck,
    isChecked = false,
    color,
    size,
    className = "",
  } = props;
  const [checked, setChecked] = useState(isChecked);

  const onClick = () => {
    if (!checked && onCheck) {
      onCheck();
    } else if (checked && onUncheck) {
      onUncheck();
    }
    setChecked(!checked);
  };

  return (
    <span
      onClick={onClick}
      style={{ display: "flex", alignItems: "center" }}
      className={`checkbox cursor-pointer ${className}`}
    >
      {checked ? (
        <RiCheckboxFill color={color} size={size} />
      ) : (
        <RiCheckboxBlankLine color="gray" size={size} />
      )}
    </span>
  );
};

export default CheckBox;
