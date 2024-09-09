import React from "react"
import "./styles.css"
import { RiCloseLine } from "@remixicon/react"

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal__body" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <span className="modal__title ml-1">Select Products</span>
          <RiCloseLine className="cursor-pointer close-btn" onClick={onClose} />
        </div>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  )
}

export default Modal
