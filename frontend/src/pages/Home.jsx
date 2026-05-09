import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Car, Crown, Gauge, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import CarGrid from '../components/cars/CarGrid.jsx';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import { fetchCars } from '../store/carsSlice.js';
import { CONTACT } from '../config/constants.js';

export default function Home() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cars);
  const featured = items.filter((car) => car.featured).slice(0, 6);

  useEffect(() => {
    dispatch(fetchCars({ featured: true }));
    gsap.to('.hero-wheel', { rotate: 360, duration: 18, repeat: -1, ease: 'none' });
    gsap.to('.light-streak', { xPercent: 120, duration: 5, repeat: -1, ease: 'power1.inOut', yoyo: true });
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Luxury on Wheels | India's Premier Car Marketplace</title>
      </Helmet>
      <section className="relative isolate min-h-[calc(100vh-80px)] overflow-hidden">
        <div className="absolute inset-0 speed-lines opacity-50" />
        <div className="light-streak absolute left-[-40%] top-24 h-px w-2/3 bg-gradient-to-r from-transparent via-purpleNeon to-transparent opacity-80 blur-sm" />
        <div className="container-pad grid min-h-[calc(100vh-80px)] items-center gap-12 py-16 lg:grid-cols-[1fr_.9fr]">
          <motion.div initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75 }}>
            <p className="text-xs font-bold uppercase tracking-[0.38em] text-purpleNeon">India's Premier Car Marketplace</p>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[0.95] metal-text sm:text-7xl lg:text-8xl">Luxury on Wheels</h1>
            <p className="mt-6 max-w-2xl text-xl text-slate-200">Delhi's trusted middleman for premium second-hand cars.</p>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-400">Find, compare, and buy luxury cars with confidence.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/cars" className="btn-primary">Browse Cars <ArrowRight size={18} /></Link>
              <Link to="/contact" className="btn-ghost">Contact Us <Phone size={18} /></Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 90, rotate: -4 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative">
            <div className="absolute inset-8 rounded-full bg-purpleNeon/20 blur-3xl" />
            <img className="relative z-10 aspect-[4/3] w-full rounded-[2rem] object-cover shadow-metal" src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1600&q=85" alt="Luxury sports car in cinematic showroom lighting" />
            <img src="/logo.svg" alt="" className="hero-wheel absolute -bottom-8 -left-6 z-20 h-28 w-28 rounded-[2rem] shadow-glow" />
          </motion.div>
        </div>
      </section>

      <section className="container-pad py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[['14+', 'Curated cars'], ['Delhi NCR', 'Verified network'], ['09289423539', 'Direct owner line'], ['Premium', 'Luxury-first guidance']].map(([value, label]) => (
            <div key={label} className="glass rounded-[1.5rem] p-6">
              <p className="font-display text-3xl font-bold text-white">{value}</p>
              <p className="mt-2 text-sm uppercase tracking-widest text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-pad py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeader eyebrow="Featured Inventory" title="Showroom-worthy machines, pre-owned with care." copy="A curated Delhi inventory with believable pricing, premium trims, and transparent sold states." />
          <Link to="/cars" className="btn-ghost self-start md:self-auto">View all cars</Link>
        </div>
        <CarGrid cars={featured} loading={loading} />
      </section>

      <section className="container-pad py-16">
        <SectionHeader align="center" eyebrow="Why Choose Us" title="Middleman clarity. Luxury showroom polish." copy="We focus on verified cars, sensible pricing, clean presentation, and direct support through every step." />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            [ShieldCheck, 'Verified Leads', 'Listings are presented with ownership, condition, and registration context.'],
            [Crown, 'Premium Network', 'A Delhi-focused pipeline for luxury and performance cars.'],
            [Gauge, 'Market-Sensible Pricing', 'India-market estimates that keep expectations practical.'],
            [BadgeCheck, 'Direct Contact', 'Fast phone, WhatsApp, email, and Instagram response paths.']
          ].map(([Icon, title, copy]) => (
            <div key={title} className="glass rounded-[1.5rem] p-6 transition hover:-translate-y-1 hover:border-purpleNeon/40">
              <Icon className="h-8 w-8 text-purpleNeon" />
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-pad py-16">
        <div className="glass overflow-hidden rounded-[2rem] p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <SectionHeader eyebrow="Categories" title="From executive sedans to super SUVs." />
              <p className="mt-4 text-slate-400">Audi, Mercedes-Benz, BMW, Lamborghini, Porsche, Range Rover, Volvo, Jaguar, Lexus and more.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {['Mercedes', 'BMW', 'Audi', 'Porsche', 'Lamborghini', 'Range Rover'].map((brand) => (
                <Link key={brand} to={`/cars?brand=${encodeURIComponent(brand)}`} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center font-bold text-metal transition hover:border-purpleNeon hover:bg-purpleNeon/10">
                  <Car className="mx-auto mb-3 text-purpleNeon" /> {brand}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-pad pb-20">
        <div className="rounded-[2rem] border border-purpleNeon/30 bg-purpleNeon/10 p-8 text-center shadow-glow">
          <Sparkles className="mx-auto h-8 w-8 text-champagne" />
          <h2 className="mt-4 font-display text-3xl font-bold">Ready to source your dream car?</h2>
          <p className="mt-3 text-slate-300">Call {CONTACT.phone}, email {CONTACT.email}, or DM @{CONTACT.instagram}.</p>
        </div>
      </section>
    </>
  );
}
