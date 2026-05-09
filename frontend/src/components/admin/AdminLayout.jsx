import { LogOut, PlusCircle, Settings, Tags } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice.js';

export default function AdminLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemClass = ({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${isActive ? 'bg-purpleNeon text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`;

  const doLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  return (
    <section className="container-pad py-10">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="glass h-fit rounded-[2rem] p-4">
          <Link to="/admin" className="mb-5 flex items-center gap-3 px-2">
            <img src="/logo.svg" alt="" className="h-10 w-10" />
            <div>
              <p className="font-bold">Admin Console</p>
              <p className="text-xs text-slate-400">Luxury on Wheels</p>
            </div>
          </Link>
          <nav className="grid gap-2">
            <NavLink to="/admin" end className={itemClass}><Settings size={18} /> Dashboard</NavLink>
            <NavLink to="/admin/cars/new" className={itemClass}><PlusCircle size={18} /> Add Listing</NavLink>
            <NavLink to="/admin/sold" className={itemClass}><Tags size={18} /> Sold Cars</NavLink>
          </nav>
          <button onClick={doLogout} className="mt-5 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white">
            <LogOut size={18} /> Logout
          </button>
        </aside>
        <div>{children}</div>
      </div>
    </section>
  );
}
