import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User.js';
import CarListing from '../models/CarListing.js';
import { seedCars } from '../data/seedCars.js';

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Promise.all([User.deleteMany({}), CarListing.deleteMany({})]);

  await User.create({
    name: 'Luxury on Wheels Admin',
    email: process.env.ADMIN_EMAIL || 'admin@luxuryonwheels.in',
    password: process.env.ADMIN_PASSWORD || 'Admin@12345',
    role: 'admin'
  });

  await CarListing.insertMany(seedCars);

  console.log(`Seeded ${seedCars.length} cars and one admin user.`);
  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
