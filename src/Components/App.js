import React, { useState,useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForms'
import Persons from './Persons'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])

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

    useEffect(()=>{
        console.log('Entro al Effect');
        axios
          .get('http://localhost:3001/persons')
          .then(response=>{
            console.log('Entro al thenn');
            setPersons(response.data)
          })
      },[])

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