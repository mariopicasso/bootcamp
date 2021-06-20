const Person = ({ person, deletePerson }) => {
    const handleClick = () => deletePerson(person.name, person.id);

    return (
        <div>
            <p>
                {person.name} {person.number}
            </p>
            <button onClick={handleClick}>Delete</button>
        </div>
    );
};

const Persons = ({ personsToShow, deletePerson }) => {
    return (
        <div>
            {personsToShow.map((person) => (
                <Person
                    key={person.id}
                    person={person}
                    deletePerson={deletePerson}
                />
            ))}
        </div>
    );
};
export default Persons;
