import { Schema, model } from "mongoose";


const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,

  },
},
{
  timestamps: true
}
);



const Restaurant = model ("Restaurant", restaurantSchema);

export default Restaurant;

