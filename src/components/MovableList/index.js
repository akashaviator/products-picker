import React from "react"
import { List } from "react-movable"
import MovableListItem from "./MovalbleListItem"
import "./styles.css"

const MovableList = (props) => {
  const { container, values, onChange, renderItem } = props
  return (
    <List
      container={container}
      values={values}
      onChange={onChange}
      renderList={({ children, props }) => <ul {...props}>{children}</ul>}
      renderItem={({ value, props, isDragged, isSelected, index }) => {
        return (
          <MovableListItem
            value={value}
            isDragged={isDragged}
            isSelected={isSelected}
            renderItem={renderItem}
            index={index}
            {...props}
          />
        )
      }}
    />
  )
}

export default MovableList
