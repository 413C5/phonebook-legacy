import React,{useState,useEffect} from "react";
import Filter from "./Filter";
import axios from 'axios';
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
    const [persons, setPersons] = useState([])
  
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setNewFilter] = useState('')
  
    useEffect(()=>{
      axios
      .get('http://localhost:3001/persons')
      .then(response=>{
        //console.log(response.data)
        setPersons(response.data)
      })
    },[])
  
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
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
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
        <Persons filteredPersons={filteredPersons}/>
  
      </div>
    )
  }

export default App