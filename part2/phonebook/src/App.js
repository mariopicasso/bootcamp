import React, { useState } from "react";
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"




const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
      ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newSearch, setNewSearch] = useState("");

    const personsToShow = newSearch.trim() === '' ? persons
                        : persons.filter((person) => person.name.toLowerCase().startsWith(newSearch.toLowerCase()));  
    
    const addPerson = (e) => {
        e.preventDefault(); //form default behavior

        const nameExistance = persons.reduce((exist, currentValue) => currentValue.name === newName.trim(), false);

        if (nameExistance){
            alert(`${newName} is already added to the phonebook`);
            setNewName('');
            setNewNumber('');
        }
        else {
            const newPersons = [...persons, {name: newName, number: newNumber}];
            setPersons(newPersons);
            setNewName('');
            setNewNumber('');
        }
    }
    
    const handleNameChange=(e)=>{
        console.log(e.target.value);
        setNewName(e.target.value);
    }
    
    const handleNumberChange=(e)=>{
        setNewNumber(e.target.value);
    }

    const handleSearchChange=(e)=>{
        setNewSearch(e.target.value);
    }

    

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleSearchChange={handleSearchChange} newSearch={newSearch}/>
            
            <h2>add a new</h2>
            <PersonForm addPerson = {addPerson} handleNameChange = {handleNameChange} 
            handleNumberChange = {handleNumberChange} newName={newName} newNumber={newNumber}/>
            
            <h2>Numbers</h2>
            <Persons personsToShow={personsToShow} />
        </div>
    );
};

export default App;
