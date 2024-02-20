'use server'
import { MongoClient, Filter } from 'mongodb';

// MongoDB Connection
const client = new MongoClient(String(process.env.MONGODB_URL));

// Data type of car model
interface Car {
  Car_Name: string;
  Year: number;
  Selling_Price: number;
  Present_Price: number;
  Kms_Driven: number;
  Fuel_Type: string;
  Seller_Type: string;
  Transmission: string;
  Owner: number;
  Image_URL: string;
}

// Filter type
interface Filters {
  brand: string | null;
  transmission: string | null;
  fuel: string | null;
  minKm: { $gte: number } | null;
  maxKm: { $lte: number } | null;
  minPrice: { $gte: number } | null;
  maxPrice: { $lte: number } | null;
}

// Read Data from DB
export async function readData(): Promise<Car[]> {
  try {
    await client.connect();
    const database = client.db('dbcars');
    const cars = database.collection<Car>('cars');

    const carList = await cars.find().sort({ createdAt: -1 }).toArray();
    return carList;
  } finally {
    await client.close();
  }
}

// Filter Function
export async function filterCars(filters: Filters, page: number): Promise<{ cars: Car[], totalPages: number }> {
  const itemsPerPage = 9; // Set the number of cars per page to 9

  try {
    await client.connect();
    const database = client.db('dbcars');
    const cars = database.collection<Car>('cars');

    // Construct the filter query
    const query: Filter<any> = {};

    if (filters.brand !== null) {
      query.Car_Name = filters.brand;
    }

    if (filters.transmission !== null) {
      query.Transmission = { $regex: new RegExp(filters.transmission, 'i') };
    }
    
    if (filters.fuel !== null) {
      query.Fuel_Type = { $regex: new RegExp(filters.fuel, 'i') };
    }

    // Calculate skip and limit for pagination
    const skip = (page - 1) * itemsPerPage;
    const limit = itemsPerPage;

    // Fetch cars based on query and pagination parameters
    const carList = await cars.find(query).skip(skip).limit(limit).toArray();

    // Count total number of documents to calculate total pages
    const totalCars = await cars.countDocuments(query);
    const totalPages = Math.ceil(totalCars / itemsPerPage);

    return { cars: carList, totalPages };
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// write on database:

export async function addCarToDb(newCar : Car[]) {
    try {
      await client.connect();
      const database = client.db("dbcars");
      const collection = database.collection("cars");

      // Insert documents into the collection
      await collection.insertOne(newCar);

      console.log("Object added succesfully successfully!");
    } finally {
      await client.close();
    }
}


// TODO: Delete Data from DB

