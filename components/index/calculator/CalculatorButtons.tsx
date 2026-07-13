import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { moderateScale, scaleFont } from '@/utils/Responsive'

export default function CalculatorButtons({data}: any){

  return(
    <View style={styles.buttonContainer}>
      {data.map((obj: any) => (
        <TouchableOpacity key={obj.id} style={obj.styleObj ? (styles as any)[obj.styleObj] : styles.button} onPress={obj.function}>
          <Text style={obj.styleText? (styles as any)[obj.styleText] : styles.buttonText}>{obj.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(8),
    marginStart: moderateScale(7)
  },
  button: {
    backgroundColor: '#D9D9D9',
    padding: moderateScale(7),
    minWidth: moderateScale(50),
  },
  buttonText: {
    fontSize: scaleFont(25),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  clearText: {
    color: 'red',
    fontSize: scaleFont(25),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  deleteText: {
    fontSize: scaleFont(30),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -10
  },
  equalsButton: {
    backgroundColor: '#D9D9D9',
    padding: moderateScale(7),
    width: moderateScale(107),
  },
})