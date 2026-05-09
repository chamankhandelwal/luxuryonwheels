import { motion } from 'framer-motion';
import { Calendar, Fuel, Gauge, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatKm, formatPrice, titleCase } from '../../utils/format.js';

export default function CarCard({ car }) {
  return (
    <motion.article whileHover={{ y: -8 }} className={`glass group relative overflow-hidden rounded-[1.75rem] ${car.sold ? 'opacity-70 grayscale-[.25]' : ''}`}>
      {car.sold && <div className="absolute right-4 top-4 z-10 rounded-full bg-red-500/90 px-3 py-1 text-xs font-black uppercase tracking-widest text-white">Sold</div>}
      {car.featured && !car.sold && <div className="absolute left-4 top-4 z-10 rounded-full bg-purpleNeon/90 px-3 py-1 text-xs font-black uppercase tracking-widest text-white">Featured</div>}
      <Link to={`/cars/${car.slug || car._id}`} className="block">
        <div className="aspect-[16/10] overflow-hidden bg-white/5">
          <img src={car.images?.[0] || '/logo.svg'} alt={car.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-champagne">{car.brand}</span>
              <h3 className="mt-3 line-clamp-2 text-xl font-bold text-white">{car.name}</h3>
            </div>
            <p className="shrink-0 text-right text-lg font-black text-white">{formatPrice(car.price)}</p>
          </div>
          <p className="mt-3 min-h-10 text-sm leading-5 text-slate-400">{car.highlight}</p>
          <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-slate-300">
            <span className="flex items-center gap-2"><Calendar size={15} className="text-purpleNeon" /> {car.year}</span>
            <span className="flex items-center gap-2"><Fuel size={15} className="text-purpleNeon" /> {titleCase(car.fuelType)}</span>
            <span className="flex items-center gap-2"><Gauge size={15} className="text-purpleNeon" /> {formatKm(car.kilometersDriven)}</span>
            <span className="flex items-center gap-2"><ShieldCheck size={15} className="text-purpleNeon" /> {car.ownership}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
