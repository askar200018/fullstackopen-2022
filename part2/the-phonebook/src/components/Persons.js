const PersonDetail = ({ person, onClickDelete }) => {
  return (
    <li>
      {person.name} {person.phone}{' '}
      <button onClick={onClickDelete}>delete</button>
    </li>
  );
};

const Persons = ({ persons, onDeletePerson }) => {
  return (
    <ul>
      {persons.map((person) => (
        <PersonDetail
          key={person.id}
          person={person}
          onClickDelete={() => onDeletePerson(person)}
        />
      ))}
    </ul>
  );
};

export default Persons;
