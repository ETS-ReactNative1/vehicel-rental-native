import React, {useState} from 'react'
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native'
import { Checkbox } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

export default function History() {
  const [checked, setChecked] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <ScrollView>
      <Text>History Order</Text>
      <View>
        <Text>A Week Ago</Text>
        <Text>Delete</Text>
      </View>
      <View>
        <View>
          <Image style={style.imageWrapper} source={require('../assets/detailbg.png')}/>    
        </View>
        <View>
        <Text style={style.title}>Vespa Matic</Text>
        <Text style={style.titleNd}>Jan 18 to 21 2021</Text>
        <Text style={style.title}>Prepayment : Rp. 245.000</Text>
        <Text style={style.titleRd}>Has been returned</Text>
        </View>
        <View>
          <Checkbox style={style.Checkbox}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
            />
        </View> 
        </View>
    <View>
    <Picker
  selectedValue={selectedLanguage}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedLanguage(itemValue)
  }>
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
    </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  imageWrapper:{
    borderRadius : 30,
    width: 150,
    height : 150,
  },
  title:{
    fontSize : 16,
    fontWeight: 'bold',
  },
  titleNd:{
    fontSize : 16,
  },
  titleRd:{
    fontSize : 16,
    color : '#087E0D',
  },
  Checkbox:{
    width : 40,
    height : 40,
  }
})