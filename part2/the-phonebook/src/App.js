import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.trim().toLowerCase())
  );

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 2000);
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 2000);
  };

  const updatePerson = (person) => {
    const result = window.confirm(
      `${newName} is already added to the phonebook, replace the old number with a new one? `
    );
    if (result) {
      const updatedPerson = { ...person, number: newPhone };
      personService
        .update(person.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : returnedPerson))
          );
          setNewName('');
          setNewPhone('');
          showSuccessMessage(`Updated ${returnedPerson.name}`);
        })
        .catch((error) => {
          showErrorMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    const isExist = persons.find((person) => person.name === newName);

    if (isExist) {
      updatePerson(isExist);
      return;
    }

    const newPerson = {
      name: newName,
      number: newPhone,
    };

    personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewPhone('');
      showSuccessMessage(`Added ${returnedPerson.name}`);
    });
  };

  const deletePerson = (person) => {
    const result = window.confirm(`Delete ${person.name}?`);
    if (result) {
      personService.remove(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type="success" message={successMessage} />
      <Notification type="error" message={errorMessage} />
      <Filter filter={filter} onChange={(e) => setFilter(e.target.value)} />

      <h2>add a new</h2>
      <PersonForm
        name={newName}
        phone={newPhone}
        onNameChange={(e) => setNewName(e.target.value)}
        onPhoneChange={(e) => setNewPhone(e.target.value)}
        onSubmit={addNewPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDeletePerson={deletePerson} />
    </div>
  );
};

export default App;
