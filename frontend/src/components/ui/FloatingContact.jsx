import { MessageCircle, Phone } from 'lucide-react';
import { CONTACT } from '../../config/constants.js';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-3">
      <a href={`https://wa.me/${CONTACT.whatsapp}`} className="grid h-12 w-12 place-items-center rounded-full bg-green-500 text-white shadow-glow transition hover:-translate-y-1" aria-label="WhatsApp">
        <MessageCircle size={21} />
      </a>
      <a href={`tel:${CONTACT.phone}`} className="grid h-12 w-12 place-items-center rounded-full bg-purpleNeon text-white shadow-glow transition hover:-translate-y-1" aria-label="Call">
        <Phone size={20} />
      </a>
    </div>
  );
}
