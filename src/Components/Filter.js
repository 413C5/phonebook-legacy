import React from "react"

const Filter = ({ filter, handleSetFilter }) => {
    return (
        /* console.log(filter,handleSetFilter), */
        <p>
            filter shown with <input value={filter} onChange={handleSetFilter} />
        </p>
    )
}

export default Filter