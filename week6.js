// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Set up middleware
app.use(bodyParser.json());

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/foodNutritionDB';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define schema for food item
const foodSchema = new mongoose.Schema({
  foodItemName: { type: String, required: true },
  foodGroup: String,
  description: String,
  nutritionalInformation: {
    calories: Number,
    macronutrients: {
      proteins: Number,
      fats: Number,
      carbohydrates: Number
    },
    micronutrients: {
      vitamins: [String],
      minerals: [String]
    },
    fiber: Number,
    sodium: Number,
    cholesterol: Number
  },
  servingSize: String,
  allergens: [String],
  ingredients: [String],
  preparationMethods: String,
  certifications: [String],
  countryOfOrigin: String,
  brandOrManufacturer: String,
  dietaryRestrictions: [String],
  healthBenefits: String,
  bestPractices: String
});

// Create food model
const Food = mongoose.model('Food', foodSchema);

// Define routes

// Route to create a new food item
app.post('/api/foods', async (req, res) => {
  try {
    const newFood = await Food.create(req.body);
    res.status(201).json(newFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to retrieve all food items
app.get('/api/foods', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to retrieve a specific food item by ID
app.get('/api/foods/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to update a food item
app.put('/api/foods/:id', async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a food item
app.delete('/api/foods/:id', async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: 'Food item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
