import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Success({navigation, route}) {
  const {body, paymentBody, payType} = route.params;
  const a = paymentBody.date.toDateString();
  return (
    <>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
      <Text>Back</Text>
    </TouchableOpacity>
    <ScrollView style={styles.bg}>
        <Text style={styles.success}>Payment Success!</Text>
      {/* </View> */}
      <View>
      <Image source={require('../../assets/detailbg.png')} style={styles.pic}/>
      </View>

      <View style={styles.desc}>
      <Text style={styles.info}>{paymentBody.bikes} Vespa</Text>
        <Text style={styles.info}>{payType.paymentType}</Text>
        <Text style={styles.info}>{paymentBody.day} days</Text>
        <Text style={styles.info}>{a} to Jan 22 2021</Text>
      </View>

      <View style={styles.desc}>
          <Text style={styles.info}>ID : 9087627392624</Text>
          <Text style={styles.info}>{body.name} ({body.email})</Text>
          <Text style={styles.info}>{body.phone !== null ? body.phone : " -- "}<Text style={styles.status}>(active)</Text></Text>
          <Text style={styles.info}>Jakarta, Indonesia</Text>
      </View>

      <TouchableOpacity style={styles.btnPrice} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.priceBtn}>Total : Rp. {paymentBody.price}</Text>
      </TouchableOpacity>
    </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
    bg:{
      backgroundColor : 'white',
    },
    step:{
      width : 300,
      height : 100,
      marginTop : '10%',
      marginLeft : '5%',
    },
    pic:{
        width : 380,
        height : 200,
        marginLeft : '4%',
        marginBottom : 20,
        borderRadius : 20,
    },
    success:{
        fontSize : 32,
        fontWeight : 'bold',
        // width: 150,
        color: '#087E0D',
        margin : 30,
    },
    desc :{
     paddingLeft : 20,
    },
    info:{
        fontSize : 16,
        marginBottom: 5,
        color:'black',
    },
    status:{
        fontSize : 16,
        marginBottom: 5,
        color: '#087E0D',
    },
    btnPrice: {
        alignItems: 'center',
        backgroundColor: '#FFCD61',
        padding: 10,
        borderRadius: 15,
        height: 60,
        textAlign: 'center',
        width : '80%',
        marginLeft: '8%',
        marginTop : 30,
        // marginBottom: 60,
      },
      priceBtn: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 17,
        lineHeight: 35,
      },
})