import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions, Pressable } from 'react-native'
import { getData } from '@/utils/HistoryUtils'
import HistoryItem from './HistoryItem';

const { height, width } = Dimensions.get('window');

export default function History() {
  const [data, setData] = useState<any[]>([])
  const [show, setShow] = useState(false)

  useEffect(()=>{
    const fetchData = async () => {
      const dataHistory = await getData()
      setData(dataHistory)
    }
    fetchData()
  },[])

  return(
    <View style={styles.container}>
      {show?( 
        <>
          <View style={styles.menu}>
              <HistoryItem data={data} />
          </View>
          <Pressable style={styles.closeMenu} onPress={() => setShow(false)}/>
        </>     
      ):(
        <TouchableOpacity onPress={() => setShow(true)}>
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
    marginTop: -160,
    marginLeft: -20,
  },
  logoMenu: {
    height: 60,
    width: 70
  },
  menu: {
    height: height + 110,
    width: 263,
    marginTop: -61,
    marginLeft: -25,
    paddingTop: 40,
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