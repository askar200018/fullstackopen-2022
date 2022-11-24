import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-12345' },
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const addNewPerson = (event) => {
    event.preventDefault();
    const isExist = persons.find((person) => person.name === newName);
    console.log({ isExist });
    if (isExist) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      phone: newPhone,
    };
    setPersons(persons.concat(newPerson));
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name:{' '}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:{' '}
          <input
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            {person.name} {person.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
