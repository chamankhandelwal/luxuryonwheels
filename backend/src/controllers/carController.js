import { body, query } from 'express-validator';
import CarListing from '../models/CarListing.js';
import { seedCars } from '../data/seedCars.js';
import { ApiError } from '../utils/apiError.js';

let memoryCars = seedCars.map((car, index) => ({
  ...car,
  _id: `demo-${index + 1}`,
  slug: `${car.year}-${car.brand}-${car.model}-${index + 1}`.toLowerCase().replaceAll(' ', '-'),
  createdAt: new Date(Date.now() - index * 86400000).toISOString(),
  updatedAt: new Date().toISOString()
}));

const isMongoReady = () => CarListing.db.readyState === 1;

const carRulesBase = () => [
  body('name').trim().notEmpty(),
  body('brand').trim().notEmpty(),
  body('model').trim().notEmpty(),
  body('year').isInt({ min: 1980, max: new Date().getFullYear() + 1 }),
  body('price').isNumeric(),
  body('fuelType').isIn(['petrol', 'diesel', 'electric', 'hybrid']),
  body('transmission').isIn(['manual', 'automatic']),
  body('kilometersDriven').isNumeric(),
  body('ownership').trim().notEmpty(),
  body('description').trim().notEmpty()
];

export const carCreateRules = carRulesBase();
export const carUpdateRules = carRulesBase().map((rule) => rule.optional());

export const carQueryRules = [
  query('minPrice').optional().isNumeric(),
  query('maxPrice').optional().isNumeric(),
  query('minYear').optional().isNumeric(),
  query('maxYear').optional().isNumeric(),
  query('sold').optional().isBoolean(),
  query('featured').optional().isBoolean()
];

const buildFilter = (queryParams) => {
  const filter = {};
  const regexFields = ['brand', 'fuelType', 'transmission', 'ownership'];

  regexFields.forEach((field) => {
    if (queryParams[field]) filter[field] = new RegExp(`^${queryParams[field]}$`, 'i');
  });

  if (queryParams.sold !== undefined) filter.sold = queryParams.sold === 'true';
  if (queryParams.featured !== undefined) filter.featured = queryParams.featured === 'true';
  if (queryParams.minPrice || queryParams.maxPrice) {
    filter.price = {};
    if (queryParams.minPrice) filter.price.$gte = Number(queryParams.minPrice);
    if (queryParams.maxPrice) filter.price.$lte = Number(queryParams.maxPrice);
  }
  if (queryParams.minYear || queryParams.maxYear) {
    filter.year = {};
    if (queryParams.minYear) filter.year.$gte = Number(queryParams.minYear);
    if (queryParams.maxYear) filter.year.$lte = Number(queryParams.maxYear);
  }
  if (queryParams.maxKm) filter.kilometersDriven = { $lte: Number(queryParams.maxKm) };
  if (queryParams.search) {
    filter.$or = ['name', 'brand', 'model', 'variant', 'description'].map((field) => ({
      [field]: new RegExp(queryParams.search, 'i')
    }));
  }

  return filter;
};

const filterMemoryCars = (queryParams) => {
  let cars = [...memoryCars];
  if (queryParams.search) {
    const term = queryParams.search.toLowerCase();
    cars = cars.filter((car) => [car.name, car.brand, car.model, car.variant, car.description].join(' ').toLowerCase().includes(term));
  }
  ['brand', 'fuelType', 'transmission', 'ownership'].forEach((field) => {
    if (queryParams[field]) cars = cars.filter((car) => String(car[field]).toLowerCase() === queryParams[field].toLowerCase());
  });
  if (queryParams.sold !== undefined) cars = cars.filter((car) => car.sold === (queryParams.sold === 'true'));
  if (queryParams.featured !== undefined) cars = cars.filter((car) => car.featured === (queryParams.featured === 'true'));
  if (queryParams.minPrice) cars = cars.filter((car) => car.price >= Number(queryParams.minPrice));
  if (queryParams.maxPrice) cars = cars.filter((car) => car.price <= Number(queryParams.maxPrice));
  if (queryParams.minYear) cars = cars.filter((car) => car.year >= Number(queryParams.minYear));
  if (queryParams.maxYear) cars = cars.filter((car) => car.year <= Number(queryParams.maxYear));
  if (queryParams.maxKm) cars = cars.filter((car) => car.kilometersDriven <= Number(queryParams.maxKm));

  const sort = queryParams.sort || '-createdAt';
  const direction = sort.startsWith('-') ? -1 : 1;
  const key = sort.replace('-', '');
  cars.sort((a, b) => (a[key] > b[key] ? direction : -direction));
  return cars;
};

