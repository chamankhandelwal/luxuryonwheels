import { useEffect, useState } from 'react';
import { BRAND_OPTIONS, FUEL_OPTIONS, OWNER_OPTIONS, TAG_OPTIONS, TRANSMISSION_OPTIONS } from '../../config/constants.js';

const emptyCar = {
  name: '',
  brand: 'Mercedes',
  model: '',
  variant: '',
  year: new Date().getFullYear(),
  price: '',
  fuelType: 'diesel',
  transmission: 'automatic',
  kilometersDriven: '',
  ownership: 'First Owner',
  previousOwners: 0,
  exteriorColor: '',
  interiorColor: '',
  registrationState: 'DL',
  engineDetails: '',
  featuresText: '',
  tagsText: '',
  imagesText: '',
  description: '',
  conditionNotes: '',
  highlight: '',
  sold: false,
  featured: false
};

const Select = ({ label, name, value, onChange, options }) => (
  <label className="grid gap-2 text-sm font-semibold text-slate-300">
    {label}
    <select name={name} value={value} onChange={onChange} className="input-lux">
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  </label>
);

export default function CarForm({ car, onSubmit, loading }) {
  const [form, setForm] = useState(emptyCar);

  useEffect(() => {
    if (car) {
      setForm({
        ...emptyCar,
        ...car,
        featuresText: (car.features || []).join(', '),
        tagsText: (car.tags || []).join(', '),
        imagesText: (car.images || []).join('\n')
      });
    }
  }, [car]);

  const update = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      year: Number(form.year),
      price: Number(form.price),
      kilometersDriven: Number(form.kilometersDriven),
      previousOwners: Number(form.previousOwners),
      features: form.featuresText.split(',').map((item) => item.trim()).filter(Boolean),
      tags: form.tagsText.split(',').map((item) => item.trim()).filter(Boolean),
      images: form.imagesText.split('\n').map((item) => item.trim()).filter(Boolean)
    };
    delete payload.featuresText;
    delete payload.tagsText;
    delete payload.imagesText;
    onSubmit(payload);
  };

  return (
    <form onSubmit={submit} className="glass rounded-[2rem] p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-slate-300 md:col-span-2">Car name<input required name="name" value={form.name} onChange={update} className="input-lux" /></label>
        <Select label="Brand" name="brand" value={form.brand} onChange={update} options={BRAND_OPTIONS} />
        <label className="grid gap-2 text-sm font-semibold text-slate-300">Model<input required name="model" value={form.model} onChange={update} className="input-lux" /></label>
        <label className="grid gap-2 text-sm font-semibold text-slate-300">Variant<input name="variant" value={form.variant} onChange={update} className="input-lux" /></label>
        <label className="grid gap-2 text-sm font-semibold text-slate-300">Model year<input required type="number" name="year" value={form.year} onChange={update} className="input-lux" /></label>
        <label className="grid gap-2 text-sm font-semibold text-slate-300">Price INR<input required type="number" name="price" value={form.price} onChange={update} className="input-lux" /></label>
        <label className="grid gap-2 text-sm font-semibold text-slate-300">Kilometers driven<input required type="number" name="kilometersDriven" value={form.kilometersDriven} onChange={update} className="input-lux" /></label>
        <Select label="Fuel type" name="fuelType" value={form.fuelType} onChange={update} options={FUEL_OPTIONS} />
        <Select label="Transmission" name="transmission" value={form.transmission} onChange={update} options={TRANSMISSION_OPTIONS} />
        <Select label="Ownership" name="ownership" value={form.ownership} onChange={update} options={OWNER_OPTIONS} />
        <label className="grid gap-2 text-sm font-semibold text-slate-300">Previous owners<input type="number" name="previousOwners" value={form.previousOwners} onChange={update} className="input-lux" /></label>
        <label className="grid gap-2 text-sm font-semibold text-slate-300">Exterior color<input name="exteriorColor" value={form.exteriorColor} onChange={update} className="input-lux" /></label>
        <label className="grid gap-2 text-sm font-semibold text-slate-300">Interior color<input name="interiorColor" value={form.interiorColor} onChange={update} className="input-lux" /></label>
        <label className="grid gap-2 text-sm font-semibold text-slate-300">Registration state<input name="registrationState" value={form.registrationState} onChange={update} className="input-lux" /></label>
        <label className="grid gap-2 text-sm font-semibold text-slate-300">Engine details<input name="engineDetails" value={form.engineDetails} onChange={update} className="input-lux" /></label>
        <label className="grid gap-2 text-sm font-semibold text-slate-300 md:col-span-2">Highlight<input name="highlight" value={form.highlight} onChange={update} className="input-lux" /></label>
        <label className="grid gap-2 text-sm font-semibold text-slate-300 md:col-span-2">Features, comma separated<input name="featuresText" value={form.featuresText} onChange={update} placeholder="Panoramic roof, Burmester audio" className="input-lux" /></label>
        <label className="grid gap-2 text-sm font-semibold text-slate-300 md:col-span-2">Tags, comma separated<input name="tagsText" value={form.tagsText || TAG_OPTIONS.slice(0, 2).join(', ')} onChange={update} className="input-lux" /></label>
        <label className="grid gap-2 text-sm font-semibold text-slate-300 md:col-span-2">Image URLs, one per line<textarea name="imagesText" value={form.imagesText} onChange={update} rows="4" className="input-lux resize-none" /></label>
        <label className="grid gap-2 text-sm font-semibold text-slate-300 md:col-span-2">Description<textarea required name="description" value={form.description} onChange={update} rows="4" className="input-lux resize-none" /></label>
        <label className="grid gap-2 text-sm font-semibold text-slate-300 md:col-span-2">Condition notes<textarea name="conditionNotes" value={form.conditionNotes} onChange={update} rows="3" className="input-lux resize-none" /></label>
        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-bold"><input type="checkbox" name="sold" checked={form.sold} onChange={update} /> Sold</label>
        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-bold"><input type="checkbox" name="featured" checked={form.featured} onChange={update} /> Featured</label>
      </div>
      <button disabled={loading} className="btn-primary mt-6">{loading ? 'Saving...' : 'Save Listing'}</button>
    </form>
  );
}
