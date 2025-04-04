import { Schema, model } from "mongoose";


const reservationSchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  numberOfGuests: {
    type: Number,
    required: true,
    min: 1,
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed',
  }
}, {
  timestamps: true
});


const Reservation = model("Reservation", reservationSchema);
export default Reservation;