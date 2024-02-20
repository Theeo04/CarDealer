"use server"
import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  Car_Name: String,
  Year: Number,
  Selling_Price: Number,
  Present_Price: Number,
  Kms_Driven: Number,
  Fuel_Type: String,
  Seller_Type: String,
  Transmission: String,
  Owner: Number,
  Image_URL: String
});
  
// Check if the model has already been defined
const Car = mongoose.models.Car || mongoose.model('Car', carSchema);

export default Car;