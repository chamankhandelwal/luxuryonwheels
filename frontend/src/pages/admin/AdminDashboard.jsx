import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import { deleteCar, fetchCars, toggleSold } from '../../store/carsSlice.js';
import { formatPrice } from '../../utils/format.js';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cars);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const filtered = useMemo(() => items.filter((car) => [car.name, car.brand, car.model].join(' ').toLowerCase().includes(search.toLowerCase())), [items, search]);
  const stats = [
    ['Total Listings', items.length],
    ['Available', items.filter((car) => !car.sold).length],
    ['Sold', items.filter((car) => car.sold).length],
    ['Featured', items.filter((car) => car.featured).length]
  ];

  const remove = async (id) => {
    if (!confirm('Delete this listing?')) return;
    await dispatch(deleteCar(id)).unwrap();
    toast.success('Listing deleted.');
  };

  const markSold = async (car) => {
    await dispatch(toggleSold({ id: car._id, sold: !car.sold })).unwrap();
    toast.success(car.sold ? 'Marked available.' : 'Marked sold.');
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-display text-4xl font-bold">Inventory Dashboard</h1>
          <p className="mt-2 text-slate-400">Add, edit, delete, feature, and mark premium listings sold.</p>
        </div>
        <Link to="/admin/cars/new" className="btn-primary"><Plus size={18} /> Add Car</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map(([label, value]) => <div key={label} className="glass rounded-2xl p-5"><p className="text-3xl font-black">{value}</p><p className="text-sm text-slate-400">{label}</p></div>)}
      </div>
      <div className="glass mt-6 rounded-[2rem] p-5">
        <label className="mb-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4">
          <Search size={18} className="text-purpleNeon" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search admin inventory" className="w-full bg-transparent py-3 text-sm outline-none" />
        </label>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="text-xs uppercase tracking-widest text-slate-500">
              <tr><th className="p-3">Car</th><th className="p-3">Year</th><th className="p-3">Price</th><th className="p-3">Status</th><th className="p-3">Featured</th><th className="p-3">Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((car) => (
                <tr key={car._id} className="border-t border-white/10">
                  <td className="p-3"><div className="font-bold">{car.name}</div><div className="text-xs text-slate-500">{car.brand} · {car.model}</div></td>
                  <td className="p-3">{car.year}</td>
                  <td className="p-3">{formatPrice(car.price)}</td>
                  <td className="p-3"><button onClick={() => markSold(car)} className={`rounded-full px-3 py-1 text-xs font-bold ${car.sold ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'}`}>{car.sold ? 'Sold' : 'Available'}</button></td>
                  <td className="p-3">{car.featured ? 'Yes' : 'No'}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Link to={`/admin/cars/${car._id}/edit`} className="rounded-full border border-white/10 p-2 hover:bg-white/10" aria-label="Edit"><Edit size={16} /></Link>
                      <button onClick={() => remove(car._id)} className="rounded-full border border-white/10 p-2 hover:bg-red-500/20" aria-label="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <p className="p-4 text-slate-400">Loading inventory...</p>}
        </div>
      </div>
    </AdminLayout>
  );
}
