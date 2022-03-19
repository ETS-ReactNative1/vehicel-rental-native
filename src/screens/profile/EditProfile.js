import { View, Text, Image, TouchableOpacity, Button, ScrollView, StyleSheet,
TextInput ,  PermissionsAndroid, Alert, Modal, Pressable, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {useSelector} from 'react-redux';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditProfile({navigation, route}) {
  const token = useSelector(state => state.auth.userData.token);

  const [filePath, setFilePath] = useState({});

  const user =  route.params;
  const [name, onChangeName] = useState(null);
  const [images, setImages] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  // const [dob, setDob] = useState('');
  const [address, setAddress] = useState(null);
  const [checked, setChecked] = React.useState(null);

  const [selectedDay, setSelectedDay] = useState();

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  
  const successToast = () => {
    ToastAndroid.showWithGravity(
      "Updated Success",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  const failedToast = () => {
    ToastAndroid.showWithGravity(
      "Updated Failed",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'android');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  // const dateNow = new Date();
  const [dobUser] = date.toISOString().split('T');

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

  const captureImage = async (type) => {
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
      launchCamera(options, (response) => {
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
    launchImageLibrary({noData : true}, response => {
      // console.log('hadleChoosePhoto : ', response.assets[0]);
      if (response.didCancel) {
        return;
      }
      if(response){
        setImages(response.assets[0]);
      }
    })
  };


  const handleUpdate = () => {    
    let data = [];
    if (images)
    RNFetchBlob.fetch('PATCH', `${process.env.API_URL}/users`, {
    'x-access-token': token,
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  }, [
    { 
      name :'image',
      type: images.type,
      filename: images.fileName,
      data: RNFetchBlob.wrap(images.uri),
      // uri: Platform.OS === 'android' ? images.uri.replace('file://', '') : images.uri,
    },
    // if()
    { name : 'name', data : name},
    { name : 'email_address', data : email},
    { name : 'mobile_number', data : phone},
    { name : 'gender', data : checked},
    { name : 'address', data : address},
    { name : 'dob', data : dobUser},
  ])
    .then(response => {
      successToast();
        console.log('response', response);
        console.log('response', response.json());
        setTimeout(() => {
          navigation.navigate('Profile')
        }, 1500);
      })
      .catch(error => {
        failedToast();
        console.log('error', error);
      })  
  }
  const profilePic = user.image;
  const profile = user;

  const pic = {uri : `${process.env.API_URL}/${profilePic}`};
  console.log(profilePic, profile);
  return (
    <>
    <ScrollView style={styles.bg}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
        }}>
        {images &&
        (
          <>
            <Image source={{uri: images.uri}} style={styles.imgPlaceholder} />
          </>
        ) !== null ? (
          <Image source={{uri: images.uri}} style={styles.imgPlaceholder} />
        ) : (
          <View>
          {profilePic !== null ? 
            <Image source={pic}  style={styles.imgPlaceholder} />
            : 
            <Image source={require('../../assets/default-placeholder.png')}
            style={styles.imgPlaceholder} /> }
            </View>
        ) }
        <TouchableOpacity onPress={() =>{ 
         setModalVisible(!modalVisible)}}>
       <Image source={require('../../assets/pencilEdit.png')} style={styles.imgPic}/>
        </TouchableOpacity>
      </View>

    <View style={styles.Checkbox}>
      <View style={styles.CheckboxItem}>
      <RadioButton
        value="female"
        unchecked = "black"
        color = "#FFCD61"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('first')}
        />
      <Text>Female</Text>
      </View>
      <View style={styles.CheckboxItem}>  
      <RadioButton
        value="male"
        // value={`${user.gender}` == null ? `${user.gender}` : "male"}
        unchecked = "black"
        color = "#FFCD61"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('second')}
      />
      <Text>Male</Text>
      </View>
    </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.inputWrapperTitle}>Name : </Text>
          <View>
            <TextInput
                style={styles.inputBiodata}
                placeholder={user.name}
                onChangeText={onChangeName}
                placeholderTextColor='#323232'
                />
            </View>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputWrapperTitle}>Email Address : </Text>
          <View>
            <TextInput
                style={styles.inputBiodata}
                placeholder={user.email}
                onChangeText={setEmail}
                placeholderTextColor='#323232'
                />
            </View>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputWrapperTitle}>Phone Number : </Text>
          <View>
            <TextInput
                style={styles.inputBiodata}
                placeholder={user.phone}
                onChangeText={setPhone}
               placeholderTextColor='#323232'
                />
            </View>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputWrapperTitle}>Date of Birth : </Text>
          <View>
            {/* <TextInput
                style={styles.inputBiodata}
                placeholder="Date of Birth"
                /> */}
              <View style={styles.inputBiodata}> 
              {/* style={styles.datePicker}> */}
                <View>
                  <TouchableOpacity   onPress={showDatepicker} >
                  {/* // title="Show date picker! */}
                <Text style={styles.datePickerBtn}>
                Date of Birth
                  </Text>
                  </TouchableOpacity>
                </View>
                {show && (
                  <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  is24Hour={true}
                  display='default'
                  onChange={onChange}
                  // minimumDate={dateNow}
                  />
                  )}
              </View>
            </View>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputWrapperTitle}>Delivery Address : </Text>
          <View>
            <TextInput
                style={styles.inputBiodata}
                placeholder={user.address}
                onChangeText={setAddress}
                placeholderTextColor='#323232'
                />
            </View>
      </View>

      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(true);
        }}
      >
      <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
            {/* <Text style={styles.modalText}> ?</Text> */}
            <TouchableOpacity activeOpacity={0.5} 
            onPress={() => captureImage('photo')}  style={styles.btnModalWrapper}>
                <Text  style={styles.btnModalWrapperText}>Choose Photo from Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}
          onPress={handleChoosePhoto} style={styles.btnModalWrapper}>
                <Text style={styles.btnModalWrapperText}>Choose Image from Gallery</Text>
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

      <View>
        <TouchableOpacity style={styles.btn}
         onPress={handleUpdate}>
          <Text style={styles.btnSave}>
            Save change
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
    bg: {
        backgroundColor: '#fff',
      },
      name: {
        fontWeight: 'bold',
        fontSize: 23,
        color: '#393939',
        marginTop: '4%',
        marginLeft: '5%',
        flex: 1,
      },
      user: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#fff',
        alignItems : 'center',
        textAlign : 'center',
        borderWidth : 0,
      },
      imgPic:{
          alignItems : 'center',
          width : 40,
          height : 40,
          borderRadius : 10,
          top : -40,
          left : 50,
        //   marginLeft : '40%',
      },
      inputBiodata:{
        borderWidth: 1.5,
        backgroundColor : '#fff',
        borderColor: '#DFDEDE',
        borderRadius : 10,
        paddingLeft : 20,
        marginTop : 10,
        marginBottom : 10,
        width : '100%',
        // marginLeft : '10%',
        fontSize: 17,
        fontWeight : '500',
      },
      inputWrapper:{
        paddingLeft : 20,
        marginBottom : 20,
        width : '88%',
        marginLeft : '3%',
        fontSize: 17,
        fontWeight : '500',
      },
      inputWrapperTitle:{
        fontSize: 14,
        fontWeight : '500',
      },
      btn: {
        alignItems: 'center',
        backgroundColor: '#FFCD61',
        padding: 10,
        borderRadius: 15,
        height: 60,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 30,
        width: 350,
        marginLeft: '7%',
      },
      btnSave: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 35,
        // padding : 10,
      },
      btnAddPic: {
        alignItems: 'center',
        backgroundColor: '#393939',
        padding: 10,
        borderRadius: 15,
        height: 60,
        textAlign: 'center',
        width: '65%',
        marginTop: 40,
        marginBottom: 40,
        // marginLeft: '20%',
      },
      AddPic: {
        color: '#FFCD61',
        fontWeight: 'bold',
        fontSize: 17,
        lineHeight: 35,
      },
      imgPlaceholder: {
        width: 150,
        height: 150,
        borderRadius: 75,
      },
      Checkbox:{
        width : '100%',
        height : 40,
        flexDirection : 'row',
        alignItems : 'center',
        textAlign : 'center',
        marginLeft : '28%',
        marginBottom : 30,
      },
      CheckboxItem:{
        width : 100,
        height : 40,
        flexDirection : 'row',
        alignItems : 'center',
        textAlign : 'center',
        color : 'black',
        // marginLeft : '43%',
      },
      datePicker:{
        width: 150,
        marginLeft : 45,
        marginTop : 10,
        backgroundColor : 'white',
        color : '#DFDEDE',
      },
      datePickerBtn:{
        fontSize : 17,
        // lineHeight : 12,
        fontWeight : '500',
        backgroundColor : 'white',
        color : 'black',
        paddingTop : 12,
        height: 50,
        color : '#A9A9A9',
      },
      centeredView: {
        width : '100%',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
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
        backgroundColor: "#FFCD61",
      },
      buttonClose: {
        backgroundColor: "black",
        marginBottom : 50,
      },
      textStyle: {
        color: '#FFCD61',
        fontWeight: "bold",
        textAlign: "center",
        // color: '#000000',
        fontSize: 15,
        lineHeight: 35,
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
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
})