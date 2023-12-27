const Person = ({ person, deletePerson }) => {
    return (
        <div>
            <li>{person.name} {person.number}</li>
            <button onClick={() => deletePerson(person.id, person.name)}>
                delete
            </button>
        </div>
    )
}

export default Person