import React ,{ useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
      ])
    const [newName, setNewName] = useState('')  
    const [newNumber, setNewNumber] = useState('')
    const [filter,setFilter]=useState('')
    const handleNewNameChange = event => setNewName(event.target.value)
    const handleNewNumberChange = event => setNewNumber(event.target.value)
    const handleSetFilter = event => setFilter(event.target.value)
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
            <p>
                filther shown with <input value={filter} onChange={handleSetFilter} />
            </p>
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
            {persons.filter(x=>x.name.toLowerCase().includes(filter.toLowerCase()))
            .map(x => (
                /*<div>debug{newName}</div>,*/
                <div key={x.name}>{x.name} {x.number}</div>/* ,
        <div>debug{newName}</div> */
            ))}
        </div>
    )
}

export default App