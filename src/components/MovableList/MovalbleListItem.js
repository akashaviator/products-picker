import { RiDraggable } from "@remixicon/react"
import React from "react"

const MovableListItem = React.forwardRef(
  ({ value, isDragged, isSelected, renderItem, index, ...props }, ref) => {
    return (
      <li
        key={value.id}
        {...props}
        style={{
          ...props.style,
          listStyle: "none",
          // backgroundColor: isDragged || isSelected ? "#EEE" : "#FFF",
          zIndex: isDragged ? 1 : undefined,
        }}
        ref={ref}
      >
        <div className="movable__item">
          <RiDraggable
            size={20}
            color="gray"
            className="cursor-pointer drag__handle"
            data-movable-handle
          />
          {renderItem(value, index)}
        </div>
      </li>
    )
  }
)
MovableListItem.displayName = "MovableListItem"

export default MovableListItem
