import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from "../Services/persons"
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [state, setState] = useState(false)

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

      //Se busca que exista la persona con ese nombre
      const person = persons.find((person) => person.name === newName)

      //Se copia el arreglo y se copia todo, pero se define el nuevo numero
      const person2 = { ...person, number: newNumber }

      /*console.log(person.id)
       console.log(person)
       console.log(person2) */

      //Actualización de número
      if (window.confirm(`${newName} is already added to phonebook,replace old number with a new one?`)) {
        personService
          .update(person.id, person2)
          .then(response => {
            setPersons(persons.map(x => {
              //Si id no se encuentra
              if (x.id !== person.id)
                return x
              //Si se encuentra id
              else
                return response
            }))

            setMessage(`Updated ${newName} with number ${newNumber}`)
            console.log(`Updated ${newName} with number ${newNumber}`)
            setState(true)
            setTimeout(() => {
              setMessage(null)
              setState(false)
            }, 5000);

          })

          .catch(error => {
            setMessage(`Error updating ${newName}. That contact was recently deleted`)
            console.log(`Error updating ${newName}. That contact was recently deleted`)
            setState(false)
            setTimeout(() => {
              setMessage(null)
              setState(false)
            }, 5000)
          })
      }
    }

    //Agrega nueva persona
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
          setMessage(`Added ${newName}`)
          console.log(`Added ${newName}`)
          setState(true)
          setTimeout(() => {
            setMessage(null)
            setState(false)
          }, 5000);
        })
        .catch(error => {
          setMessage(`Error adding contact`)
          console.log(`Error adding contact`)
          setState(false)
            .setTimeout(() => {
              setMessage(null)
              setState(false)
            }, 5000)
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

    //Objeto a eliminar
    const person = persons.find(x => x.id === id)

    //Creacion de nuevo arreglo sin el objeto
    const person2 = persons.filter(x => x.id !== person.id);

    /* console.log(person)
    console.log(person2) */
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
        .then(response => {
          //Se actualiza el arreglo mostrado en pantalla
          setPersons(person2)
          setMessage(`Deleted ${person.name} with an id of ${person.id} `)
          console.log(`Deleted ${person.name} with an id of ${person.id} `)
          setState(true)
          setTimeout(() => {
            setMessage(null)
            setState(false)
          }, 5000);
        })
        .catch(error => {
          setMessage(`Information of ${person.name} has already been removed from server`)
          console.log(`Information of ${person.name} has already been removed from server`)
          setState(false)
          setTimeout(() => {
            setMessage(null)
            setState(false)
          }, 5000)
          setPersons(persons.filter(x => x.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} state={state} />
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