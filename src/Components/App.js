import React from 'react'

import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')
  const handleNewNameChange = event => setNewName(event.target.value)
  const handleAddNewPerson = event => {
    event.preventDefault()
    const newPerson = { name: newName }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(x => (
        /*<div>debug{newName}</div>,*/
        <div key={x.name}>{x.name}</div>/* ,
        <div>debug{newName}</div> */
      ))}
    </div>
  )
}

export default App