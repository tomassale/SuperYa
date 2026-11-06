import React, { useState } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native'
import Colors from '@/constants/Colors'
import { moderateScale, verticalScale, scaleFont } from '@/utils/Responsive'

type NoteInputProps = {
  readonly onAdd: (text: string) => void
}

// El texto vive acá para que escribir no re-renderice la lista.
export default function NoteInput({ onAdd }: NoteInputProps) {
  const [text, setText] = useState('')

  const handleAdd = () => {
    const value = text.trim()
    if (!value) return
    onAdd(value)
    setText('')
  }

  return (
    <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAdd}
        placeholder="Agregar..."
        placeholderTextColor="#8a8a8a"
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Image style={styles.addIcon} source={require('@/assets/img/Plus.png')} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  input: {
    flex: 1,
    height: verticalScale(48),
    backgroundColor: Colors.input,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    fontSize: scaleFont(21),
    fontWeight: '700',
    color: '#333',
  },
  addButton: {
    marginLeft: moderateScale(8),
    height: verticalScale(48),
    width: verticalScale(48),
    borderRadius: moderateScale(10),
    backgroundColor: Colors.botones,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    height: moderateScale(24),
    width: moderateScale(24),
  },
})
