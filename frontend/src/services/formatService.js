export const formatearMoneda = (valor) => {
  const numero = Number(valor);

  if (Number.isNaN(numero)) {
    return "$ 0";
  }

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(numero);
};