import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions, Pressable, Animated } from 'react-native'
import { getData } from '@/utils/HistoryUtils'
import HistoryItem from './HistoryItem';
import { moderateScale, verticalScale } from '@/utils/Responsive';

const { height, width } = Dimensions.get('window');

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function History() {
  const [data, setData] = useState<any[]>([])
  // `visible` mantiene el panel montado; se apaga recién cuando termina el cierre.
  const [visible, setVisible] = useState(false)
  // 0 = cerrado (panel fuera de pantalla a la izquierda) · 1 = abierto.
  const anim = useRef(new Animated.Value(0)).current

  useEffect(()=>{
    const fetchData = async () => {
      const dataHistory = await getData()
      setData(dataHistory ?? [])
    }
    fetchData()
  },[])

  const openMenu = () => {
    setVisible(true)
    Animated.timing(anim, {
      toValue: 1,
      duration: 260,
      useNativeDriver: true,
    }).start()
  }

  const closeMenu = () => {
    Animated.timing(anim, {
      toValue: 0,
      duration: 260,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setVisible(false)
    })
  }

  // El panel entra desde el borde izquierdo hacia su posición final.
  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, 0],
  })

  return(
    <View style={styles.container}>
      {visible?(
        <>
          <Animated.View style={[styles.menu, { transform: [{ translateX }] }]}>
              <HistoryItem data={data} />
          </Animated.View>
          <AnimatedPressable style={[styles.closeMenu, { opacity: anim }]} onPress={closeMenu}/>
        </>
      ):(
        <TouchableOpacity onPress={openMenu}>
          <Image style={styles.logoMenu} source={require('@/assets/img/Menu.png')}/>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    marginTop: verticalScale(-160),
    marginLeft: moderateScale(-20),
  },
  logoMenu: {
    height: moderateScale(60),
    width: moderateScale(70)
  },
  menu: {
    height: height + 110,
    width: moderateScale(263),
    marginTop: verticalScale(-61),
    marginLeft: moderateScale(-25),
    paddingTop: verticalScale(40),
    paddingLeft: moderateScale(35),
    backgroundColor: 'white',
  },
  closeMenu: {
    position: 'absolute',
    right: -147,
    top: -61,
    height: '107%',
    width: '62%',
    marginLeft: width,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
})