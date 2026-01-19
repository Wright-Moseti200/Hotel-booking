const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Matches 'username'
  username: { type: String, required: true },
  
  // Matches 'email'
  email: { type: String, required: true, unique: true, lowercase: true },
  
  // Password is not in dummy data but required for auth
  password: { type: String, required: true },

  role:{type:String,default:"hotelOwner"},
  
  // Matches 'recentSearchedCities'
  recentSearchedCities: { type: Array }
}, { timestamps: true }); // Automatically handles createdAt / updatedAt

const User = mongoose.model('User', userSchema);
module.exports = { User };