const PersonDetail = ({ person }) => {
  return (
    <li>
      {person.name} {person.phone}
    </li>
  );
};

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <PersonDetail key={person.id} person={person} />
      ))}
    </ul>
  );
};

export default Persons;
