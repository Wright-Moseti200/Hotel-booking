const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  hotelOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  guests: { type: Number, required: true, default: 1 },
  
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentMethod: { type: String, required: true, default: 'Pay At Hotel' },
  isPaid: { type: Boolean, default: false }
}, { timestamps: true }); // Automatically creates 'createdAt' & 'updatedAt'

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = { Booking };