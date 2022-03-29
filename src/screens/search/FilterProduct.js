import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import {Picker} from '@react-native-picker/picker';
import {filterVehicle} from '../../modules/utils/vehicles';


export default function FilterProduct({navigation}) {
  const [open, setOpen] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState();
  const [selectedRate, setSelectedRate] = useState();
  const [selectedPrice, setSelectedPrice] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedType, setSelectedType] = useState();

  const [vehicle, setVehicle] = useState();


  const [isEnabledA, setIsEnabledA] = useState(false);
  const [isEnabledB, setIsEnabledB] = useState(false);
  const [isEnabledC, setIsEnabledC] = useState(false);

  const toggleSwitchA = () => setIsEnabledA(previousState => !previousState);

  const toggleSwitchB = () => setIsEnabledB(previousState => !previousState);

  const toggleSwitchC = () => setIsEnabledC(previousState => !previousState);

//   const filterVehicle = () =>{
//   const vtype = selectedType;
//   const location = selectedLoc;
//   filterVehicle(vtype, location)
//   .then(res => {
//     setVehicle('res fiter', res.data)
//   }).catch(err => {
//     console.log(err)
//   });
// }
// useEffect(() => {
//   filterVehicle();
// }, []);


  
  return (
    <>
    <TouchableOpacity onPress={()=>navigation.goBack()}>
      <View style={styles.backBtn}>
      <Image source={require('../../assets/back-arrow.png')} style={styles.backBtnImg}/>
      <Text style={styles.backBtnTxt}>Back</Text>
      </View>
    </TouchableOpacity>
    <ScrollView style={styles.bg}>
      <View style={styles.filterCardWrapper}>
        <View>
        <Text style={styles.filterTitle}>Your location</Text>
        </View>
        <View style={styles.dropdownUpdateStok}>
          <Picker
             style={styles.dropdownMenuUpdateStok}
             selectedValue={selectedLoc}
             onValueChange={(itemValue, itemIndex) =>
               setSelectedLoc(itemValue)
             }>
             <Picker.Item
               style={styles.dropdownMenuItem}
               label="jakarta"
               value="jakarta"
             />
             <Picker.Item
               style={styles.dropdownMenuItem}
               label="malang"
               value="malang"
             />
             <Picker.Item
               style={styles.dropdownMenuItem}
               label="yogyakarta"
               value="yogyakarta"
             />
           </Picker>       
        </View>

      </View>
      <View style={styles.filterCardWrapper}>
      <View>
      <Text style={[styles.filterTitle,{marginRight:23}]}>Star rating</Text>
      </View>
      <View style={styles.dropdownUpdateStok}>
        <Picker
          style={styles.dropdownMenuUpdateStok}
          selectedValue={selectedRate}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedRate(itemValue)
          }>
          <Picker.Item
            style={styles.dropdownMenuItem}
            label="null"
            value="null"
          />
          <Picker.Item
            style={styles.dropdownMenuItem}
            label="null"
            value="null"
          />
          <Picker.Item
            style={styles.dropdownMenuItem}
            label="null"
            value="null"
          />
        </Picker>       
      </View>
      </View>

      <View style={styles.filterCardWrapper}>

      <View>
      <Text style={[styles.filterTitle, {marginRight:67}]}>Price</Text>
      </View>
      <View style={styles.dropdownUpdateStok}>
        <Picker
          style={styles.dropdownMenuUpdateStok}
          selectedValue={selectedPrice}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedPrice(itemValue)
          }>
          <Picker.Item
            style={styles.dropdownMenuItem}
            label="null"
            value="null"
          />
          <Picker.Item
            style={styles.dropdownMenuItem}
            label="null"
            value="2Available"
          />
          <Picker.Item
            style={styles.dropdownMenuItem}
            label="null"
            value="null"
          />
        </Picker>       
      </View>
      </View>

      <View style={styles.filterCardWrapper}>
      <View>
      <Text style={[styles.filterTitle, {marginRight:73}]}>Date</Text>
      </View>
      <View style={styles.dropdownUpdateStok}>
        <Picker
          style={styles.dropdownMenuUpdateStok}
          selectedValue={selectedDate}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedDate(itemValue)
          }>
          <Picker.Item
            style={styles.dropdownMenuItem}
            label="null"
            value="null"
          />
          <Picker.Item
            style={styles.dropdownMenuItem}
            label="null"
            value="null"
          />
          <Picker.Item
            style={styles.dropdownMenuItem}
            label="null"
            value="null"
          />
        </Picker>       
      </View>
      </View>

      <View style={styles.filterCardWrapper}>
        <View>
        <Text style={[styles.filterTitle, {marginRight:73}]}>Type</Text>
        </View>
         <View style={styles.dropdownUpdateStok}>
          <Picker
            style={styles.dropdownMenuUpdateStok}
            selectedValue={selectedType}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedType(itemValue)
            }>
            <Picker.Item
              style={styles.dropdownMenuItem}
              label="bike"
              value="bike"
            />
            <Picker.Item
              style={styles.dropdownMenuItem}
              label="car"
              value="car"
            />
            <Picker.Item
              style={styles.dropdownMenuItem}
              label="motorbike"
              value="motorbike"
            />
          </Picker>       
      </View>
      </View>


      <View style={styles.filterCardWrapper}>
        <View>
        <Text style={[styles.filterTitle, {marginRight:103}]}>No Prepayment</Text>
        </View>
        <View style={styles.containerSwitch}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabledA ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchA}
            value={isEnabledA}
          />
        </View>
      </View>

      <View style={styles.filterCardWrapper}>
        <View>
        <Text style={[styles.filterTitle, {marginRight:183}]}>Deals</Text>
        </View>
        <View style={styles.containerSwitch}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabledB ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchB}
            value={isEnabledB}
          />
        </View>
      </View>

      <View style={styles.filterCardWrapper}>
        <View>
        <Text style={[styles.filterTitle, {marginRight:63}]}>Only show available</Text>
        </View>
        <View style={styles.containerSwitch}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabledC ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchC}
            value={isEnabledC}
          />
        </View>
      </View>
      
      <View>
      <TouchableOpacity style={styles.btnLgn}>
      <Text style={styles.login}>Apply Filter</Text>
    </TouchableOpacity>
    </View>
    </ScrollView>
      </>
        )
      }

