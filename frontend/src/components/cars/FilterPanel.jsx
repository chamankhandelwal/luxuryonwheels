import { BRAND_OPTIONS, FUEL_OPTIONS, OWNER_OPTIONS, TRANSMISSION_OPTIONS } from '../../config/constants.js';

const Select = ({ label, name, value, onChange, options }) => (
  <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
    {label}
    <select name={name} value={value || ''} onChange={onChange} className="input-lux normal-case tracking-normal">
      <option value="">All</option>
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  </label>
);

export default function FilterPanel({ filters, setFilters }) {
  const update = (event) => setFilters((current) => ({ ...current, [event.target.name]: event.target.value }));
  const reset = () => setFilters({});

  return (
    <aside className="glass sticky top-24 rounded-[2rem] p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Refine Inventory</h2>
        <button onClick={reset} className="text-xs font-bold uppercase tracking-widest text-purpleNeon">Reset</button>
      </div>
      <div className="mt-5 grid gap-4">
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          Search
          <input name="search" value={filters.search || ''} onChange={update} placeholder="BMW, Urus, diesel..." className="input-lux normal-case tracking-normal" />
        </label>
        <Select label="Brand" name="brand" value={filters.brand} onChange={update} options={BRAND_OPTIONS} />
        <Select label="Fuel" name="fuelType" value={filters.fuelType} onChange={update} options={FUEL_OPTIONS} />
        <Select label="Transmission" name="transmission" value={filters.transmission} onChange={update} options={TRANSMISSION_OPTIONS} />
        <Select label="Ownership" name="ownership" value={filters.ownership} onChange={update} options={OWNER_OPTIONS} />
        <div className="grid grid-cols-2 gap-3">
          <input name="minPrice" value={filters.minPrice || ''} onChange={update} placeholder="Min price" className="input-lux" />
          <input name="maxPrice" value={filters.maxPrice || ''} onChange={update} placeholder="Max price" className="input-lux" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input name="minYear" value={filters.minYear || ''} onChange={update} placeholder="From year" className="input-lux" />
          <input name="maxKm" value={filters.maxKm || ''} onChange={update} placeholder="Max km" className="input-lux" />
        </div>
        <Select label="Status" name="sold" value={filters.sold} onChange={update} options={['false', 'true']} />
        <Select label="Featured" name="featured" value={filters.featured} onChange={update} options={['true', 'false']} />
      </div>
    </aside>
  );
}
