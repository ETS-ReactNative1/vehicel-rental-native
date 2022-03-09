import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function DetailsCategory() {
  return (
    <View>
      <Text>DetailsCategory</Text>
      
      <View>
        <View>
          <Image style={style.imageWrapper} source={require('../assets/detailbg.png')}/>    
        </View>
        <View>
        <Text style={style.title}>Vespa Matic</Text>
        <Text style={style.titleNd}>Jan 18 to 21 2021</Text>
        <Text style={style.title}>Prepayment : Rp. 245.000</Text>
        <Text style={style.titleRd}>Has been returned</Text>
        </View>
        </View>
    </View>
  )
}


const style = StyleSheet.create({
    imageWrapper:{
      borderRadius : 30,
      width: 150,
      height : 150,
    },
    title:{
      fontSize : 16,
      fontWeight: 'bold',
    },
    titleNd:{
      fontSize : 16,
    },
    titleRd:{
      fontSize : 16,
      color : '#087E0D',
    },
    Checkbox:{
      width : 40,
      height : 40,
    }
  })