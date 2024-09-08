import React from "react"

const Button = (props) => {
  const { type, className, style, text, ...rest } = props
  return (
    <span className={`btn-${type} ${className}`} style={style} {...rest}>
      {text}
    </span>
  )
}

export default Button
