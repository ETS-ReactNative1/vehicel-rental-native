import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {Button} from 'react-native';
// import DatePicker from 'react-native-date-picker';

function Detail() {
  const days = ['1day', '2day', '3day', '4day'];
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <ScrollView>
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
      <View style={styles.days}>
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
        {/* <View>
          <Button title="Open" onPress={() => setOpen(true)} />
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View> */}
      </View>
      <View>
        <TouchableOpacity style={styles.btnReserve}>
          <Text style={styles.reserve}>Reservation</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
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
  }
});

export default Detail;
