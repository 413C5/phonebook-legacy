import React, { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForms'
import Persons from './Persons'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const handleNewNameChange = event => setNewName(event.target.value)
    const handleNewNumberChange = event => setNewNumber(event.target.value)
    const handleSetFilter = event => setFilter(event.target.value)

    const handleAddNewPerson = event => {
        event.preventDefault()
        if (persons.find(x => x.name === newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const newPerson = { name: newName, number: newNumber }
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleSetFilter={handleSetFilter} />
            <h3>Add a new</h3>
            <PersonForm newName={newName}
                newNumber={newNumber}
                handleAddNewPerson={handleAddNewPerson}
                handleNewNameChange={handleNewNameChange}
                handleNewNumberChange={handleNewNumberChange} 
            />
            <h3>Numbers</h3>
            <Persons persons={persons} filter={filter} />
        </div>
    )
}

export default App