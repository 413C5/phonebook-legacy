import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import axios from 'axios';
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from "../Services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  //Recuperación de datos
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        //console.log(response)
        setPersons(response)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      //Agregar nueva persona, enviandola al backend
      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(
      filter.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    //console.log(newName)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    //console.log(newNumber)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    console.log(filter)
  }

  const deletePerson = (id) => {
    const person = persons.find(x => x.id === id)

    console.log(person.name)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
        .then(response => {
          console.log(`Eliminado ${person.name} `)
        }
        )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new:</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />

    </div>
  )
}

export default App