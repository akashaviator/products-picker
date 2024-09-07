import {
  RiCheckboxBlankLine,
  RiCheckboxFill,
  RiCheckboxIndeterminateFill,
} from "@remixicon/react";
import React, { useEffect, useState } from "react";

const CheckBox = (props) => {
  const {
    onCheck,
    onUncheck,
    isChecked = false,
    color,
    size,
    partialSelected,
    className = "",
  } = props;
  const [checked, setChecked] = useState(false);

  const onClick = () => {
    if (!checked && onCheck) {
      onCheck();
    } else if (checked && onUncheck) {
      onUncheck();
    }
    setChecked(!checked);
  };

  const renderCheckedState = () => {
    let icon = <RiCheckboxBlankLine color="gray" size={size} />;
    if (checked) {
      icon = <RiCheckboxFill color={color} size={size} />;
    } else if (partialSelected) {
      icon = <RiCheckboxIndeterminateFill color={color} size={size} />;
    }
    return icon;
  };

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  return (
    <span
      onClick={onClick}
      style={{ display: "flex", alignItems: "center" }}
      className={`checkbox cursor-pointer ${className}`}
    >
      {renderCheckedState()}
    </span>
  );
};

export default CheckBox;
