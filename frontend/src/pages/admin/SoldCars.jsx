import { RotateCcw } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import { fetchCars, toggleSold } from '../../store/carsSlice.js';
import { formatPrice } from '../../utils/format.js';

export default function SoldCars() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cars);
  const sold = items.filter((car) => car.sold);

  useEffect(() => {
    dispatch(fetchCars({ sold: true }));
  }, [dispatch]);

  const restore = async (id) => {
    await dispatch(toggleSold({ id, sold: false })).unwrap();
    toast.success('Car marked available.');
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-display text-4xl font-bold">Sold Cars</h1>
        <p className="mt-2 text-slate-400">Review sold inventory and restore listings if needed.</p>
      </div>
      {!sold.length ? <EmptyState title="No sold cars" copy="Sold listings will appear here." /> : (
        <div className="grid gap-4">
          {sold.map((car) => (
            <div key={car._id} className="glass flex flex-col justify-between gap-4 rounded-2xl p-4 md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <img src={car.images?.[0] || '/logo.svg'} alt="" className="h-20 w-28 rounded-xl object-cover" />
                <div>
                  <h2 className="font-bold">{car.name}</h2>
                  <p className="text-sm text-slate-400">{car.year} · {formatPrice(car.price)}</p>
                </div>
              </div>
              <button onClick={() => restore(car._id)} className="btn-ghost"><RotateCcw size={17} /> Mark Available</button>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
