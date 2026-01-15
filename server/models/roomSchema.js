const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  // Link to the specific Hotel
  hotel: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Hotel', 
    required: true 
  },
  roomType: { 
    type: String, 
    required: true, // e.g., "Double Bed", "Suite"
  },
  pricePerNight: { 
    type: Number, 
    required: true,
    min: 0
  },
  amenities: [{ 
    type: String // e.g., ["Free WiFi", "Pool Access"]
  }],
  images: [{ 
    type: String // URLs to images
  }],
  isAvailable: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);
module.exports = {Room};