import {SafeAreaView,ScrollView, StyleSheet, TextInput, Text, View, TouchableOpacity, Image, TouchableHighlight} from 'react-native';
import React, {useState} from 'react';
// import AddImage from '../components/AddImage';
import HandleImage from '../components/HandleImage';
import {Picker} from '@react-native-picker/picker';
import {addVehicle} from '../modules/utils/vehicles';
import { useSelector } from "react-redux";

export default function Add(props) {
  const token = useSelector((state) => state.auth.userData.token);
  console.log(token)
  const [name, onChangeName] = useState('');
  const [number, onChangeNumber] = useState(null);
  const [counter, setCounter] = useState(1);
  const [selectedLoc, setSelectedLoc] = useState();
  const [selectedAddTo, setSelectedAddTo] = useState();

  const addCounter = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
  };
  const subCounter = () => {
    const newCounter = counter - 1 < 0 ? 0 : counter - 1;
    setCounter(newCounter);
  };

  const addVehicleHandler = () => {
    const body = {
        qty : counter,
        name : Name,

    }
    console.log(body)
    addVehicle(token, body)
    .then((res) => {
      console.log(res)
      console.log(res.json())
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    });
  }

  return (
    <ScrollView style={styles.bg}>
        <HandleImage />
      <TextInput
        style={styles.inputNameProduct}
        onChangeText={onChangeName}
        value={name}
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
        <View>
        <Text style={styles.menuTitle}>Location</Text>
        <View style={styles.locationWrapper}>
        <Picker style={styles.dropdownMenu}
          selectedValue={selectedLoc}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLoc(itemValue)
          }>
           <Picker.Item label="Choose Location" value="Choose Location" />
          <Picker.Item label="Malang" value="Malang" />
          <Picker.Item label="Yogyakarta" value="Yogyakarta" />
          <Picker.Item label="Jakarta" value="Jakarta" />
          <Picker.Item label="Bali" value="Bali" />
          <Picker.Item label="+ Add City" value="AddCity" />
        </Picker>  
        </View>      
        </View>
        <View>
        <Text style={styles.menuTitle}>Add to</Text>
        <View style={styles.locationWrapper}>
        <Picker style={styles.dropdownMenu}
          selectedValue={selectedAddTo}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedAddTo(itemValue)
          }>
          <Picker.Item label="Choose Category" value="Choose Category" />
          <Picker.Item label="Cars" value="Cars" />
          <Picker.Item label="Bike" value="Bike" />
          <Picker.Item label="MotorBike" value="MotorBike" />
          <Picker.Item label="HomePage (Popular)" value="Popular" />
          <Picker.Item label="+ Add Category" value="AddCategory" />
        </Picker>  
        </View> 
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
    width : 385,
    marginTop : 20,
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
  locationWrapper:{
    width: 335,
    marginLeft : 30,
    borderWidth : 1,
    borderColor: '#393939',
    borderRadius : 15,
  },
});
