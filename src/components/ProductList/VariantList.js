import React, { useEffect, useRef, useState } from "react"
import Row from "./Row"
import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react"
import MovableList from "../MovableList"

const VariantList = (props) => {
  const { variants, handleMovedVariant, dispatch } = props
  const [showVarients, setShowVariants] = useState(variants.length === 1)
  const [container, setContainer] = useState(null)
  const wrapperRef = useRef(null)

  const renderVariant = (variant) => (
    <Row
      variant={variant}
      dispatch={dispatch}
      removable={variants.length > 1}
    />
  )

  useEffect(() => setContainer(wrapperRef.current), [])

  return (
    <React.Fragment>
      {variants.length > 1 ? (
        <div className="button__row">
          <span
            className="btn-link font14"
            onClick={() => setShowVariants(!showVarients)}
          >
            {showVarients ? (
              <React.Fragment>
                Hide Variants <RiArrowUpSLine size={20} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                Show Variants <RiArrowDownSLine size={20} />
              </React.Fragment>
            )}
          </span>
        </div>
      ) : null}

      <div className="variants__list" ref={wrapperRef}>
        {showVarients && (
          <MovableList
            container={container}
            values={variants}
            onChange={handleMovedVariant}
            renderItem={renderVariant}
          />
        )}
      </div>
    </React.Fragment>
  )
}

export default VariantList
