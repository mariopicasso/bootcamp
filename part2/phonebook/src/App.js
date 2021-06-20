import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import servicePersons from "./services/personService";

const App = () => {
    //States
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newSearch, setNewSearch] = useState("");
    const [notification, setNotification] = useState(null);

    //When a state change, the component re-render and need to update the list of persons to show
    const personsToShow =
        newSearch === ""
            ? persons
            : persons.filter((person) =>
                  person.name.toLowerCase().startsWith(newSearch.toLowerCase())
              );

    const addPerson = (e) => {
        e.preventDefault(); //form default behavior

        const newPhonebook = {
            name: newName.trim(),
            number: newNumber.trim(),
        };

        //this function returns the contact if already exist in the database
        const pre_existing_Contact = persons.find((person) =>
            person.name.trim().toLowerCase() === newPhonebook.name.toLowerCase()
                ? person
                : undefined
        );

        //if contact exist
        if (
            pre_existing_Contact &&
            window.confirm(
                `${newPhonebook.name} is already added to the phonebook, do you want to replace the old number with a new one?`
            )
        ) {
            //update number
            console.log(pre_existing_Contact);
            servicePersons
                .update(pre_existing_Contact.id, newPhonebook)
                .then((newContact) => {
                    setPersons(
                        persons.map((person) =>
                            person.id === newContact.id ? newContact : person
                        )
                    );
                    setNotification({
                        message: `Updated ${newContact.name} number`,
                        color: "green",
                    });
                    setTimeout(() => {
                        setNotification(null);
                    }, 5000);
                })
                .catch((err) => {
                    console.log(err);
                    setNotification({
                        message: `Information of ${newPhonebook.name} has already been removed from server`,
                        color: "red",
                    });
                    setTimeout(() => {
                        setNotification(null);
                    }, 5000);
                });
            setNewName("");
            setNewNumber("");
        }

        //if name not exist
        else {
            servicePersons
                .create(newPhonebook)
                .then((newContact) => {
                    setPersons([...persons, newContact]);
                    setNotification({
                        message: `Added ${newContact.name}`,
                        color: "green",
                    });
                    setTimeout(() => {
                        setNotification(null);
                    }, 5000);
                })
                .catch((err) => console.log(err));

            setNewName("");
            setNewNumber("");
        }
    };

    //delete person of the database
    const deletePerson = (name, id) => {
        if (window.confirm(`Are you sure to delete ${name}?`)) {
            servicePersons
                .deleteOne(id)
                .then(setPersons(persons.filter((person) => person.id !== id)))
                .catch(console.log("server error"));
        }
    };

    //event handlers
    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value.trim());
    };

    const handleSearchChange = (e) => {
        setNewSearch(e.target.value);
    };

    //fetch data from server
    useEffect(() => {
        servicePersons.getAll().then((initialPersons) => {
            setPersons(initialPersons);
        });
    }, []);

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification
                notification={notification}
            />
            <Filter
                handleSearchChange={handleSearchChange}
                newSearch={newSearch}
            />

            <h2>add a new</h2>
            <PersonForm
                addPerson={addPerson}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                newName={newName}
                newNumber={newNumber}
            />

            <h2>Numbers</h2>
            <Persons
                personsToShow={personsToShow}
                deletePerson={deletePerson}
            />
        </div>
    );
};

export default App;
