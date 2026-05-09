import mongoose from 'mongoose';
import slugify from 'slugify';

const carListingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    brand: { type: String, required: true, trim: true, index: true },
    model: { type: String, required: true, trim: true },
    variant: { type: String, trim: true },
    year: { type: Number, required: true, min: 1980, max: new Date().getFullYear() + 1, index: true },
    price: { type: Number, required: true, min: 0, index: true },
    fuelType: { type: String, enum: ['petrol', 'diesel', 'electric', 'hybrid'], required: true, index: true },
    transmission: { type: String, enum: ['manual', 'automatic'], required: true, index: true },
    kilometersDriven: { type: Number, required: true, min: 0, index: true },
    ownership: { type: String, required: true },
    previousOwners: { type: Number, default: 0, min: 0 },
    exteriorColor: { type: String, trim: true },
    interiorColor: { type: String, trim: true },
    color: { type: String, trim: true },
    registrationState: { type: String, trim: true },
    engineDetails: { type: String, trim: true },
    images: [{ type: String, trim: true }],
    description: { type: String, required: true },
    features: [{ type: String, trim: true }],
    conditionNotes: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    highlight: { type: String, trim: true },
    sold: { type: Boolean, default: false, index: true },
    featured: { type: Boolean, default: false, index: true }
  },
  { timestamps: true }
);

carListingSchema.pre('validate', function makeSlug(next) {
  if (!this.slug && this.name && this.year) {
    this.slug = slugify(`${this.year}-${this.name}-${Date.now()}`, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model('CarListing', carListingSchema);
