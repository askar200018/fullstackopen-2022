const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.w32bkpv.mongodb.net/personApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  mongoose
    .connect(url)
    .then(() => {
      const person = new Person({
        name,
        number,
      });

      return person.save();
    })
    .then((person) => {
      console.log(`added ${person.name} ${person.number} to phonebook`);
      mongoose.connection.close();
    });
} else {
  mongoose.connect(url).then(() => {
    Person.find({}).then((persons) => {
      persons.forEach((person) => {
        console.log(person);
      });
      mongoose.connection.close();
    });
  });
}
