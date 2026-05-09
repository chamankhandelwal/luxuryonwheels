import CarListing from '../models/CarListing.js';
import User from '../models/User.js';
import { seedCars } from '../data/seedCars.js';

export const seedIfEmpty = async () => {
  if (process.env.SEED_ON_EMPTY !== 'true') return;
  if (CarListing.db.readyState !== 1) return;

  const carCount = await CarListing.countDocuments();
  if (carCount > 0) {
    console.log(`Seed skipped: ${carCount} cars already exist.`);
    return;
  }

  await CarListing.insertMany(seedCars);

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@luxuryonwheels.in';
  const adminExists = await User.exists({ email: adminEmail.toLowerCase() });
  if (!adminExists) {
    await User.create({
      name: 'Luxury on Wheels Admin',
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || 'Admin@12345',
      role: 'admin'
    });
  }

  console.log(`Seeded ${seedCars.length} cars because database was empty.`);
};
