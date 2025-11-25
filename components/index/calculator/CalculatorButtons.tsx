import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'

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
    gap: 8,
    marginStart: 7
  },
  button: {
    backgroundColor: '#D9D9D9',
    padding: 7,
    minWidth: 50,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  clearText: {
    color: 'red', 
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  deleteText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -10
  },
  equalsButton: {
    backgroundColor: '#D9D9D9',
    padding: 7,
    width: 107,
  },
})