const styles = StyleSheet.create({
  backBtn:{
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop : 20,
    marginLeft : 20,
    color: 'black',

  },
  backBtnImg:{
    width : 40,
    height : 40,
  },
  backBtnTxt:{
    color : 'black',
    fontWeight : 'bold',
    fontSize : 20,
    lineHeight : 37,
  },
  bg:{
    backgroundColor : 'white',
    color: 'black',

  },
  filterCardWrapper:{
    // flexDirection : 'row',
    width : '100%',
    color: 'black',

    marginLeft: 10,
    flexDirection: 'row',
  },
  dropdownUpdateStok: {
    width: 200,
    marginLeft: 30,

    fontSize: 1,
    fontWeight: '600',
    // backgroundColor : 'white',
    color: 'black',
    // padding : 5,

    borderWidth: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 20,
    // marginBottom : 20,
    marginTop: 10,
    // width : '100%',
    // marginLeft : '10%',
    // fontSize: 17,
    height: 50,
    lineHeight: 10,
    fontWeight: 'bold',
    color: '#393939',
  },
  dropdownMenuUpdateStok: {
    fontSize: 12,
    fontWeight: '600',
    // backgroundColor : 'white',
    color: '#393939',
  },
  dropdownMenuItem: {
    fontSize: 16,
    fontWeight: '600',
    // backgroundColor : 'white',
    // color: 'black',
    color: '#393939',
  },
  filterTitle:{
    fontSize : 18,
    color : 'black',
    padding : 29,
    lineHeight : 20,
    fontWeight : 'bold',
  },
  containerSwitch: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: 'black',

  },
  btnLgn: {
  alignItems: 'center',
  backgroundColor: '#FFCD61',
  padding: 10,
  borderRadius: 15,
  height: 60,
  textAlign: 'center',
  marginBottom: 40,
  color: 'black',

  marginLeft: 10,
  marginRight: 10,
},
login: {
  color: '#000000',
  fontWeight: 'bold',
  fontSize: 24,
  lineHeight: 35,
},
  
})






