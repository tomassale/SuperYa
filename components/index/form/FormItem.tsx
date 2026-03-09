import { Text, View, StyleSheet, TextInput } from 'react-native';
import FontSize from '@/constants/Hierarchies';
import Colors from '@/constants/Colors';

interface Input {
  id: number
  label: string
  placeholder: string
  keyboardType: string
  name: string
  setData: (val: string) => void
}

export default function FormItem({data}: Readonly<{data: Input[]}>) {
  
  return (
    <>
      {data.map((obj: any) => (
        <View key={obj.id}>
          <Text style={styles.label}>{obj.label}</Text>
          <TextInput
            style={styles.input}
            placeholder={obj.placeholder}
            placeholderTextColor='#807D77'
            value={obj.name}
            keyboardType={obj.keyboardType}
            onChangeText={obj.setData}
          />
        </View>
    ))}
    </>
  )
}

const styles = StyleSheet.create({
  label:{
    marginLeft: 30,
    fontSize: FontSize.label,
    alignSelf: 'flex-start'
  },
  input:{
    backgroundColor: Colors.input,
    width: 300,
    margin: 10,
    fontSize: FontSize.input,
    paddingHorizontal: 10,
    borderRadius: 8
  },
});

