import { useCallback, useMemo, useState } from 'react'
import { Calculator as CalculatorClass } from '@/utils/CalculatorUtils'

const DECIMAL_SEPARATOR = ','
const INTERNAL_DECIMAL = '.'

const toDisplayValue = (value: string) =>
  value.replaceAll(INTERNAL_DECIMAL, DECIMAL_SEPARATOR)

const normalizeInput = (value: string) =>
  value === DECIMAL_SEPARATOR ? INTERNAL_DECIMAL : value

export function useCalculator() {
  const [display, setDisplay] = useState('0')
  const [currentValue, setCurrentValue] = useState('')
  const [previousValue, setPreviousValue] = useState<string | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [justCalculated, setJustCalculated] = useState(false)

  const formatter = useCallback((value: number) => {
    if (!Number.isFinite(value)) return 'Error'
    const normalized = Number.isInteger(value) ? value : Number.parseFloat(value.toFixed(6))
    return normalized.toString()
  }, [])

  const updateDisplay = useCallback((value: string) => {
    if (value === '') {
      setDisplay('0')
      return
    }
    setDisplay(toDisplayValue(value))
  }, [])

  const handleError = useCallback((message: string, error?: unknown) => {
    console.warn(message, error)
    setDisplay('Error')
    setCurrentValue('')
    setPreviousValue(null)
    setOperator(null)
    setJustCalculated(true)
  }, [])

  const performOperation = useCallback((op: string, prev: number, current: number) => {
    const calculator = new CalculatorClass(prev, current)
    switch (op) {
      case '+':
        return calculator.sum()
      case '-':
        return calculator.subtract()
      case '*':
        return calculator.multiply()
      case '/':
        return calculator.divide()
      default:
        return current
    }
  }, [])

  const handleNumberPress = useCallback(
    (input: string) => {
      const normalized = normalizeInput(input)

      if (justCalculated && !operator) {
        setPreviousValue(null)
      }

      setCurrentValue(prevValue => {
        const shouldReset = (justCalculated && !operator) || display === 'Error'
        const safePrev = shouldReset ? '' : prevValue || ''

        if (normalized === INTERNAL_DECIMAL && safePrev.includes(INTERNAL_DECIMAL)) {
          setJustCalculated(false)
          return safePrev
        }

        let nextValue: string
        if (safePrev === '' && normalized === INTERNAL_DECIMAL) {
          nextValue = `0${INTERNAL_DECIMAL}`
        } else if (safePrev === '0' && normalized !== INTERNAL_DECIMAL) {
          nextValue = normalized
        } else {
          nextValue = safePrev + normalized
        }

        updateDisplay(nextValue)
        setJustCalculated(false)
        return nextValue
      })
    },
    [display, justCalculated, operator, updateDisplay]
  )

  const handleOperation = useCallback(
    (nextOperator: string) => {
      if (currentValue === '' && previousValue === null) return

      if (currentValue === '' && previousValue !== null) {
        setOperator(nextOperator)
        return
      }

      if (previousValue === null) {
        setPreviousValue(currentValue)
        setCurrentValue('')
        setOperator(nextOperator)
        setJustCalculated(false)
        updateDisplay(currentValue)
        return
      }

      if (operator && currentValue !== '') {
        try {
          const result = formatter(
            performOperation(operator, Number(previousValue), Number(currentValue))
          )
          if (result === 'Error') throw new Error('Operación inválida')
          setPreviousValue(result)
          setCurrentValue('')
          updateDisplay(result)
        } catch (error) {
          handleError('Error al calcular operación intermedia', error)
          return
        }
      }

      setOperator(nextOperator)
      setJustCalculated(false)
    },
    [
      currentValue,
      formatter,
      handleError,
      operator,
      performOperation,
      previousValue,
      updateDisplay,
    ]
  )

  const handleCalculate = useCallback(() => {
    if (operator && previousValue !== null && currentValue !== '') {
      try {
        const result = formatter(
          performOperation(operator, Number(previousValue), Number(currentValue))
        )
        if (result === 'Error') throw new Error('Operación inválida')
        updateDisplay(result)
        setPreviousValue(null)
        setCurrentValue(result)
        setOperator(null)
        setJustCalculated(true)
      } catch (error) {
        handleError('Error al calcular resultado final', error)
      }
    }
  }, [
    currentValue,
    formatter,
    handleError,
    operator,
    performOperation,
    previousValue,
    updateDisplay,
  ])
  //
  const handleClear = useCallback(() => {
    setCurrentValue('')
    setPreviousValue(null)
    setOperator(null)
    setJustCalculated(false)
    updateDisplay('0')
  }, [updateDisplay])

  const handleDelete = useCallback(() => {
    if (currentValue === '') return
    setCurrentValue(prev => {
      const nextValue = prev.slice(0, -1)
      updateDisplay(nextValue)
      return nextValue
    })
  }, [currentValue, updateDisplay])

  const handlePercentage = useCallback(() => {
    const hasPreviousValue = previousValue !== null
    if (currentValue === '' && hasPreviousValue === false) {
      return
    }

    const base = hasPreviousValue ? Number(previousValue) : 0
    const current = currentValue === '' ? base : Number(currentValue)
    const result = hasPreviousValue ? base * (current / 100) : current / 100

    const formatted = formatter(result)
    setCurrentValue(formatted)
    updateDisplay(formatted)
    setJustCalculated(false)
  }, [currentValue, formatter, previousValue, updateDisplay])

  const expression = useMemo(() => {
    if (display === 'Error') return ''

    if (justCalculated && !operator && previousValue === null && currentValue !== '') {
      return `= ${toDisplayValue(currentValue)}`
    }

    const parts: string[] = []
    if (previousValue !== null) parts.push(toDisplayValue(previousValue))
    if (operator) parts.push(operator)
    if (currentValue && !(justCalculated && !operator)) {
      parts.push(toDisplayValue(currentValue))
    }
    return parts.join(' ')
  }, [currentValue, display, justCalculated, operator, previousValue])

  return {
    display,
    expression,
    handleCalculate,
    handleClear,
    handleDelete,
    handleNumberPress,
    handleOperation,
    handlePercentage,
  }
}

export const DECIMAL_BUTTON = DECIMAL_SEPARATOR

