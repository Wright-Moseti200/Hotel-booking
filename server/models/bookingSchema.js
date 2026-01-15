const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // Reference to the Customer
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  // Reference to the specific Room
  room: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Room', 
    required: true 
  },
  // Reference to the Hotel (Useful for quick filtering/revenue calculation)
  hotel: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Hotel', 
    required: true 
  },
  checkInDate: { 
    type: Date, 
    required: true 
  },
  checkOutDate: { 
    type: Date, 
    required: true 
  },
  totalPrice: { 
    type: Number, 
    required: true,
  },
  guests: { 
    type: Number, 
    required: true,
    min: 1
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
    required: true
  },
  paymentMethod: {
    type: String,
    default: 'Pay at Hotel'
  },
  isPaid: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = {Booking}