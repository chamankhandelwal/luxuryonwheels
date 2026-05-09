import EmptyState from '../ui/EmptyState.jsx';
import CarCard from './CarCard.jsx';

export default function CarGrid({ cars, loading }) {
  if (loading) {
    return <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-96 animate-pulse rounded-[1.75rem] bg-white/10" />)}</div>;
  }
  if (!cars?.length) return <EmptyState />;
  return <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{cars.map((car) => <CarCard key={car._id} car={car} />)}</div>;
}
