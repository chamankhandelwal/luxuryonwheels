export const formatPrice = (price) => {
  if (!price && price !== 0) return 'Price on request';
  if (price >= 10000000) return `Rs ${(price / 10000000).toFixed(price % 10000000 ? 2 : 0)} Cr`;
  return `Rs ${(price / 100000).toFixed(price % 100000 ? 1 : 0)} L`;
};

export const formatKm = (km) => `${Number(km || 0).toLocaleString('en-IN')} km`;

export const titleCase = (value = '') => value.charAt(0).toUpperCase() + value.slice(1);
