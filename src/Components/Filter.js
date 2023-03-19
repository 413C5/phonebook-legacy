import React from "react";

const Filter = ({filter,handleFilterChange}) => {
    return (
        <form>
            <p>
                filter shown with: <input value={filter} onChange={handleFilterChange} />
            </p>
        </form>
    )
}


export default Filter