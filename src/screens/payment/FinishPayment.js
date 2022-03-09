import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

export default function FinishPayment({navigation, route}) {
  const {body, paymentBody, payType} = route.params;
  const a = paymentBody.date.toDateString();
  return (
    <>
    <View style={styles.bg}>
    {/* <ScrollView> */}
      <View>
      <Image source={require('../../assets/thirdstep.png')} style={styles.step} />
      </View>
      <View>
        <Text>Payment Code:</Text>
        <Text>90887620</Text>
        <Text>Insert your payment code while you transfer booking order
        Pay before : 
        </Text>
        <Text style={styles.statusTime}>1:59:34</Text>
        <Text>Bank account information :</Text>
        <Text>0290-90203-345-2</Text>
        <Text>Vespa Rental Jogja</Text>
      </View>

      <View>
        <Text style={styles.info}>Booking code : 
        <Text style={styles.status}>(VSP09875)</Text>
        </Text>
        <Text>Use booking code to pick up your vespa</Text>

      <TouchableOpacity style={styles.FinPay} onPress={() => navigation.navigate('/')}>
        <Text style={styles.FinPayBtn}>Copy Payment & Booking Code</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.desc}>
      <Text style={styles.info}>{paymentBody.bikes} Vespa</Text>
        <Text style={styles.info}>{payType.paymentType}</Text>
        <Text style={styles.info}>{paymentBody.day} days</Text>
        <Text style={styles.info}> {a}to Jan 22 2021</Text>
      <Text style={styles.price}>Rp. {paymentBody.price}</Text>
      </View>

    {/* </ScrollView> */}
    <TouchableOpacity style={styles.btnGetPay} onPress={() => navigation.navigate('Success')}>
        <Text style={styles.payBtn}>Finish Payment</Text>
      </TouchableOpacity>
    </View>
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
    marginLeft : '13%',
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
statusTime:{
  fontWeight: 'bold',
  fontSize : 16,
  marginBottom: 5,
  color: 'red',
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
btnGetPay: {
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
payBtn: {
  color: '#000000',
  fontWeight: 'bold',
  fontSize: 17,
  lineHeight: 35,
},
})