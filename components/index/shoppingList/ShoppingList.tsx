import React, { useCallback, useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Keyboard,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Colors from '@/constants/Colors'
import type { Note } from '@/interfaces/ItemsInterfaces'
import { addNote, deleteNote, getNotes, updateNote } from '@/utils/NotesUtils'
import { moderateScale, verticalScale, scaleFont } from '@/utils/Responsive'
import NoteInput from './NoteInput'
import NoteRow from './NoteRow'

const { height } = Dimensions.get('window')

export default function ShoppingList() {
  const [show, setShow] = useState(false)
  const [notes, setNotes] = useState<Note[]>([])

  // Al montar traemos las notas guardadas en el celular.
  useEffect(() => {
    const fetchNotes = async () => {
      const stored = await getNotes()
      setNotes(stored)
    }
    fetchNotes()
  }, [])

  const handleAdd = useCallback((text: string) => {
    const note: Note = { id: `${Date.now()}`, text, done: false, quantity: 1 }
    setNotes((prev) => [...prev, note])
    addNote(note)
  }, [])

  // La pantalla se actualiza al instante y en la base se escribe solo la nota que cambió.
  const applyChange = useCallback((updated: Note) => {
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)))
    updateNote(updated)
  }, [])

  const handleToggle = useCallback((note: Note) => {
    applyChange({ ...note, done: !note.done })
  }, [applyChange])

  const handleQuantity = useCallback((note: Note, delta: number) => {
    applyChange({ ...note, quantity: Math.max(1, note.quantity + delta) })
  }, [applyChange])

  const handleDelete = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
    deleteNote(id)
  }, [])

  return (
    <View style={styles.container}>
      {show ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.title}>Lista de compras</Text>

            <NoteInput onAdd={handleAdd} />

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
                  <NoteRow
                    key={note.id}
                    note={note}
                    onToggle={handleToggle}
                    onChangeQuantity={handleQuantity}
                    onDelete={handleDelete}
                  />
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
  // En el flujo, no absolute: Android no entrega el gesto de scroll a una vista
  // que queda fuera de los límites de su padre, y el contenedor colapsaría a 0×0.
  panel: {
    marginTop: verticalScale(-4),
    marginRight: moderateScale(-4),
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
  closePanel: {
    position: 'absolute',
    top: -height,
    right: 0,
    width: 2000,
    height: height * 3,
    zIndex: 1,
  },
})
