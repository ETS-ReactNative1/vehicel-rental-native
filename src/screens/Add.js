import {SafeAreaView,ScrollView, StyleSheet, TextInput, Text, View, TouchableOpacity, Image, TouchableHighlight} from 'react-native';
import React, {useState} from 'react';

export default function Add() {
  const [text, onChangeText] = useState('');
  const [number, onChangeNumber] = useState(null);
  const [counter, setCounter] = useState(1);

  const addCounter = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
  };
  const subCounter = () => {
    const newCounter = counter - 1 < 0 ? 0 : counter - 1;
    setCounter(newCounter);
  };
  return (
    <ScrollView style={styles.bg}>
      <TouchableHighlight style={styles.imgWrapper}>
       <Image
        source={require('../assets/default-placeholder.png')}
        style={styles.imgPlaceholder}
        />
        </TouchableHighlight>
      <TouchableOpacity style={styles.btnAddPic} onPress={() => navigation.navigate('Add')}>
            <Text style={styles.AddPic}>Add Item</Text>
          </TouchableOpacity>
      <TextInput
        style={styles.inputNameProduct}
        onChangeText={onChangeText}
        value={text}
        placeholder="Type product name min. 30 characters"
      />
      <TextInput
        style={styles.inputNameProduct}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Type product price"
        // keyboardType="numeric"
      />
      <View>
        <Text style={styles.menuTitle}>Description</Text>
        <TextInput
         style={styles.inputNameProduct}
          placeholder="Description placeholder"
          // keyboardType="numeric"
        />
        <View style={styles.locationWrapper}>
        <Text style={styles.menuTitle}>Location</Text>
        <SelectDropdown 
          data={days}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
        </View>
        <View style={styles.locationWrapper}>
        <Text style={styles.menuTitle}>Add to</Text>
        {/* dropdowwn */}
        </View>
        <View style={styles.counterWrapper}>
        <Text style={styles.menuTitle}>Stock :</Text>
          <View  style={styles.btnCounterWrapper}>
          <Text style={styles.counter} onPress={subCounter}>-</Text>
          <Text style={styles.counterText}>{counter}</Text>
          <Text style={styles.counter} onPress={addCounter}>+</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.btnSave} onPress={() => navigation.navigate('Add')}>
            <Text style={styles.saveBtn}>Add Item</Text>
          </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg:{
    backgroundColor : 'white',
  },
  imgPlaceholder:{
    width : 150,
    height: 150,
    borderRadius : 75,
  },
  imgWrapper:{
    width : 150,
    height: 150,
    borderRadius : 50,
    marginLeft : '30%',
    marginTop : 40,
  },
  inputNameProduct:{
    borderWidth: 0,
    borderBottomWidth : .5,
    borderBottomColor: '#393939',
    width : '80%',
    marginLeft : '8%',
  },
  menuTitle:{
    fontSize : 17,
    fontWeight : '900',
    margin : 10,
    paddingLeft : '6%',
  },
  counter:{
    fontSize : 17,
    fontWeight : '900',
    margin : 10,
    backgroundColor : '#FFCD61',
    borderRadius : 12,
    width : 25,
    height : 25,
    paddingLeft : 8,
  },
  counterText:{
    fontSize : 17,
    fontWeight : '900',
    margin : 10,
  },
  counterWrapper:{
    flexDirection: 'row',
  },
  btnCounterWrapper:{
    marginLeft : '40%',
    flex : 1,
    textAlign : 'right',
    flexDirection : 'row',
  },
  btnAddPic: {
    alignItems: 'center',
    backgroundColor: '#393939',
    padding: 10,
    borderRadius: 15,
    height: 60,
    textAlign: 'center',
    width : '60%',
    marginLeft: '20%',
    marginTop: 40,
    marginBottom: 40,
  },
  AddPic: {
    color : '#FFCD61',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 35,
  },
  btnSave: {
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
  saveBtn: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 35,
  },
});
