import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

type CalculatorDisplayProps = {
  readonly expression: string
  readonly value: string
}

export default function CalculatorDisplay({ expression, value }: CalculatorDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.expression} numberOfLines={1} adjustsFontSizeToFit>
        {expression || ' '}
      </Text>
      <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>
        {value || '0'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 96,
    backgroundColor: '#B5B5B5',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    justifyContent: 'center',
  },
  expression: {
    color: '#101010',
    fontSize: 16,
    textAlign: 'right',
  },
  value: {
    color: '#202020',
    fontSize: 42,
    fontWeight: '700',
    textAlign: 'right',
  },
})

