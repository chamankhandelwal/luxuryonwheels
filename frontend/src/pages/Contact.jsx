import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import api from '../services/api.js';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import { CONTACT } from '../config/constants.js';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await api.post('/inquiries', form);
      toast.success('Inquiry received. We will contact you soon.');
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Contact | Luxury on Wheels</title></Helmet>
      <section className="container-pad py-16">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <SectionHeader eyebrow="Contact" title="Tell us the car you want. We will steer the search." copy="Call, WhatsApp, email, or send a website inquiry for premium used cars in Delhi NCR." />
            <div className="mt-8 grid gap-4">
              <a href={`tel:${CONTACT.phone}`} className="glass flex items-center gap-4 rounded-2xl p-5 hover:border-purpleNeon/40"><Phone className="text-purpleNeon" /> {CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`} className="glass flex items-center gap-4 rounded-2xl p-5 hover:border-purpleNeon/40"><Mail className="text-purpleNeon" /> {CONTACT.email}</a>
              <a href={`https://instagram.com/${CONTACT.instagram}`} className="glass flex items-center gap-4 rounded-2xl p-5 hover:border-purpleNeon/40"><Instagram className="text-purpleNeon" /> @{CONTACT.instagram}</a>
              <div className="glass flex items-center gap-4 rounded-2xl p-5"><MapPin className="text-purpleNeon" /> Delhi NCR, India</div>
            </div>
          </div>
          <form onSubmit={submit} className="glass rounded-[2rem] p-6 md:p-8">
            <div className="grid gap-4">
              <input name="name" value={form.name} onChange={update} required placeholder="Your name" className="input-lux" />
              <input name="phone" value={form.phone} onChange={update} required placeholder="Phone number" className="input-lux" />
              <input name="email" value={form.email} onChange={update} placeholder="Email address" className="input-lux" />
              <textarea name="message" value={form.message} onChange={update} required rows="6" placeholder="Car preference, budget, timeline..." className="input-lux resize-none" />
              <button disabled={loading} className="btn-primary">{loading ? 'Sending...' : 'Submit Inquiry'}</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
