const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // --- Fields from 'userDummyData' ---
  username: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    default: "" // Matches 'image' in userDummyData
  },
  role: { 
    type: String, 
    enum: ['user', 'hotelOwner', 'admin'], 
    default: 'user',
    required: true
  },
  recentSearchedCities: [
    { type: String } // Matches 'recentSearchedCities' array
  ],
  hotelDetails: {
    name: { type: String },      // Matches hotel 'name'
    address: { type: String },   // Matches hotel 'address'
    city: { type: String },      // Matches hotel 'city'
    contact: { type: String },   // Matches hotel 'contact'
    description: { type: String, default: "" }
  }
}, { 
  timestamps: true // This automatically adds 'createdAt' and 'updatedAt'
});

const User = mongoose.model('User', userSchema);
module.exports = { User };