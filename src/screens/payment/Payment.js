import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
// import SelectDropdown from 'react-native-select-dropdown';


export default function Payment({navigation}) {
  return (
    <ScrollView style={styles.bg}>
      <View>
      <Image source={require('../../assets/firststep.png')} style={styles.step}/>
      </View>
      <View>
        <TextInput
         style={styles.inputNameProduct}
          placeholder="ID Card Number"
        />
      </View>  
      <View>
        <TextInput
         style={styles.inputNameProduct}
          placeholder="Name"
        />
      </View>  
      <View>
        <TextInput
         style={styles.inputNameProduct}
          placeholder="Last Name"
        />
      </View>  
      <View>
        <TextInput
         style={styles.inputNameProduct}
          placeholder="Mobile phone"
        />
      </View>  
      <View>
        <TextInput
         style={styles.inputNameProduct}
          placeholder="Email Address"
        />
      </View> 
      <View>
        <TextInput
         style={styles.inputNameProduct}
          placeholder="Location"
        />
      </View>  
      <View>
        {/* dropdown */}
      </View>  
      <TouchableOpacity style={styles.btnOrder} onPress={() => navigation.navigate('GetPayment')}>
        <Text style={styles.orderBtn}>See Order Details</Text>
      </TouchableOpacity> 
    </ScrollView>
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
  inputNameProduct:{
    border: 0,
    backgroundColor : '#DFDEDE',
    borderRadius : 10,
    paddingLeft : 20,
    marginBottom : 20,
    width : '80%',
    marginLeft : '10%',
    fontSize: 17,
    fontWeight : 'bolder',
  },
  menuTitle:{
    fontSize : 17,
    fontWeight : '900',
    margin : 10,
    paddingLeft : '6%',
  },
  btnOrder: {
    alignItems: 'center',
    backgroundColor: '#FFCD61',
    padding: 10,
    borderRadius: 15,
    height: 60,
    textAlign: 'center',
    width : '80%',
    marginLeft: '8%',
    marginTop : 40,
    marginBottom: 60,
  },
  orderBtn: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 35,
  },
})