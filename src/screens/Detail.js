import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';

function Detail({navigation}) {
  const [date, setDate] = useState(new Date());
  const [counter, setCounter] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();

  const addCounter = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
  };
  const subCounter = () => {
    const newCounter = counter - 1 < 0 ? 0 : counter - 1;
    setCounter(newCounter);
  };
  return (
    <View>
    <View style={styles.container}>
      <Image source={require('../assets/detailbg.png')} style={styles.bg} />
      <View style={styles.containerDesc}>
        <Text style={styles.titleDetail}>Vespa Matic Rp. 120.000/day</Text>
        <Text style={styles.titleDesc}>Max for 2 person</Text>
        <Text style={styles.titleDesc}>No prepayment</Text>
        <Text style={styles.avail}>Available</Text>
      </View>
      <View style={styles.desc}>
        <Image source={require('../assets/loc.png')} style={styles.icon} />
        <Text style={styles.descTxt}>Jalan Maliboboro, No. 21, Yogyakarta</Text>
      </View>
      <View style={styles.desc}>
        <Image source={require('../assets/walk.png')} style={styles.icon} />
        <Text style={styles.descTxt}>3.2 miles from your location</Text>
      </View>

      <View style={styles.counterWrapper}>
        <Text style={styles.menuTitle}>Select Bikes :</Text>
          <View  style={styles.btnCounterWrapper}>
          <Text style={styles.counter} onPress={subCounter}>-</Text>
          <Text style={styles.counterText}>{counter}</Text>
          <Text style={styles.counter} onPress={addCounter}>+</Text>
          </View>
        </View>

      <View style={styles.days}>
      <Picker
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) =>
        setSelectedLanguage(itemValue)
      }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
     
      </View>
      <View>
        <TouchableOpacity style={styles.btnReserve} onPress={()=> navigation.navigate('Payment')}>
          <Text style={styles.reserve}>Reservation</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
  },
  bg: {
    width: '100%',
    height: 250,
  },
  icon: {
    width: 50,
    height: 50,
    margin: 10,
  },
  desc: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 'auto',
    paddingLeft: 20,
  },
  descTxt: {
    margin: 20,
    color: 'black',
  },
  titleDetail: {
    fontSize: 26,
    color: 'black',
    padding: 5,
    // fontWeight: 500,
  },
  titleDesc: {
    padding: 5,
    fontSize: 16,
    color: 'black',
    // fontWeight: 400,
  },
  avail: {
    fontSize: 16,
    color: '#087E0D',
    fontWeight: 'bold',
  },
  containerDesc: {
    paddingLeft: 10,
    paddingTop: 10,
  },
  btnReserve: {
    alignItems: 'center',
    backgroundColor: '#FFCD61',
    padding: 5,
    borderRadius: 15,
    height: 50,
    textAlign: 'center',
    width: 350,
    marginLeft: '7%',
    marginBottom : 40,
    marginTop : 20,
  },
  reserve: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 35,
    // padding : 10,
  },
  days:{
    width: 30,
    padding : 10,
    justifyContent: 'flex-end',
    // flexDirection: 'row',
    marginLeft : '40%',
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
    marginLeft : '27%',
    flex : 1,
    textAlign : 'right',
    flexDirection : 'row',
  },
});

export default Detail;
