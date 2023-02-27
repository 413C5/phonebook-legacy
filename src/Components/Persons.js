import React from "react"
import Person from "./Person"

const Persons = ({ persons, filter }) => {
    return (
        <div>
            {persons.filter(x => x.name.toLowerCase().includes(filter.toLowerCase()))
                .map(x => (
                    /* console.log(persons,filter), */
                    <Person key={x.name} name={x.name} number={x.number} />
                ))}
        </div>
    )
}

export default Persons