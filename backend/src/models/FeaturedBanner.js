import mongoose from 'mongoose';

const featuredBannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    image: { type: String },
    ctaLabel: { type: String },
    ctaUrl: { type: String },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('FeaturedBanner', featuredBannerSchema);
