import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  Dimensions,
  Keyboard,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Colors from '@/constants/Colors'
import { getNotes, saveNotes, Note } from '@/utils/NotesUtils'
import { moderateScale, verticalScale, scaleFont } from '@/utils/Responsive'

const { height } = Dimensions.get('window')

export default function ShoppingList() {
  const [show, setShow] = useState(false)
  const [notes, setNotes] = useState<Note[]>([])
  const [text, setText] = useState('')

  // Al montar traemos las notas guardadas en el celular.
  useEffect(() => {
    const fetchNotes = async () => {
      const stored = await getNotes()
      setNotes(stored)
    }
    fetchNotes()
  }, [])

  // Cada vez que cambian las notas las persistimos.
  const persist = (next: Note[]) => {
    setNotes(next)
    saveNotes(next)
  }

  const handleAdd = () => {
    const value = text.trim()
    if (!value) return
    const note: Note = { id: `${Date.now()}`, text: value, done: false, quantity: 1 }
    persist([...notes, note])
    setText('')
  }

  const handleToggle = (id: string) => {
    persist(notes.map((n) => (n.id === id ? { ...n, done: !n.done } : n)))
  }

  const handleQuantity = (id: string, delta: number) => {
    persist(
      notes.map((n) =>
        n.id === id ? { ...n, quantity: Math.max(1, (n.quantity ?? 1) + delta) } : n
      )
    )
  }

  const handleDelete = (id: string) => {
    persist(notes.filter((n) => n.id !== id))
  }

  return (
    <View style={styles.container}>
      {show ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.title}>Lista de compras</Text>

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

            <KeyboardAwareScrollView
              style={styles.list}
              enableOnAndroid={true}
              extraScrollHeight={40}
              keyboardShouldPersistTaps="handled"
            >
              {notes.length === 0 ? (
                <Text style={styles.empty}>No hay nada anotado todavía.</Text>
              ) : (
                notes.map((note) => (
                  <View key={note.id} style={styles.item}>
                    <TouchableOpacity
                      style={styles.itemTextWrapper}
                      onPress={() => handleToggle(note.id)}
                    >
                      <View style={[styles.checkbox, note.done && styles.checkboxDone]}>
                        {note.done && (
                          <Image
                            style={styles.checkIcon}
                            source={require('@/assets/img/Check-circle.png')}
                          />
                        )}
                      </View>
                      <Text style={[styles.itemText, note.done && styles.itemTextDone]}>
                        {note.text}
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.counter}>
                      <TouchableOpacity
                        style={styles.counterButton}
                        onPress={() => handleQuantity(note.id, -1)}
                      >
                        <Image
                          style={styles.counterIcon}
                          source={require('@/assets/img/Minus.png')}
                        />
                      </TouchableOpacity>
                      <Text style={styles.counterValue}>{note.quantity ?? 1}</Text>
                      <TouchableOpacity
                        style={styles.counterButton}
                        onPress={() => handleQuantity(note.id, 1)}
                      >
                        <Image
                          style={styles.counterIcon}
                          source={require('@/assets/img/Plus.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => handleDelete(note.id)}>
                      <Image style={styles.trashIcon} source={require('@/assets/img/Trash.png')} />
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </KeyboardAwareScrollView>
          </View>

          <Pressable
            style={styles.closePanel}
            onPress={() => {
              Keyboard.dismiss()
              setShow(false)
            }}
          />
        </>
      ) : (
        <TouchableOpacity style={styles.noteButton} onPress={() => setShow(true)}>
          <View style={styles.noteLinesWrapper}>
            <View style={[styles.noteLine, { width: '80%' }]} />
            <View style={[styles.noteLine, { width: '60%' }]} />
            <View style={[styles.noteLine, { width: '70%' }]} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: moderateScale(-4),
  },
  noteButton: {
    height: moderateScale(58),
    width: moderateScale(58),
    borderRadius: moderateScale(12),
    backgroundColor: Colors.titulo,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00000022',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  noteLinesWrapper: {
    width: '60%',
    alignItems: 'flex-start',
  },
  noteLine: {
    height: moderateScale(4),
    borderRadius: 2,
    backgroundColor: '#4d5236',
    marginVertical: verticalScale(3),
  },
  panel: {
    position: 'absolute',
    top: verticalScale(-4),
    right: moderateScale(-4),
    width: moderateScale(320),
    maxHeight: height * 0.6,
    backgroundColor: 'white',
    borderRadius: moderateScale(14),
    paddingHorizontal: moderateScale(14),
    paddingTop: verticalScale(14),
    paddingBottom: verticalScale(14),
    zIndex: 2,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: scaleFont(26),
    fontWeight: '800',
    color: '#333',
    marginBottom: verticalScale(10),
  },
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
  list: {
    flexGrow: 0,
  },
  empty: {
    fontSize: scaleFont(19),
    fontWeight: '700',
    color: '#8a8a8a',
    textAlign: 'center',
    paddingVertical: verticalScale(16),
  },
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
  checkIcon: {
    height: moderateScale(20),
    width: moderateScale(20),
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
  closePanel: {
    position: 'absolute',
    top: -height,
    right: 0,
    width: 2000,
    height: height * 3,
    zIndex: 1,
  },
})
