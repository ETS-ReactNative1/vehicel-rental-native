import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ActiveChat() {
  return (
    <>
    <View style={style.chatWrapper}>
      <View style={style.chatWrapperRight}>
        <Text style={style.title}>Vespa Rental Jogja</Text>
          <Text style={style.content}>Hey, there are 3 vespa left</Text>
        </View>
        <View style={style.chatWrapperLeft}>
          <Text style={style.timeStamp}>Just Now</Text>
          <Text style={style.notif}>1</Text>
        </View>
    </View>
    </>
  )
}

const style = StyleSheet.create({
    title:{
      fontSize : 18,
      fontWeight : 'bold',
      color : 'black',
      marginBottom : 5,
    },
    content :{
        fontSize : 16,
        fontWeight : 'bold',
        color : 'black',
    },
    chatWrapper:{
      flexDirection : 'row',
      borderBottomWidth : 0.5,
      borderBottomColor: '#DADADA',
      height : 100,
      marginBottom : 20,
    },
    chatWrapperRight:{
      margin : 20,
    },
    chatWrapperLeft:{
      marginTop : 20,
      marginLeft : 60,
    },
    timeStamp:{
      marginBottom : 5,
    },
    notif:{
      marginTop: 5,
      marginLeft: 25,
      fontSize : 17,
    fontWeight : '900',
    backgroundColor : '#FFCD61',
    borderRadius : 12,
    width : 25,
    height : 25,
    paddingLeft : 8,
    }
})