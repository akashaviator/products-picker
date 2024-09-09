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
      renderItem={({ value, props, isDragged, index }) => {
        const { key, ...rest } = props
        return (
          <MovableListItem
            key={key}
            value={value}
            isDragged={isDragged}
            renderItem={renderItem}
            index={index}
            {...rest}
          />
        )
      }}
    />
  )
}

export default MovableList
