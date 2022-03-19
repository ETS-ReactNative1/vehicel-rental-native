import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, {useState} from 'react'
import {Picker} from '@react-native-picker/picker';

export default function FilterProduct() {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState();
  return (
    <ScrollView style={styles.bg}>
      <Text>Filter</Text>

      <View style={styles.filterCardWrapper}>

        <View>
        <Text style={styles.filterTitle}>Your location</Text>
        </View>

        <View style={styles.dropdownUpdateStok}>
          <Picker
             style={styles.dropdownMenuUpdateStok}
             selectedValue={selectedCity}
             onValueChange={(itemValue, itemIndex) =>
               setSelectedCity(itemValue)
             }>
             <Picker.Item
               style={styles.dropdownMenuItem}
               label="Sleman"
               value="null"
             />
             <Picker.Item
               style={styles.dropdownMenuItem}
               label="Yogyakarta"
               value="2Available"
             />
             <Picker.Item
               style={styles.dropdownMenuItem}
               label="Jakarta"
               value="Booked"
             />
           </Picker>       
        </View>

      </View>

      <View style={styles.filterCardWrapper}>

<View>
<Text style={styles.filterTitle}>Star rating</Text>
</View>

<View style={styles.dropdownUpdateStok}>
  <Picker
     style={styles.dropdownMenuUpdateStok}
     selectedValue={selectedCity}
     onValueChange={(itemValue, itemIndex) =>
       setSelectedCity(itemValue)
     }>
     <Picker.Item
       style={styles.dropdownMenuItem}
       label="Sleman"
       value="null"
     />
     <Picker.Item
       style={styles.dropdownMenuItem}
       label="Yogyakarta"
       value="2Available"
     />
     <Picker.Item
       style={styles.dropdownMenuItem}
       label="Jakarta"
       value="Booked"
     />
   </Picker>       
</View>

</View>

<View style={styles.filterCardWrapper}>

<View>
<Text style={styles.filterTitle}>Price</Text>
</View>

<View style={styles.dropdownUpdateStok}>
  <Picker
     style={styles.dropdownMenuUpdateStok}
     selectedValue={selectedCity}
     onValueChange={(itemValue, itemIndex) =>
       setSelectedCity(itemValue)
     }>
     <Picker.Item
       style={styles.dropdownMenuItem}
       label="Sleman"
       value="null"
     />
     <Picker.Item
       style={styles.dropdownMenuItem}
       label="Yogyakarta"
       value="2Available"
     />
     <Picker.Item
       style={styles.dropdownMenuItem}
       label="Jakarta"
       value="Booked"
     />
   </Picker>       
</View>

</View>

<View style={styles.filterCardWrapper}>

<View>
<Text style={styles.filterTitle}>Date</Text>
</View>

<View style={styles.dropdownUpdateStok}>
  <Picker
     style={styles.dropdownMenuUpdateStok}
     selectedValue={selectedCity}
     onValueChange={(itemValue, itemIndex) =>
       setSelectedCity(itemValue)
     }>
     <Picker.Item
       style={styles.dropdownMenuItem}
       label="Sleman"
       value="null"
     />
     <Picker.Item
       style={styles.dropdownMenuItem}
       label="Yogyakarta"
       value="2Available"
     />
     <Picker.Item
       style={styles.dropdownMenuItem}
       label="Jakarta"
       value="Booked"
     />
   </Picker>       
</View>

</View>

<View style={styles.filterCardWrapper}>

<View>
<Text style={styles.filterTitle}>Type</Text>
</View>

<View style={styles.dropdownUpdateStok}>
  <Picker
     style={styles.dropdownMenuUpdateStok}
     selectedValue={selectedCity}
     onValueChange={(itemValue, itemIndex) =>
       setSelectedCity(itemValue)
     }>
     <Picker.Item
       style={styles.dropdownMenuItem}
       label="Sleman"
       value="null"
     />
     <Picker.Item
       style={styles.dropdownMenuItem}
       label="Yogyakarta"
       value="2Available"
     />
     <Picker.Item
       style={styles.dropdownMenuItem}
       label="Jakarta"
       value="Booked"
     />
   </Picker>       
</View>

</View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  bg:{
    backgroundColor : 'white',
  },
  filterCardWrapper:{
    // flexDirection : 'row',
    width : '100%',
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
})