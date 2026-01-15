const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  // Matches 'hotel' in dummy data (but now links to User/Owner)
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  // Matches 'roomType'
  roomType: { 
    type: String, 
    required: true 
  },
  
  // Matches 'pricePerNight'
  pricePerNight: { 
    type: Number, 
    required: true 
  },
  
  // Matches 'amenities' (Array of Strings)
  amenities: [{ 
    type: String 
  }],
  
  // Matches 'images' (Array of Strings/URLs)
  images: [{ 
    type: String 
  }],
  
  // Matches 'isAvailable'
  isAvailable: { 
    type: Boolean, 
    default: true 
  }
}, { 
  timestamps: true // Adds 'createdAt' and 'updatedAt'
});

const Room = mongoose.model('Room', roomSchema);
module.exports = { Room };