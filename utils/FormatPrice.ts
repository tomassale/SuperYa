// Crear un Intl.NumberFormat es caro: se comparten en vez de usar toLocaleString por fila.
const fixedFormatter = new Intl.NumberFormat('es-AR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const compactFormatter = new Intl.NumberFormat('es-AR', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export const formatPrice = (value: number) => fixedFormatter.format(value)

export const formatPriceCompact = (value: number) => compactFormatter.format(value)
