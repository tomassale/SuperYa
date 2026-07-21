import { Text, View, StyleSheet, TextInput } from 'react-native';
import FontSize from '@/constants/Hierarchies';
import Colors from '@/constants/Colors';
import { moderateScale, verticalScale, wp } from '@/utils/Responsive';

interface Input {
  id: number
  label: string
  placeholder: string
  keyboardType: string
  name: string
  setData: (val: string) => void
  error?: boolean
}

export default function FormItem({data}: Readonly<{data: Input[]}>) {
  
  return (
    <>
      {data.map((obj: any) => (
        <View key={obj.id}>
          <Text style={styles.label}>{obj.label}</Text>
          <TextInput
            style={[styles.input, obj.error && styles.inputError]}
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
    marginLeft: moderateScale(30),
    fontSize: FontSize.label,
    fontWeight: '700',
    color: '#333',
    alignSelf: 'flex-start'
  },
  input:{
    backgroundColor: Colors.input,
    width: wp(80),
    maxWidth: 340,
    margin: moderateScale(10),
    fontSize: FontSize.input,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(9),
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent'
  },
  inputError:{
    borderColor: 'red',
    borderWidth: 1,
  },
});

