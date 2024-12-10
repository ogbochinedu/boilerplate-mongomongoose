// Import Mongoose
const mongoose = require('mongoose');

// Define the person schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: [{ type: String }]
});

// Create a model from the person schema
const Person = mongoose.model('Person', personSchema);

// Export the Person model
module.exports = Person;