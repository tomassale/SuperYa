import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { moderateScale, verticalScale, scaleFont } from '@/utils/Responsive'

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
    minHeight: verticalScale(96),
    backgroundColor: '#B5B5B5',
    borderRadius: 12,
    paddingHorizontal: moderateScale(14),
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(12),
    justifyContent: 'center',
  },
  expression: {
    color: '#101010',
    fontSize: scaleFont(16),
    textAlign: 'right',
  },
  value: {
    color: '#202020',
    fontSize: scaleFont(42),
    fontWeight: '700',
    textAlign: 'right',
  },
})

