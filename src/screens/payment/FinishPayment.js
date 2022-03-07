import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function FinishPayment() {
  return (
    <View style={styles.bg}>
      <View>
      <Image source={require('../../assets/thirdstep.png')} style={styles.step}/>
      </View>
      <View>
        <Text>Payment Code:</Text>
        <Text>90887620</Text>
        <Text>Insert your payment code while you transfer booking order
        Pay before : 
        </Text>
        <Text>1:59:34</Text>
        <Text>Bank account information :</Text>
        <Text>0290-90203-345-2</Text>
        <Text>Vespa Rental Jogja</Text>
      </View>
      <View>
        <Text style={styles.info}>Booking code :<Text style={styles.status}>(VSP09875)</Text></Text>
        <Text>Use booking code to pick up your vespa</Text>
      <TouchableOpacity style={styles.FinPay} onPress={() => navigation.navigate('/')}>
        <Text style={styles.FinPayBtn}>Copy Payment & Booking Code</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.desc}>
          <Text style={styles.info}>2 Vespa</Text>
          <Text style={styles.info}>Prepayement (no tax)</Text>
          <Text style={styles.info}>4 days</Text>
          <Text style={styles.info}>Jan 18 2021 to Jan 22 2021</Text>
      </View>
      <Text style={styles.price}>Total : 245.000</Text>
    </View>
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
  info:{
    fontSize : 16,
    marginBottom: 5,
},
status:{
    fontSize : 16,
    marginBottom: 5,
    color: '#087E0D',
},
FinPay: {
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
FinPayBtn: {
  color: '#000000',
  fontWeight: 'bold',
  fontSize: 17,
  lineHeight: 35,
},
desc :{
  paddingLeft : 20,
 },
 info:{
     fontSize : 16,
     marginBottom: 5,
 },
 price: {
  color: '#000000',
  fontWeight: 'bold',
  fontSize: 17,
  lineHeight: 35,
},
})