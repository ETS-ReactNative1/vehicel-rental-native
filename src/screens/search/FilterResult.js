import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function FilterResult() {
  return (
      <>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
      <View style={styles.backBtn}>
      <Image source={require('../../assets/back-arrow.png')} style={styles.backBtnImg}/>
      <Text style={styles.backBtnTxt}>Back</Text>
      </View>
    </TouchableOpacity>
    <View>
      <Text>FilterResult</Text>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    backBtn:{
      flexDirection: 'row',
      backgroundColor: 'white',
      paddingTop : 20,
      marginLeft : 20,
    color: 'black',

    },
    backBtnImg:{
      width : 40,
      height : 40,
    },
    backBtnTxt:{
      color : 'black',
      fontWeight : 'bold',
      fontSize : 20,
      lineHeight : 37,
    },
    bg:{
      backgroundColor : 'white',
    color: 'black',

    },
})