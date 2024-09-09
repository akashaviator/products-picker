import { RiSearchLine } from "@remixicon/react"
import React from "react"

const SearchBox = ({ search, setSearch }) => {
  return (
    <div className="search__row">
      <div className="search__input">
        <input
          placeholder="Search Product"
          value={search || ""}
          onChange={(e) => setSearch(e.target.value)}
        />
        <RiSearchLine size={20} className="search-icon" />
      </div>
    </div>
  )
}

export default React.memo(SearchBox)
