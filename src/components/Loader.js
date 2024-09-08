import { RiLoader4Line } from "@remixicon/react"
import React from "react"
import { PRIMARY_COLOR } from "./helper"

const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RiLoader4Line className="loader" size={24} color={PRIMARY_COLOR} />{" "}
    </div>
  )
}

export default Loader
