export default function formatPrice(price) {
  if (!price) return;
  const formattedPrice = String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${formattedPrice} Ft`;
}
