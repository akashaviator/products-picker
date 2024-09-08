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
      renderItem={({ value, props, isDragged, isSelected }) => (
        <MovableListItem
          value={value}
          isDragged={isDragged}
          isSelected={isSelected}
          renderItem={renderItem}
          {...props}
        />
      )}
    />
  )
}

export default MovableList