export const getCars = async (req, res, next) => {
  try {
    if (!isMongoReady()) {
      const cars = filterMemoryCars(req.query);
      return res.json({ success: true, count: cars.length, cars });
    }

    const filter = buildFilter(req.query);
    const sort = req.query.sort || '-createdAt';
    const cars = await CarListing.find(filter).sort(sort);
    res.json({ success: true, count: cars.length, cars });
  } catch (error) {
    next(error);
  }
};

export const getCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isMongoReady()) {
      const car = memoryCars.find((item) => item._id === id || item.slug === id);
      if (!car) throw new ApiError(404, 'Car not found');
      return res.json({ success: true, car });
    }

    const clauses = [{ slug: id }];
    if (id.match(/^[0-9a-fA-F]{24}$/)) clauses.push({ _id: id });
    const car = await CarListing.findOne({ $or: clauses });
    if (!car) throw new ApiError(404, 'Car not found');
    res.json({ success: true, car });
  } catch (error) {
    next(error);
  }
};

export const createCar = async (req, res, next) => {
  try {
    if (!isMongoReady()) {
      const car = { ...req.body, _id: `demo-${Date.now()}`, slug: `${req.body.year}-${req.body.name}`.toLowerCase().replaceAll(' ', '-'), createdAt: new Date(), updatedAt: new Date() };
      memoryCars.unshift(car);
      return res.status(201).json({ success: true, car });
    }

    const car = await CarListing.create(req.body);
    res.status(201).json({ success: true, car });
  } catch (error) {
    next(error);
  }
};

export const updateCar = async (req, res, next) => {
  try {
    if (!isMongoReady()) {
      memoryCars = memoryCars.map((car) => (car._id === req.params.id ? { ...car, ...req.body, updatedAt: new Date() } : car));
      const car = memoryCars.find((item) => item._id === req.params.id);
      if (!car) throw new ApiError(404, 'Car not found');
      return res.json({ success: true, car });
    }

    const car = await CarListing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!car) throw new ApiError(404, 'Car not found');
    res.json({ success: true, car });
  } catch (error) {
    next(error);
  }
};

export const deleteCar = async (req, res, next) => {
  try {
    if (!isMongoReady()) {
      memoryCars = memoryCars.filter((car) => car._id !== req.params.id);
      return res.json({ success: true });
    }

    const car = await CarListing.findByIdAndDelete(req.params.id);
    if (!car) throw new ApiError(404, 'Car not found');
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const toggleSold = async (req, res, next) => {
  try {
    if (!isMongoReady()) {
      const car = memoryCars.find((item) => item._id === req.params.id);
      if (!car) throw new ApiError(404, 'Car not found');
      car.sold = req.body.sold ?? !car.sold;
      return res.json({ success: true, car });
    }

    const car = await CarListing.findById(req.params.id);
    if (!car) throw new ApiError(404, 'Car not found');
    car.sold = req.body.sold ?? !car.sold;
    await car.save();
    res.json({ success: true, car });
  } catch (error) {
    next(error);
  }
};

export const uploadImages = async (req, res) => {
  const images = (req.files || []).map((file) => `/uploads/${file.filename}`);
  res.status(201).json({ success: true, images });
};
