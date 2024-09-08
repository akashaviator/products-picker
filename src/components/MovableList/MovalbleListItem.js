import { RiDraggable } from "@remixicon/react"
import React from "react"

const MovableListItem = React.forwardRef(
  ({ value, isDragged, isSelected, renderItem, ...props }, ref) => {
    return (
      <li
        key={value.id}
        {...props}
        style={{
          ...props.style,
          listStyle: "none",
          backgroundColor: isDragged || isSelected ? "#EEE" : "#FFF",
          zIndex: isDragged ? 1 : undefined,
        }}
        ref={ref}
      >
        <div className="movable__item">
          {/* <i
            data-movable-handle
            className="mdi mdi-drag-vertical drag-handle-icon font27"
          /> */}
          <RiDraggable
            size={20}
            color="gray"
            className="cursor-pointer drag__handle"
            data-movable-handle
          />
          {/* <span className="drag__handle cursor-pointer " data-movable-handle> */}
          {/* Drag me
          </span> */}
          {renderItem(value)}
        </div>
      </li>
    )
  }
)
MovableListItem.displayName = "MovableListItem"

export default MovableListItem
