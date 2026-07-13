export default function parseInputNumber (value: string) {
  const normalizedValue = value.trim().replace(',', '.')
  const parsedValue = Number(normalizedValue)
  return Number.isFinite(parsedValue) ? parsedValue : null
}