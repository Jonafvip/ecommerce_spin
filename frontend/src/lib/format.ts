export function formatCurrency(value: string | number): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return `$${Math.round(num || 0).toLocaleString("es-ES")}`;
}
