import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
// import SelectDropdown from 'react-native-select-dropdown';
import {getVehicle} from '../../modules/utils/vehicles';
import {connect, useDispatch} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import { useSelector } from "react-redux";
import {getUsers} from "../../modules/utils/users";

export default function Payment({navigation, route}) {
  const token = useSelector((state) => state.auth.userData.token);
  const [vehicle, setVehicle] = useState([]);
  const [ user, setUser] = useState({});
  const [selectedType, setSelected] = useState();

  
  useEffect(() => {
    getUsers(token)
    .then((res) => {
      setUser({...res.data.result[0]})
      console.log('user : ', res.data.result[0])
    }).catch((err) => {
      console.log(err)
    });
  }, []);

  useEffect(() => {
    const id = route.params.id;
    console.log(id)
    console.log('route : ' + id)
    getVehicle(id)
    .then((res) => {
      setVehicle(res.data.result[0])
      console.log('vehicle : ', res.data.result[0].id)
    }).catch((err) => {
      console.log(err)
    });
  }, []);

  const payment = () => {
    const b= {
      // email_address: email,
      name : user.name,
          email : user.email_address,
    };
    console.log(b);
  };

  const {paymentBody} = route.params;
  console.log('pay data : ', paymentBody)
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
          placeholder= {user.name !== null ? user.name : "Name"}
        />
      </View>  
      <View>
        <TextInput
         style={styles.inputNameProduct}
          placeholder= {user.username !== null ? user.username : "Last Name"}
        />
      </View>  
      <View>
        <TextInput
         style={styles.inputNameProduct}
          placeholder= {user.mobile_number !== null ? user.mobile_number : "Mobile phone"}
        />
      </View>  
      <View>
        <TextInput
         style={styles.inputNameProduct}
          placeholder={user.email_address !== null ? user.email_address  : "Email Address" }
        />
      </View> 
      <View>
        <TextInput
         style={styles.inputNameProduct}
         placeholder={user.address !== null ? user.address  : "Location" }
        />
      </View>  
      <View style={styles.inputNameProduct}>
      <Picker style={styles.dropdownMenu}
            selectedValue={selectedType}
            onValueChange={(itemValue, itemIndex) =>
              setSelected(itemValue)
            }>
            <Picker.Item label="Payment (No Tax)" value="Payment (No Tax)" style={styles.dropdownMenu} />
            <Picker.Item label="Pay at the end (include tax)" value="Pay at the end (include tax)" style={styles.dropdownMenu}/>
            <Picker.Item label="Partial payment (include tax)" value="Partial payment (include tax)" style={styles.dropdownMenu}/>

          </Picker>
      </View>  
      <TouchableOpacity style={styles.btnOrder} onPress={() =>
        {const params= {
          id: vehicle.id,
        };
        const body= {
          id : user.id,
          name : user.name,
          email : user.email_address,
          phone : user.mobile_number,
        };
        const payType ={
          paymentType: selectedType,
        }
        navigation.navigate('GetPayment', {params, body, payment, paymentBody, payType})
        }}>
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
    borderWidth: 0,
    backgroundColor : '#DFDEDE',
    borderRadius : 10,
    paddingLeft : 20,
    marginBottom : 20,
    width : '80%',
    marginLeft : '10%',
    fontSize: 17,
    fontWeight : 'bold',
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
    marginLeft: '9%',
    marginTop : 20,
    marginBottom: 60,
  },
  orderBtn: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 35,
  },
  dropdownMenu:{
    fontSize : 16,
    fontWeight : ' bold',
  },
})