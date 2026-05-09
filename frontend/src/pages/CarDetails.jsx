import { ArrowLeft, BadgeIndianRupee, Calendar, Fuel, Gauge, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import CarGrid from '../components/cars/CarGrid.jsx';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import { CONTACT } from '../config/constants.js';
import { fetchCar, fetchCars } from '../store/carsSlice.js';
import { formatKm, formatPrice, titleCase } from '../utils/format.js';

export default function CarDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected, items, loading } = useSelector((state) => state.cars);
  const [active, setActive] = useState(0);

  useEffect(() => {
    dispatch(fetchCar(id));
    dispatch(fetchCars());
    setActive(0);
  }, [dispatch, id]);

  const similar = useMemo(() => items.filter((car) => selected && car.brand === selected.brand && car._id !== selected._id).slice(0, 3), [items, selected]);

  if (loading && !selected) return <div className="container-pad min-h-screen py-12"><div className="h-[70vh] animate-pulse rounded-[2rem] bg-white/10" /></div>;
  if (!selected) return null;

  const image = selected.images?.[active] || selected.images?.[0] || '/logo.svg';

  return (
    <>
      <Helmet>
        <title>{selected.name} | Luxury on Wheels</title>
        <meta name="description" content={selected.description} />
      </Helmet>
      <section className="container-pad py-10">
        <Link to="/cars" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white"><ArrowLeft size={17} /> Back to inventory</Link>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-metal">
              {selected.sold && <span className="absolute right-5 top-5 z-10 rounded-full bg-red-500 px-4 py-2 text-xs font-black uppercase tracking-widest">Sold</span>}
              <img src={image} alt={selected.name} className="aspect-[16/10] w-full object-cover" />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {(selected.images || []).slice(0, 4).map((src, index) => (
                <button key={src} onClick={() => setActive(index)} className={`overflow-hidden rounded-2xl border ${active === index ? 'border-purpleNeon' : 'border-white/10'}`}>
                  <img src={src} alt="" className="aspect-[4/3] w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="glass rounded-[2rem] p-6 lg:p-8">
            <span className="rounded-full border border-purpleNeon/40 bg-purpleNeon/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-champagne">{selected.brand}</span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight">{selected.name}</h1>
            <p className="mt-3 text-slate-400">{selected.description}</p>
            <div className="mt-6 text-4xl font-black text-white">{formatPrice(selected.price)}</div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-300">
              {[
                [Calendar, selected.year],
                [Fuel, titleCase(selected.fuelType)],
                [Gauge, formatKm(selected.kilometersDriven)],
                [ShieldCheck, selected.ownership],
                [BadgeIndianRupee, selected.registrationState || 'Delhi NCR'],
                [Phone, selected.transmission && titleCase(selected.transmission)]
              ].map(([Icon, text]) => <div key={text} className="rounded-2xl bg-white/[0.05] p-4"><Icon className="mb-2 text-purpleNeon" size={18} /> {text}</div>)}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={`tel:${CONTACT.phone}`} className="btn-primary"><Phone size={18} /> Call Now</a>
              <a href={`https://wa.me/${CONTACT.whatsapp}?text=I%20am%20interested%20in%20${encodeURIComponent(selected.name)}`} className="btn-ghost"><MessageCircle size={18} /> WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
      <section className="container-pad py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="glass rounded-[2rem] p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold">Features</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {(selected.features || []).map((feature) => <span key={feature} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">{feature}</span>)}
            </div>
          </div>
          <div className="glass rounded-[2rem] p-6">
            <h2 className="text-2xl font-bold">Condition Notes</h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">{selected.conditionNotes || 'Detailed inspection available on request.'}</p>
          </div>
        </div>
      </section>
      {!!similar.length && (
        <section className="container-pad py-14">
          <SectionHeader eyebrow="Similar Cars" title={`More from ${selected.brand}`} />
          <div className="mt-8"><CarGrid cars={similar} loading={false} /></div>
        </section>
      )}
    </>
  );
}
