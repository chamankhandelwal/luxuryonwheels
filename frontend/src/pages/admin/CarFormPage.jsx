import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import CarForm from '../../components/admin/CarForm.jsx';
import { fetchCars, saveCar } from '../../store/carsSlice.js';

export default function CarFormPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cars);
  const [loading, setLoading] = useState(false);
  const car = useMemo(() => items.find((item) => item._id === id), [items, id]);

  useEffect(() => {
    if (id && !items.length) dispatch(fetchCars());
  }, [dispatch, id, items.length]);

  const submit = async (payload) => {
    setLoading(true);
    try {
      await dispatch(saveCar({ id, payload })).unwrap();
      toast.success(id ? 'Listing updated.' : 'Listing created.');
      navigate('/admin');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-display text-4xl font-bold">{id ? 'Edit Listing' : 'Add Listing'}</h1>
        <p className="mt-2 text-slate-400">Keep every listing complete, credible, and showroom-ready.</p>
      </div>
      <CarForm car={car} onSubmit={submit} loading={loading} />
    </AdminLayout>
  );
}
