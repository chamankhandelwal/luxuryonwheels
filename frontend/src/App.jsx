import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Loader from './components/ui/Loader.jsx';
import FloatingContact from './components/ui/FloatingContact.jsx';
import Home from './pages/Home.jsx';
import Cars from './pages/Cars.jsx';
import CarDetails from './pages/CarDetails.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import CarFormPage from './pages/admin/CarFormPage.jsx';
import SoldCars from './pages/admin/SoldCars.jsx';
import { useEffect, useState } from 'react';

const Protected = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? children : <Navigate to="/admin/login" replace />;
};

const PageShell = ({ children }) => (
  <motion.main initial={{ opacity: 0, y: 22, scale: 0.99 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
    {children}
  </motion.main>
);

export default function App() {
  const location = useLocation();
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 1150);
    return () => clearTimeout(timer);
  }, []);

  if (booting) return <Loader />;

  return (
    <>
      <Helmet>
        <title>Luxury on Wheels | Delhi Premium Used Cars</title>
      </Helmet>
      <div className="min-h-screen bg-showroom text-white">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageShell><Home /></PageShell>} />
            <Route path="/cars" element={<PageShell><Cars /></PageShell>} />
            <Route path="/cars/:id" element={<PageShell><CarDetails /></PageShell>} />
            <Route path="/about" element={<PageShell><About /></PageShell>} />
            <Route path="/contact" element={<PageShell><Contact /></PageShell>} />
            <Route path="/admin/login" element={<PageShell><AdminLogin /></PageShell>} />
            <Route path="/admin" element={<Protected><PageShell><AdminDashboard /></PageShell></Protected>} />
            <Route path="/admin/cars/new" element={<Protected><PageShell><CarFormPage /></PageShell></Protected>} />
            <Route path="/admin/cars/:id/edit" element={<Protected><PageShell><CarFormPage /></PageShell></Protected>} />
            <Route path="/admin/sold" element={<Protected><PageShell><SoldCars /></PageShell></Protected>} />
          </Routes>
        </AnimatePresence>
        <Footer />
        <FloatingContact />
      </div>
    </>
  );
}
