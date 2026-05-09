import { Lock } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { loginAdmin } from '../../store/authSlice.js';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: 'admin@luxuryonwheels.in', password: 'Admin@12345' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading } = useSelector((state) => state.auth);
  if (token) return <Navigate to="/admin" replace />;

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginAdmin(form)).unwrap();
      toast.success('Welcome back.');
      navigate('/admin');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Helmet><title>Admin Login | Luxury on Wheels</title></Helmet>
      <section className="container-pad grid min-h-[70vh] place-items-center py-16">
        <form onSubmit={submit} className="glass w-full max-w-md rounded-[2rem] p-8">
          <img src="/logo.svg" alt="" className="mx-auto h-16 w-16" />
          <h1 className="mt-5 text-center font-display text-3xl font-bold">Admin Login</h1>
          <p className="mt-2 text-center text-sm text-slate-400">Manage inventory, sold cars, and featured listings.</p>
          <div className="mt-7 grid gap-4">
            <input name="email" value={form.email} onChange={update} className="input-lux" placeholder="Email" />
            <input name="password" value={form.password} onChange={update} type="password" className="input-lux" placeholder="Password" />
            <button disabled={loading} className="btn-primary w-full"><Lock size={18} /> {loading ? 'Signing in...' : 'Sign In'}</button>
          </div>
        </form>
      </section>
    </>
  );
}
