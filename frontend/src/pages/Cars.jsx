import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CarGrid from '../components/cars/CarGrid.jsx';
import FilterPanel from '../components/cars/FilterPanel.jsx';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import { fetchCars } from '../store/carsSlice.js';

export default function Cars() {
  const [searchParams] = useSearchParams();
  const initialBrand = searchParams.get('brand') || '';
  const [filters, setFilters] = useState(initialBrand ? { brand: initialBrand } : {});
  const [sort, setSort] = useState('-createdAt');
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cars);

  const params = useMemo(() => ({ ...filters, sort }), [filters, sort]);

  useEffect(() => {
    dispatch(fetchCars(params));
  }, [dispatch, params]);

  return (
    <>
      <Helmet>
        <title>Inventory | Luxury on Wheels</title>
      </Helmet>
      <section className="container-pad py-12">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <SectionHeader eyebrow="Inventory" title="Curated luxury cars in Delhi." copy="Search, filter, and compare available and sold premium listings." />
          <label className="flex items-center gap-3 text-sm text-slate-300">
            <SlidersHorizontal size={18} className="text-purpleNeon" />
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="input-lux min-w-56">
              <option value="-createdAt">Newest first</option>
              <option value="price">Price low to high</option>
              <option value="-price">Price high to low</option>
              <option value="-year">Newest model year</option>
              <option value="kilometersDriven">Lowest km</option>
            </select>
          </label>
        </div>
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <FilterPanel filters={filters} setFilters={setFilters} />
          <CarGrid cars={items} loading={loading} />
        </div>
      </section>
    </>
  );
}
