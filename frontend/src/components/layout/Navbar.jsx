import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const links = [
  ['/', 'Home'],
  ['/cars', 'Cars'],
  ['/about', 'Story'],
  ['/contact', 'Contact']
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const linkClass = ({ isActive }) => `rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-carbon/80 backdrop-blur-2xl">
      <div className="container-pad flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="Luxury on Wheels logo" className="h-12 w-12" />
          <div>
            <div className="font-display text-xl font-bold leading-5">Luxury on Wheels</div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-slate-400">Delhi Marketplace</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {links.map(([to, label]) => <NavLink key={to} to={to} className={linkClass}>{label}</NavLink>)}
          <NavLink to="/admin" className={linkClass}>Admin</NavLink>
        </nav>
        <button className="rounded-full border border-white/10 p-2 md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="container-pad grid gap-2 pb-5 md:hidden">
          {[...links, ['/admin', 'Admin']].map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)} className={linkClass}>{label}</NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
