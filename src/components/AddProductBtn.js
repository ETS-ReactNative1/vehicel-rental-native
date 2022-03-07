import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function AddProductBtn() {
  const navigation = useNavigation(); 
  return (
    <>
        <TouchableOpacity style={style.btnAdd} onPress={() => navigation.navigate('Add')}>
            <Text style={style.AddBtn}>Add Item</Text>
          </TouchableOpacity>
    </>
  )
}

const style = StyleSheet.create ({
    btnAdd: {
        alignItems: 'center',
        backgroundColor: '#FFCD61',
        padding: 10,
        borderRadius: 15,
        height: 60,
        textAlign: 'center',
        width : '80%',
        marginLeft: '8%',
      },
      AddBtn: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: 35,
      },
})