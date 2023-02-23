import React from 'react'

import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas' ,number:'040-1234567'}])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const handleNewNameChange = event => setNewName(event.target.value)
    const handleNewNumberChange = event => setNewNumber(event.target.value)
    const handleAddNewPerson = event => {
        event.preventDefault()
        if (persons.find(x => x.name === newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const newPerson = { name: newName ,number:newNumber}
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
        }
    }
    return (
        <div>
            <h2>Phonebook</h2>
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
            <h2>Numbers</h2>
            {persons.map(x => (
                /*<div>debug{newName}</div>,*/
                <div key={x.name}>{x.name} {x.number}</div>/* ,
        <div>debug{newName}</div> */
            ))}
        </div>
    )
}

export default App