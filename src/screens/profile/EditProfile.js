import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet,
TextInput } from 'react-native'
import React from 'react'

export default function EditProfile() {
  return (
    <>
    <ScrollView style={styles.bg}>
      <Text>EditProfile</Text>
      <View style={styles.user}>
        <Image source={require('../../assets/doe.png')} style={styles.imgPic}/>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputWrapperTitle}>Name : </Text>
          <View>
            <TextInput
                style={styles.inputBiodata}
                placeholder="Name"
                />
            </View>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputWrapperTitle}>Email Address : </Text>
          <View>
            <TextInput
                style={styles.inputBiodata}
                placeholder="Email"
                />
            </View>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputWrapperTitle}>Phone Number : </Text>
          <View>
            <TextInput
                style={styles.inputBiodata}
                placeholder="Phone Number"
                />
            </View>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputWrapperTitle}>Date of Birth : </Text>
          <View>
            <TextInput
                style={styles.inputBiodata}
                placeholder="Date of Birth"
                />
            </View>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputWrapperTitle}>Delivery Address : </Text>
          <View>
            <TextInput
                style={styles.inputBiodata}
                placeholder="Delivery Address"
                />
            </View>
      </View>

      <View>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnSave}>
            Save change
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
    bg: {
        backgroundColor: '#fff',
      },
      name: {
        fontWeight: 'bold',
        fontSize: 23,
        color: '#393939',
        marginTop: '4%',
        marginLeft: '5%',
        flex: 1,
      },
      user: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#fff',
        alignItems : 'center',
        textAlign : 'center',
        borderWidth : 0,
      },
      imgPic:{
          alignItems : 'center',
          width : 100,
          height : 100,
          borderRadius : 50,
        //   marginLeft : '40%',
      },
      inputBiodata:{
        borderWidth: 1.5,
        backgroundColor : '#fff',
        borderColor: '#DFDEDE',
        borderRadius : 10,
        paddingLeft : 20,
        marginTop : 10,
        marginBottom : 10,
        width : '100%',
        // marginLeft : '10%',
        fontSize: 17,
        fontWeight : '500',
      },
      inputWrapper:{
        paddingLeft : 20,
        marginBottom : 20,
        width : '90%',
        marginLeft : '3%',
        fontSize: 17,
        fontWeight : '500',
      },
      inputWrapperTitle:{
        fontSize: 14,
        fontWeight : '500',
      },
      btn: {
        alignItems: 'center',
        backgroundColor: '#FFCD61',
        padding: 10,
        borderRadius: 15,
        height: 60,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 30,
        width: 350,
        marginLeft: '7%',
      },
      btnSave: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 35,
        // padding : 10,
      },
})