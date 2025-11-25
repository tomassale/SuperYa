import React, { useMemo, useState } from 'react';
import { View, Pressable, StyleSheet, Image, Dimensions } from 'react-native';
import CalculatorButtons from './CalculatorButtons';
import CalculatorDisplay from './CalculatorDisplay';
import { DECIMAL_BUTTON, useCalculator } from '@/hooks/useCalculator';

const { height, width } = Dimensions.get('window');

export default function Calculator(){
  const [hidden, setHidden] = useState(true);
  const {
    display,
    expression,
    handleCalculate,
    handleClear,
    handleDelete,
    handleNumberPress,
    handleOperation,
    handlePercentage,
  } = useCalculator()

  const buttons = useMemo(() => [
    { id: 0, text: 'C', function: handleClear, styleText: 'clearText' },
    { id: 1, text: '←', function: handleDelete, styleText: 'deleteText' },
    { id: 2, text: '%', function: handlePercentage },
    { id: 3, text: '/', function: () => handleOperation('/') },
    { id: 4, text: '7', function: () => handleNumberPress('7') },
    { id: 5, text: '8', function: () => handleNumberPress('8') },
    { id: 6, text: '9', function: () => handleNumberPress('9') },
    { id: 7, text: '*', function: () => handleOperation('*') },
    { id: 8, text: '4', function: () => handleNumberPress('4') },
    { id: 9, text: '5', function: () => handleNumberPress('5') },
    { id: 10, text: '6', function: () => handleNumberPress('6') },
    { id: 11, text: '-', function: () => handleOperation('-') },
    { id: 12, text: '1', function: () => handleNumberPress('1') },
    { id: 13, text: '2', function: () => handleNumberPress('2') },
    { id: 14, text: '3', function: () => handleNumberPress('3') },
    { id: 15, text: '+', function: () => handleOperation('+') },
    { id: 16, text: DECIMAL_BUTTON, function: () => handleNumberPress(DECIMAL_BUTTON) },
    { id: 17, text: '0', function: () => handleNumberPress('0') },
    { id: 18, text: '=', function: handleCalculate, styleObj: 'equalsButton'}
  ], [
    handleCalculate,
    handleClear,
    handleDelete,
    handleNumberPress,
    handleOperation,
    handlePercentage,
  ])

  return (
    <View style={styles.container}>
    {hidden? (
      <Pressable onPress={()=>setHidden(false)}>
        <Image style={styles.image} source={require('@/assets/img/Calculator.png')}/>
      </Pressable>
    ):(
      <>
        <View style={styles.calculator}>
          <CalculatorDisplay expression={expression} value={display} />
          <CalculatorButtons data={buttons}/>
        </View>
        <Pressable style={styles.closeCalculator} onPress={() => setHidden(true)}/>
      </>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    bottom: 125,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  image:{
    width: 64,
    height: 84
  },
  calculator:{
    backgroundColor: '#979797',
    width: 258,
    height: 450,
    borderRadius: 16,
    position: 'absolute',
    bottom: -60,
    left: 0,
    zIndex: 2,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  closeCalculator:{
    position: 'absolute',
    top: -height + 96,
    left: -44,
    flex: 1,
    width: width,
    height: height + 90,
    backgroundColor: 'rgba(0,0,0,0.25)',
    zIndex: 1
  },
  display: {
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
    color:'#101010',
    fontSize: 16,
    textAlign: 'right',
  },
  current: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '700',
    textAlign: 'right',
  },
});