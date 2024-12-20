require('dotenv').config();
const mongoose = require('mongoose');

let Person;
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((error) => console.error("Connection error:", error));

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: [{ type: String }]
});

Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'John Doe',
    age: 30,
    favoriteFoods: ['Pizza', 'Sushi']
  });

  person.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};
createAndSavePerson((err, data) => {
  if (err) console.log(err);
  console.log(data);
});

const arrayOfPeople = [
  { name: 'John Doe', age: 30, favoriteFoods: ['pizza', 'sushi'] },
  { name: 'Jane Doe', age: 25, favoriteFoods: ['salad', 'soup'] },
  { name: 'Bob Smith', age: 40, favoriteFoods: ['steak', 'chicken'] }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) {
      console.error(err);
      return done(err);
    }
    done(null, people);
  });
};


const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, people) {
    if (err) return done(err);
    done(null, people);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, person) {
    if (err) return done(err);
    done(null, person);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, person) {
    if (err) return done(err);
    done(null, person);
  });
};

const findEditThenSave = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return done(err);

    person.favoriteFoods.push("hamburger");
    // If favoriteFoods is declared as Mixed type in your Schema
    // person.markModified('favoriteFoods');

    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true }, function(err, person) {
    if (err) return done(err);
    done(null, person);
  });
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({ _id: personId }, (err, person) => {
    if (err) return done(err);
    done(null, person);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};


const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => done(err, data));
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
