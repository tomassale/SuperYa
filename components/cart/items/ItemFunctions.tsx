import { StyleSheet, View, Image, Pressable } from 'react-native'
import React, { memo, useMemo } from 'react'
import { useSetCartItems } from '@/context/CartContext'
import ItemUtils from '@/utils/ItemUtils'
import { moderateScale, verticalScale } from '@/utils/Responsive'

const MinusIcon = require('@/assets/img/Minus.png')
const PlusIcon = require('@/assets/img/Plus.png')
const TrashIcon = require('@/assets/img/Trash.png')

function ItemFunctions({ itemId }: {itemId: number}) {

  const setCartItems = useSetCartItems()

  // La instancia y el listado dependen solo del item; no hace falta recrearlos en cada render.
  const functions = useMemo(() => {
    const utils = new ItemUtils(setCartItems, itemId)
    return [
      { id: 1, function: utils.restar, img: MinusIcon },
      { id: 2, function: utils.sumar, img: PlusIcon },
      { id: 3, function: utils.borrar, img: TrashIcon },
    ]
  }, [setCartItems, itemId])

  return (
    <View style={styles.container}>
      {functions.map(obj => (
        <Pressable key={obj.id} onPress={obj.function} hitSlop={15}>
          <Image source={obj.img} style={styles.image}/>
        </Pressable>
      ))}
    </View>
  )
}

export default memo(ItemFunctions)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: moderateScale(16),
    height: verticalScale(50),
    alignItems: 'center',
    marginHorizontal: moderateScale(10),
  },
  image:{
    height: moderateScale(20),
    width: moderateScale(20)
  }
})