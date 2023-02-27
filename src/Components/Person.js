import React from "react"

const Person = ({ name, number }) => {
    return (
        /* console.log(name,number), */
        <div key={name}>{name} {number}</div>
    )
}

export default Person