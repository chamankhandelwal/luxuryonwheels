import { Helmet } from 'react-helmet-async';
import SectionHeader from '../components/ui/SectionHeader.jsx';

export default function About() {
  return (
    <>
      <Helmet><title>Brand Story | Luxury on Wheels</title></Helmet>
      <section className="container-pad py-16">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <SectionHeader eyebrow="Brand Story" title="A Delhi middleman built for premium car decisions." copy="Luxury on Wheels connects buyers with desirable second-hand luxury cars through clear presentation, practical market guidance, and direct human support." />
          <img src="https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1400&q=85" alt="Premium car showroom" className="rounded-[2rem] object-cover shadow-metal" />
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            ['Curated', 'Inventory is selected for desirability, condition story, and Delhi NCR relevance.'],
            ['Transparent', 'Listings expose year, ownership, kilometers, registration, sold state, and condition notes.'],
            ['Premium', 'Every touchpoint is built to feel like a high-end showroom rather than a classified board.']
          ].map(([title, copy]) => (
            <div key={title} className="glass rounded-[1.5rem] p-6">
              <h3 className="font-display text-2xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
