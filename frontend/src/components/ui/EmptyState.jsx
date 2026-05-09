import { Gauge } from 'lucide-react';

export default function EmptyState({ title = 'No cars found', copy = 'Adjust filters or check back soon for new arrivals.' }) {
  return (
    <div className="glass grid min-h-64 place-items-center rounded-[2rem] p-10 text-center">
      <div>
        <Gauge className="mx-auto h-10 w-10 text-purpleNeon" />
        <h3 className="mt-4 text-xl font-bold">{title}</h3>
        <p className="mt-2 text-sm text-slate-400">{copy}</p>
      </div>
    </div>
  );
}
