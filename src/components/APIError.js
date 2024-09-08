import React from "react"

const APIError = () => {
  return (
    <div
      style={{
        background: "#f2d3db",
        height: "40px",
        color: "#a22a34",
        fontWeight: "500",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "14px",
      }}
    >
      Some error occurred at out end. Please contact support.
    </div>
  )
}

export default APIError
