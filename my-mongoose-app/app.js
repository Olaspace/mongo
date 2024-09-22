require('dotenv').config(); // Load environment variables from .env
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define a schema for the Person model
const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Required string
  age: Number, // Optional number
  favoriteFoods: { type: [String], default: [] } // Array of strings, default to empty array
});

const Person = mongoose.model('Person', personSchema); // Create a model from the schema

// Create and save a new person
const person = new Person({
  name: 'John Doe',
  age: 30,
  favoriteFoods: ['Pizza', 'Burger']
});

person.save()
  .then(data => console.log('Person saved:', data))
  .catch(err => console.error('Error saving person:', err));

// Create multiple people
const arrayOfPeople = [
  { name: 'Mary', age: 25, favoriteFoods: ['Tacos'] },
  { name: 'Alice', age: 28, favoriteFoods: ['Sushi', 'Pasta'] }
];

Person.create(arrayOfPeople)
  .then(data => console.log('People saved:', data))
  .catch(err => console.error('Error creating people:', err));

// Find all people with a specific name
Person.find({ name: 'John Doe' })
  .then(data => console.log('Found people:', data))
  .catch(err => console.error('Error finding people:', err));

// Find one person with a specific food
Person.findOne({ favoriteFoods: 'Pizza' })
  .then(data => console.log('Found one person:', data))
  .catch(err => console.error('Error finding person:', err));

// Find a person by ID
const personId = 'your_person_id_here'; // Replace with a valid ID
Person.findById(personId)
  .then(data => console.log('Found person by ID:', data))
  .catch(err => console.error('Error finding person by ID:', err));

// Update a person’s favorite food
Person.findById(personId)
  .then(person => {
    person.favoriteFoods.push('Hamburger'); // Add 'Hamburger' to the favorite foods
    return person.save();
  })
  .then(updatedPerson => console.log('Updated person:', updatedPerson))
  .catch(err => console.error('Error updating person:', err));

// Update a person’s age
Person.findOneAndUpdate({ name: 'Mary' }, { age: 20 }, { new: true })
  .then(data => console.log('Updated person:', data))
  .catch(err => console.error('Error updating person:', err));


// Delete a person by ID
Person.findByIdAndDelete(personId)
  .then(data => console.log('Deleted person:', data))
  .catch(err => console.error('Error deleting person:', err));


// Delete all people named “Mary”
Person.deleteMany({ name: 'Mary' })
  .then(result => console.log('Removed people:', result))
  .catch(err => console.error('Error deleting people:', err));

// Find people who like burritos, sort, and limit results:
Person.find({ favoriteFoods: 'Burritos' })
  .sort({ name: 1 }) // Sort by name in ascending order
  .limit(2) // Limit to 2 results
  .select('-age') // Exclude age from the result
  .exec()
  .then(data => console.log('Found and sorted people:', data))
  .catch(err => console.error('Error finding people:', err));
