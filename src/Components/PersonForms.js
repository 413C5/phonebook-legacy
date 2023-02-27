import React from "react"

const PersonForm = ({
    newName,
    newNumber,
    handleAddNewPerson,
    handleNewNameChange,
    handleNewNumberChange
}) => {
    return (
        /* console.log(
                    newName,
                    newNumber,
                    handleAddNewPerson,
                    handleNewNameChange,
                    handleNewNumberChange), */
        <form onSubmit={handleAddNewPerson}>
            <div>
                name: <input value={newName} onChange={handleNewNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNewNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm