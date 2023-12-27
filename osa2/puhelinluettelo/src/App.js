import { useState, useEffect, location } from 'react'
import axios from 'axios'
import Person from './components/Person'
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const deletePerson = (id, name) => {
    let exists = false
    persons.forEach((person => {
      if (person.id === id) {
        exists = true
        if (window.confirm(`Are you sure you want to remove ${name} ?`)) {
          personService
            .remove(id)
            .then((response) => {
              const newPersons = persons.filter((person) => person.id !== id)
              setPersons(newPersons)
            })
        }
      }
    }))
  }

  const addPerson = (event) => {
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
      personService
        .create(personObject)
        .then(returnedPerson => {
          console.log(returnedPerson)
        })
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        const changingPerson = persons.filter((person) => person.name === personObject.name)
        console.log(changingPerson[0].id)
        personService
        .update(changingPerson[0].id, personObject)
        .then((response) => console.log(response))
      }
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
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )

}

const Filter = (props) => {
  return (
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
        <Person key={person.name} person={person} deletePerson={props.deletePerson} />
      )}
    </ul>
  )
}
export default App