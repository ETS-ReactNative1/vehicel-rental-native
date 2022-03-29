import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  PermissionsAndroid,
  Alert,
  Modal,
  Pressable,
  ToastAndroid,
} from 'react-native';
import {Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getVehicle} from '../modules/utils/vehicles';
import {useSelector} from 'react-redux';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

function Detail({navigation, route}) {
  const role = useSelector(state => state.auth.userData.role);
  const token = useSelector(state => state.auth.userData.token);

  const [setName, onChangeName] = useState(null);
  const [setPrice, onChangePrice] = useState(null);
  const [countUp, setupCounter] = useState(counter);


  const [filePath, setFilePath] = useState({});

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
  const [images, setImages] = useState(null);
  

  const [modalVisible, setModalVisible] = useState(false);

  const successToast = () => {
    ToastAndroid.showWithGravity(
      'Updated Success',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  const failedToast = () => {
    ToastAndroid.showWithGravity(
      'Updated Failed',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

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


  
  let img = JSON.parse(route.params.image)[0];
  // console.log('detail img : ', img)
  let pic = {uri: `${process.env.API_URL}/${img}`};

  // let imgs = img.map(function(imgDisplay){
  //   return (<Image source={ {uri : `${process.env.API_URL}/${imgDisplay}`}} />)
  // })

  // image

  // launch img
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };
  // end of launch img
  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log('hadleChoosePhoto : ', response.assets[0]);
      if (response.didCancel) {
        return;
      }
      if (response) {
        setImages(response.assets[0]);
        console.log(images)
      }
    });
  };

  // console.log(name, price,counter, images)

  const handleUpdateVehicle = () => {
    let id = route.params.id;
    // let data = [];
     if (images)
         RNFetchBlob.fetch(
        'PATCH',`${process.env.API_URL}/vehicles/${id}`, {
          'x-access-token': token,
          Accept : 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        [
          {
            name : 'images',
            type : images.type,
            filename : images.fileName,
            data : RNFetchBlob.wrap(images.uri),
          },
          {name : 'name', data : setName},
          {name : 'price', data : setPrice},
          {name : 'qty', data : JSON.stringify(counter)}, 
          {name : 'status', data : selectedStatus},
        ])
        .then(response => {
          successToast();
          console.log('response', response);
          setTimeout(() => {
            navigation.navigate('Home')
          }, 1500);
          // console.log(data)
          console.log('response', response.json());
        })
        .catch(error => {
          failedToast();
          console.log('error', error);
        });
  };

  

  console.log(route.params.id);
  return (
    <>
  

    <ScrollView style={styles.sectionWrapper}>
      
      <View style={styles.container}>
        <View>
          <View>
          
      <TouchableOpacity onPress={()=>navigation.goBack()}>
      <View style={styles.backBtn}>
      <Image source={require('../assets/back-arrow.png')} style={styles.backBtnImg}/>
      </View>
        </TouchableOpacity>
            {images &&
            (
              <>
                <Image
                  source={{uri: images.uri}}
                  style={styles.imgPlaceholder}
                />
              </>
            ) !== null ? (
              <Image source={{uri: images.uri}} style={styles.imgPlaceholder} />
            ) : (
              <View>
                {pic !== null ? (
                  <Image source={pic} style={styles.imgPlaceholder} />
                ) : (
                  <Image
                    source={require('../assets/default-placeholder.png')}
                    style={styles.imgPlaceholder}
                  />
                )}
              </View>
            )}
          </View>
        </View>

        {/* {img !== null ? (
          <Image source={pic} style={styles.bg} />
        ) : (
          <Image
            source={require('../assets/default-placeholder.png')}
            style={styles.bg}
          />
        )} */}
        {/* <Image source={require('../assets/detailbg.png')} style={styles.bg} /> */}
        <View style={styles.containerDesc}>
          <View style={styles.infoWrapper}>
            <View style={styles.editWrapper}>
              {role === 1 ? (
                <View>
                  <TextInput
                    style={styles.inputNameProductUpdateTop}
                    placeholder={vehicle.name}
                    onChangeText={onChangeName}
                    // name='name'
                    // value={setName}
                    placeholderTextColor='black'
                  />
                   <TextInput
                    style={styles.inputNameProductUpdateTop}
                    placeholder={`Rp. ${vehicle.price}`}
                    onChangeText={onChangePrice}
                    // onChangeText={text => setName(text)}
                    placeholderTextColor='black'
                  />
                </View>
              ) : (
                <Text style={styles.titleDetail}>
                  {vehicle.name} Rp.{vehicle.price}/day
                </Text>
              )}
              {role === 1 && (
                <>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Image
                    source={require('../assets/delete.png')}
                    style={styles.iconDelete}
                  />
                </TouchableOpacity>
                <View>
                 <TouchableOpacity>
                <Image source={require('../assets/pencilEdit.png')} style={styles.imgPic}/>
                 </TouchableOpacity>
               </View>
                {/* // <View>
                //   <Image
                //     source={require('../assets/delete.png')}
                //     style={styles.iconDelete}
                //   />
                // </View> */}
                </>
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
                onPress={handleUpdateVehicle}>
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

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(true);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
              {/* <Text style={styles.modalText}> ?</Text> */}
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => captureImage('photo')}
                style={styles.btnModalWrapper}>
                <Text style={styles.btnModalWrapperText}>
                  Choose Photo from Camera
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleChoosePhoto}
                style={styles.btnModalWrapper}>
                <Text style={styles.btnModalWrapperText}>
                  Choose Image from Gallery
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* <Pressable
        style={[style.button, style.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={style.textStyle}>Show Modal</Text>
      </Pressable> */}
      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  // sectionWrapper :{
  //   // position : 'relative',
  //   zIndex : 1,
  // },
  backBtn:{
    flexDirection: 'row',
    position: 'absolute',
    top : 0,
    zIndex : 5,
    backgroundColor: 'none',
    paddingTop : 20,
    marginLeft : 20,
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
  container: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    position :'relative'
,  },
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
    // placeholderTextColor: 'black',
  },
  inputNameProductUpdateTop: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    width: 280,
    height: 80,
    // placeholderTextColor: 'black',
  },
  centeredView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 15,
    height: 60,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
    width: 150,
  },
  buttonOpen: {
    backgroundColor: '#FFCD61',
  },
  buttonClose: {
    backgroundColor: 'black',
    marginBottom: 50,
  },
  textStyle: {
    color: '#FFCD61',
    fontWeight: 'bold',
    textAlign: 'center',
    // color: '#000000',
    fontSize: 15,
    lineHeight: 35,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  btnModalWrapper: {
    alignItems: 'center',
    backgroundColor: '#FFCD61',
    padding: 10,
    borderRadius: 15,
    height: 60,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
    width: 250,
    // marginLeft: '7%',
  },
  btnModalWrapperText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 35,
    // padding : 10,
  },
  imgPlaceholder: {
    width: '100%',
    height: 250,
    zIndex : -1,
    position : 'relative',
    opacity : 0.9,
  },  
});

export default Detail;
