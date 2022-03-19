import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getVehicle, updateVehicle} from '../modules/utils/vehicles';
import {useSelector} from 'react-redux';

function Detail({navigation, route}) {
  const role = useSelector(state => state.auth.userData.role);
  const token = useSelector(state => state.auth.userData.token);

  const [name, onChangeName] = useState(null);

  const [counter, setCounter] = useState(1);
  const [vehicle, setVehicle] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState();
  const [selectedStatus, setSelectedStatus] = useState();

  const [newStock, updateStock] = useState(null);
  const [newStatus, updateStatus] = useState(null);

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [images, setImages] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const addCounter = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
  };
  const subCounter = () => {
    const newCounter = counter - 1 < 0 ? 0 : counter - 1;
    setCounter(newCounter);
  };
  const dateNow = new Date();

  useEffect(() => {
    const id = route.params.id;
    getVehicle(id)
      .then(res => {
        setVehicle(res.data.result[0]);
        console.log(res.data.result);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log('hadleChoosePhoto : ', response.assets[0]);
      if (response.didCancel) {
        return;
      }
      if (response) {
        setImages(response.assets[0]);
      }
    });
  };

  const handleUpdate = () => {
    let id = route.params.id;
    let data = [];
    if (images)
      RNFetchBlob.fetch(
        'PATCH',
        `${process.env.API_URL}/vehicles/${id}`,
        {
          'x-access-token': token,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        [
          {
            name: 'image',
            type: images.type,
            filename: images.fileName,
            data: RNFetchBlob.wrap(images.uri),
            // uri: Platform.OS === 'android' ? images.uri.replace('file://', '') : images.uri,
          },
          // if()
          {name: 'name', data: name},
          {name: 'qty', data: counter},
          {name: 'status', data: selectedStatus},
        ],
      )
        .then(response => {
          console.log('response', response);
          console.log('response', response.json());
        })
        .catch(error => {
          console.log('error', error);
        });
  };

  let img = JSON.parse(route.params.image)[0];
  // console.log('detail img : ', img)
  let pic = {uri : `${process.env.API_URL}/${img}`};

  // let imgs = img.map(function(imgDisplay){
  //   return (<Image source={ {uri : `${process.env.API_URL}/${imgDisplay}`}} />)
  // })

  console.log(route.params.id);
  return (
    <ScrollView>
      <View style={styles.container}>
      {img  !== null ? 
        <Image source={pic} style={styles.bg} />
        : <Image source={require('../assets/default-placeholder.png')}
        style={styles.bg} /> }
        {/* <Image source={require('../assets/detailbg.png')} style={styles.bg} /> */}
        <View style={styles.containerDesc}>
          <View style={styles.infoWrapper}>
            <View style={styles.editWrapper}>
              {role === 1 ? (
                <View>
                  <TextInput
                    style={styles.inputNameProductUpdate}
                    placeholder={`${vehicle.name} Rp. ${vehicle.price}`}
                    onChangeText={onChangeName}
                  />
                </View>
              ) : (
                <Text style={styles.titleDetail}>
                  {vehicle.name} Rp.{vehicle.price}/day
                </Text>
              )}
              {role === 1 && (
                <View>
                  <Image
                    source={require('../assets/delete.png')}
                    style={styles.iconDelete}
                  />
                </View>
              )}
            </View>
            <Text style={styles.titleDesc}>
              Max for {vehicle.capacity} person
            </Text>
            <Text style={styles.titleDesc}>No prepayment</Text>
            <Text style={styles.avail}>{vehicle.status}</Text>
          </View>
          <View style={styles.desc}>
            <Image source={require('../assets/loc.png')} style={styles.icon} />
            <Text style={styles.descTxt}>
              {/* Jalan Maliboboro, No. 21, Yogyakarta */}
              {vehicle.location}
            </Text>
          </View>
          <View style={styles.desc}>
            <Image source={require('../assets/walk.png')} style={styles.icon} />
            <Text style={styles.descTxt}>3.2 miles from your location</Text>
          </View>
        </View>

        <View style={styles.counterWrapper}>
          <Text style={styles.menuTitle}>
            {role === 1 ? 'Update Stock :' : 'Select Bikes :'}
          </Text>
          <View style={styles.btnCounterWrapper}>
            <Text style={styles.counter} onPress={subCounter}>
              -
            </Text>
            <Text style={styles.counterText}>{counter}</Text>
            <Text style={styles.counter} onPress={addCounter}>
              +
            </Text>
          </View>
        </View>

        <View style={styles.days}>
          {/* <View> */}
          {role === 1 ? (
            <View style={styles.dropdownUpdateStok}>
              <Picker
                style={styles.dropdownMenuUpdateStok}
                selectedValue={selectedDay}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedStatus(itemValue)
                }>
                <Picker.Item
                  style={styles.dropdownMenuItem}
                  label="Update Stock Status"
                  value="null"
                />
                <Picker.Item
                  style={styles.dropdownMenuItem}
                  label="Available"
                  value="2Available"
                />
                <Picker.Item
                  style={styles.dropdownMenuItem}
                  label="Full Booked"
                  value="Booked"
                />
              </Picker>
            </View>
          ) : (
            <>
              <View style={styles.datePicker}>
                <View>
                  <TouchableOpacity onPress={showDatepicker}>
                    {/* // title="Show date picker! */}
                    <Text style={styles.datePickerBtn}>Date</Text>
                  </TouchableOpacity>
                </View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    minimumDate={dateNow}
                  />
                )}
              </View>

              <View style={styles.dropdownMenu}>
                <Picker
                  style={styles.dropdownMenuItem}
                  selectedValue={selectedDay}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedDay(itemValue)
                  }>
                  <Picker.Item
                    style={styles.dropdownMenuItem}
                    label="day 1"
                    value="1"
                  />
                  <Picker.Item
                    style={styles.dropdownMenuItem}
                    label="day 2"
                    value="2"
                  />
                  <Picker.Item
                    style={styles.dropdownMenuItem}
                    label="day 3"
                    value="3"
                  />
                  <Picker.Item
                    style={styles.dropdownMenuItem}
                    label="day 4"
                    value="4"
                  />
                  <Picker.Item
                    style={styles.dropdownMenuItem}
                    label="day 5"
                    value="5"
                  />
                  <Picker.Item
                    style={styles.dropdownMenuItem}
                    label="day 6"
                    value="6"
                  />
                  <Picker.Item
                    style={styles.dropdownMenuItem}
                    label="day 7"
                    value="7"
                  />
                </Picker>
              </View>
            </>
          )}
        </View>

        {/* </View> */}

        <View>
          {role === 1 ? (
            <View>
              <TouchableOpacity
                style={styles.btnReserve}
                onPress={handleUpdate}>
                <Text style={styles.reserve}>Update Item</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                style={styles.btnReserve}
                onPress={() => {
                  const param = {
                    id: vehicle.id,
                  };
                  const paymentBody = {
                    id: vehicle.id,
                    date: date,
                    day: selectedDay,
                    bikes: vehicle.name,
                    qty: counter,
                    price: vehicle.price,
                    capacity: vehicle.capacity,
                    location: vehicle.location,
                  };
                  navigation.navigate('Payment', {param, paymentBody});
                }}>
                <Text style={styles.reserve}>
                  {/* {role === 1 ? 'Update Item' : 'Reservation'} */}
                  Reservation
                </Text>
              </TouchableOpacity>
            </View>
          )}
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
  iconDelete: {
    width: 35,
    height: 35,
    marginLeft: 10,
    marginTop: 30,
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
    fontSize: 16,
    color: 'black',
  },
  titleDetail: {
    fontSize: 24,
    color: 'black',
    padding: 5,
    marginTop: 7,
    width: '75%',
    // fontWeight: 500,
  },
  titleDesc: {
    padding: 5,
    fontSize: 17,
    color: 'black',
    // fontWeight: 400,
  },
  avail: {
    fontSize: 17,
    color: '#087E0D',
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 8,
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
    height: 60,
    textAlign: 'center',
    width: 350,
    marginLeft: '7%',
    marginBottom: 40,
    marginTop: 20,
  },
  reserve: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 19,
    lineHeight: 45,
    // padding : 10,
  },
  days: {
    width: '100%',
    // padding: 10,
    // justifyContent: 'flex-end',
    flexDirection: 'row',
    // marginLeft: '40%',
  },
  menuTitle: {
    fontSize: 17,
    fontWeight: '900',
    margin: 10,
    paddingLeft: '6%',
  },
  counter: {
    fontSize: 17,
    fontWeight: '900',
    margin: 10,
    backgroundColor: '#FFCD61',
    borderRadius: 12,
    width: 25,
    height: 25,
    paddingLeft: 8,
  },
  counterText: {
    fontSize: 17,
    fontWeight: '900',
    margin: 10,
  },
  counterWrapper: {
    flexDirection: 'row',
  },
  btnCounterWrapper: {
    marginLeft: '27%',
    flex: 1,
    textAlign: 'right',
    flexDirection: 'row',
  },

  datePicker: {
    width: 150,
    marginLeft: 29,
    marginTop: 10,
    marginRight: 15,
    backgroundColor: 'white',
    color: 'black',
  },
  datePickerBtn: {
    fontSize: 16,
    fontWeight: '600',
    // backgroundColor : 'white',
    color: 'black',
    // padding : 5,

    borderWidth: 0,
    backgroundColor: '#DFDEDE',
    borderRadius: 10,
    paddingLeft: 20,
    marginBottom: 20,
    width: '100%',
    // marginLeft : '10%',
    // fontSize: 17,
    height: 50,
    lineHeight: 48,
    // fontWeight : 'bold',
  },
  editWrapper: {
    flexDirection: 'row',
  },
  dropdownMenu: {
    width: 160,
    marginLeft: 20,

    fontSize: 1,
    fontWeight: '600',
    // backgroundColor : 'white',
    color: 'black',
    // padding : 5,

    borderWidth: 0,
    backgroundColor: '#DFDEDE',
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
  },
  dropdownMenuItem: {
    fontSize: 16,
    fontWeight: '600',
    // backgroundColor : 'white',
    color: 'black',
  },
  infoWrapper: {
    paddingLeft: 15,
    // width : '100%',
    // paddingRight : 5,
  },
  dropdownUpdateStok: {
    width: 347,
    marginLeft: 30,

    fontSize: 1,
    fontWeight: '600',
    // backgroundColor : 'white',
    color: 'black',
    // padding : 5,

    borderWidth: 0,
    backgroundColor: '#DFDEDE',
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
  },
  dropdownMenuUpdateStok: {
    fontSize: 16,
    fontWeight: '600',
    // backgroundColor : 'white',
    color: 'black',
  },
  inputNameProductUpdate: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    width: 280,
    height: 120,
    placeholderTextColor: 'black',
  },
});

export default Detail;
