import { Dimensions, PixelRatio } from 'react-native'

const { width, height } = Dimensions.get('window')

// Guideline basada en un iPhone X (diseño de referencia en portrait)
const GUIDELINE_BASE_WIDTH = 375
const GUIDELINE_BASE_HEIGHT = 812

// Usamos lado corto / largo para que el escalado sea estable e independiente
// de la orientación con la que se lea la dimensión.
const shortDimension = Math.min(width, height)
const longDimension = Math.max(width, height)

/**
 * Escala un tamaño en función del ancho de la pantalla.
 * Ideal para anchos, paddings y márgenes horizontales.
 */
export const scale = (size: number): number =>
  (shortDimension / GUIDELINE_BASE_WIDTH) * size

/**
 * Escala un tamaño en función del alto de la pantalla.
 * Ideal para altos y márgenes verticales.
 */
export const verticalScale = (size: number): number =>
  (longDimension / GUIDELINE_BASE_HEIGHT) * size

/**
 * Escala moderada: aplica el escalado de ancho pero amortiguado por `factor`,
 * evitando que en tablets los elementos crezcan de forma exagerada.
 */
export const moderateScale = (size: number, factor = 0.5): number =>
  size + (scale(size) - size) * factor

/**
 * Escala tipografías con amortiguación y redondeo a píxel de dispositivo.
 */
export const scaleFont = (size: number): number => {
  const newSize = moderateScale(size, 0.3)
  return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

/** Ancho relativo al lado corto de la pantalla (0-100 %). */
export const wp = (percentage: number): number =>
  (shortDimension * percentage) / 100

/** Alto relativo al lado largo de la pantalla (0-100 %). */
export const hp = (percentage: number): number =>
  (longDimension * percentage) / 100

export const screenWidth = width
export const screenHeight = height
