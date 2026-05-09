import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-carbon">
      <div className="absolute inset-0 speed-lines opacity-70" />
      <motion.div initial={{ opacity: 0, scale: 0.86, x: -80 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0 }} className="relative text-center">
        <img src="/logo.svg" alt="Luxury on Wheels" className="wheel-spin mx-auto h-24 w-24 drop-shadow-[0_0_28px_rgba(139,92,246,.65)]" />
        <div className="mt-6 font-display text-3xl font-bold metal-text">Luxury on Wheels</div>
        <p className="mt-2 text-sm uppercase tracking-[0.35em] text-slate-400">Showroom loading</p>
      </motion.div>
    </div>
  );
}
