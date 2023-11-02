import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    let duplicate = false
    persons.forEach(person => {
      if (person.name === newName) {
        duplicate = true
      }
    })

    if (!duplicate) {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }

    duplicate = false
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.toLowerCase())
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={newFilter} filterOnChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )

}

const Filter = (props) => {
  return(
    <input
      value={props.filterValue}
      onChange={props.filterOnChange}
    />
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>name:
        <input
          value={props.nameValue}
          onChange={props.nameOnChange}
        />
      </div>
      <div>number:
        <input
          value={props.numberValue}
          onChange={props.numberOnChange}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    <ul>
      {props.personsToShow.map(person =>
        <Person key={person.name} person={person} />
        )}
    </ul>
  )
}
export default App