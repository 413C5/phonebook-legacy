import React from "react";

const Persons = ({ filteredPersons, deletePerson }) => {
    return (
        <div>
            {filteredPersons.map((person) => {
                //console.log(person.id)
                return (
                    <p key={person.name}>
                        {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button>
                    </p>
                )
            })}
        </div>
    )
}


export default Persons