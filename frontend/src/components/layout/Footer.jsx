import { Instagram, Mail, Phone } from 'lucide-react';
import { CONTACT } from '../../config/constants.js';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50">
      <div className="container-pad grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Luxury on Wheels" className="h-12 w-12" />
            <div>
              <div className="font-display text-2xl font-bold">Luxury on Wheels</div>
              <p className="text-sm text-slate-400">India's Premier Car Marketplace | Find Your Dream Car Here</p>
            </div>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-6 text-slate-400">Delhi's trusted middleman for curated premium second-hand cars, transparent guidance, and showroom-grade purchase confidence.</p>
        </div>
        <div>
          <h3 className="font-bold text-white">Contact</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <a className="flex items-center gap-2 hover:text-white" href={`tel:${CONTACT.phone}`}><Phone size={16} /> {CONTACT.phone}</a>
            <a className="flex items-center gap-2 hover:text-white" href={`mailto:${CONTACT.email}`}><Mail size={16} /> {CONTACT.email}</a>
            <a className="flex items-center gap-2 hover:text-white" href={`https://instagram.com/${CONTACT.instagram}`}><Instagram size={16} /> @{CONTACT.instagram}</a>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-white">Premium Brands</h3>
          <p className="mt-4 text-sm leading-6 text-slate-400">Audi, Mercedes-Benz, BMW, Lamborghini, Porsche, Range Rover, Jaguar, Volvo, Lexus and more.</p>
        </div>
      </div>
    </footer>
  );
}
