const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  
  email: { type: String, required: true, unique: true, lowercase: true },
  
  password: { type: String, required: true },

  role:{type:String,default:"hotelOwner"},
  
  recentSearchedCities: { type: Array }
}, { timestamps: true }); // Automatically handles createdAt / updatedAt

const User = mongoose.model('User', userSchema);
module.exports = { User };