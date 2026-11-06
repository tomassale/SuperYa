import React, { memo } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import Colors from '@/constants/Colors'
import type { Note } from '@/interfaces/ItemsInterfaces'
import { moderateScale, verticalScale, scaleFont } from '@/utils/Responsive'

type NoteRowProps = {
  readonly note: Note
  readonly onToggle: (note: Note) => void
  readonly onChangeQuantity: (note: Note, delta: number) => void
  readonly onDelete: (id: string) => void
}

function NoteRow({ note, onToggle, onChangeQuantity, onDelete }: NoteRowProps) {
  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.itemTextWrapper} onPress={() => onToggle(note)}>
        <View style={[styles.checkbox, note.done && styles.checkboxDone]}>
          {note.done && (
            <Ionicons name="checkmark-sharp" size={moderateScale(20)} color="white" />
          )}
        </View>
        <Text style={[styles.itemText, note.done && styles.itemTextDone]}>
          {note.text}
        </Text>
      </TouchableOpacity>
      <View style={styles.counter}>
        <TouchableOpacity style={styles.counterButton} onPress={() => onChangeQuantity(note, -1)}>
          <Image style={styles.counterIcon} source={require('@/assets/img/Minus.png')} />
        </TouchableOpacity>
        <Text style={styles.counterValue}>{note.quantity}</Text>
        <TouchableOpacity style={styles.counterButton} onPress={() => onChangeQuantity(note, 1)}>
          <Image style={styles.counterIcon} source={require('@/assets/img/Plus.png')} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => onDelete(note.id)}>
        <Image style={styles.trashIcon} source={require('@/assets/img/Trash.png')} />
      </TouchableOpacity>
    </View>
  )
}

export default memo(NoteRow)

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(8),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: moderateScale(6),
  },
  checkbox: {
    height: moderateScale(28),
    width: moderateScale(28),
    borderRadius: moderateScale(6),
    borderWidth: 3,
    borderColor: Colors.botones,
    marginRight: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxDone: {
    backgroundColor: Colors.finalizado,
    borderColor: Colors.finalizado,
  },
  itemText: {
    flex: 1,
    fontSize: scaleFont(22),
    fontWeight: '700',
    color: '#333',
  },
  itemTextDone: {
    textDecorationLine: 'line-through',
    color: '#9a9a9a',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: moderateScale(8),
  },
  counterButton: {
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(8),
    backgroundColor: Colors.input,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterIcon: {
    height: moderateScale(16),
    width: moderateScale(16),
  },
  counterValue: {
    minWidth: moderateScale(26),
    textAlign: 'center',
    fontSize: scaleFont(20),
    fontWeight: '800',
    color: '#333',
    marginHorizontal: moderateScale(4),
  },
  trashIcon: {
    height: moderateScale(26),
    width: moderateScale(26),
  },
})
