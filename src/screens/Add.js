import {
  SafeAreaView,
  Button,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {addVehicle} from '../modules/utils/vehicles';
import {useSelector} from 'react-redux';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'
// import AddImage from '../components/AddImage';
// import HandleImage from '../components/HandleImage';

export default function Add(props) {
  const token = useSelector(state => state.auth.userData.token);
  const ownerId = useSelector(state => state.auth.userData.id);

  console.log('tokn and id owner', token, ownerId)
  const [owner, setOwner]= useState(ownerId);
  const [name, onChangeName] = useState();
  const [type, onChangeType] = useState();
  const [brand, onChangeBrand] = useState();
  const [price, onChangePrice] = useState();
  const [capacity, onChangeCapacity] = useState();
  const [status, onChangeStatus] = useState();
  const [description, onChangeDescription] = useState();
  // const [qty, onChangeQty] = useState();
  // const [location, onChangeLocation] = useState();
  const [city, onChangeCity] = useState();
  const [number, onChangeNumber] = useState();
  const [counter, setCounter] = useState(1);
  const [selectedLoc, setSelectedLoc] = useState();
  const [selectedAddTo, setSelectedAddTo] = useState();
  const [images, setImages] = useState('');
  const [udpateData, setUdpateData] = useState();

  const successToast = () => {
    ToastAndroid.showWithGravity(
      'vehicel Add Success',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  const failedToast = () => {
    ToastAndroid.showWithGravity(
      'Add Vehicle Failed',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const addCounter = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
  };
  const subCounter = () => {
    const newCounter = counter - 1 < 0 ? 0 : counter - 1;
    setCounter(newCounter);
  };

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

  const handleAdd = () => {    
    // setOwner(ownerId);
    RNFetchBlob.fetch('POST', `${process.env.API_URL}/vehicles`, {
    'x-access-token': token,
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  }, [
    { 
      name :'images',
      type: images.type,
      filename: images.fileName,
      data: RNFetchBlob.wrap(images.uri),
      // uri: Platform.OS === 'android' ? images.uri.replace('file://', '') : images.uri,
    },
    { name : 'user_id', data : JSON.stringify(owner)},
    { name : 'name', data : name},
    { name : 'type', data : selectedAddTo},
    { name : 'price', data : number},
    { name : 'qty', data :  JSON.stringify(counter)},
    { name : 'location', data : selectedLoc},
    { name : 'description', data : description},
    { capacity : 'capacity', data : capacity},
    { status : 'status', data : status},
    { city : 'city', data : city},
    { brand : 'brand', data : brand},
  ])
    .then(response => {
        successToast();
        props.navigation.navigate('Home');
        console.log('img path formdata: ',response.images)
        console.log('response', response.json());
        console.log(res.data.result)
        // setUdpateData(response.data)
      //   const udpateDataVehicle ={
      //     id : response.data.id
      //     };        
      //   console.log('response udpate data :', udpateData, udpateDataVehicle);
       })
      .catch(error => {
        failedToast();
        console.log('error', error);
      })  
  }
 
  return (
    <ScrollView style={styles.bg}>
      {/* <HandleImage onPress={pic} /> */}
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
          <Image
            source={require('../assets/default-placeholder.png')}
            style={styles.imgPlaceholder}
          />
        )}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.btnAddPic}
          onPress={handleChoosePhoto}>
          <Text style={styles.AddPic}>Add Item</Text>
        </TouchableOpacity>
        {/* <Button title="Upload Photo" onPress={handleUploadPhoto} /> */}
      </View>
      <View>
      <Text style={styles.menuTitle}>Name</Text>
      <TextInput
        style={styles.inputNameProduct}
        onChangeText={onChangeName}
        value={name}
        placeholder="Type product name min. 30 characters"
        placeholderTextColor='black'
      />
      </View>
      <View>
        <Text style={styles.menuTitle}>Price</Text>
      <TextInput
        style={styles.inputNameProduct}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Type product price"
        placeholderTextColor='black'

        // keyboardType="numeric"
      />
      </View>
      <View>
        <Text style={styles.menuTitle}>Description</Text>
        <TextInput
          style={styles.inputNameProduct}
          onChangeText={onChangeDescription}
          value={description}
          placeholder="Description placeholder"
        placeholderTextColor='black'

          // keyboardType="numeric"
        />
        <View>
          <Text style={styles.menuTitle}>Location</Text>
          <View style={styles.locationWrapper}>
            <Picker
              style={styles.dropdownMenu}
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
            <Picker
              style={styles.dropdownMenu}
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
      </View>
      <TouchableOpacity
        style={styles.btnSave}
        onPress={handleAdd}>
          {/* onPress={() => navigation.navigate('Add')} */}
        <Text style={styles.saveBtn}>Add Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'white',
  },
  imgPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  imgWrapper: {
    width: 150,
    height: 150,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 40,
    // marginLeft : '30%',
  },
  inputNameProduct: {
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#393939',
    width: '80%',
    marginLeft: '8%',
    color : 'black',
  },
  menuTitle: {
    fontSize: 17,
    fontWeight: '900',
    margin: 10,
    paddingLeft: '6%',
    color : 'black',

  },
  counter: {
    fontSize: 17,
    fontWeight: '900',
    margin: 10,
    backgroundColor: '#FFCD61',
    borderRadius: 12,
    width: 25,
    color : 'black',

    height: 25,
    paddingLeft: 8,
  },
  counterText: {
    fontSize: 17,
    fontWeight: '900',
    margin: 10,
    color : 'black',

  },
  counterWrapper: {
    flexDirection: 'row',
    width: 385,
    marginTop: 20,
    color : 'black',

  },
  btnCounterWrapper: {
    marginLeft: '40%',
    flex: 1,
    textAlign: 'right',
    flexDirection: 'row',
    color : 'black',

  },
  btnAddPic: {
    alignItems: 'center',
    backgroundColor: '#393939',
    padding: 10,
    borderRadius: 15,
    height: 60,
    textAlign: 'center',
    width: '60%',
    color : 'black',

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
  btnSave: {
    alignItems: 'center',
    backgroundColor: '#FFCD61',
    padding: 10,
    borderRadius: 15,
    height: 60,
    textAlign: 'center',
    width: '80%',
    color : 'black',

    marginLeft: '8%',
    marginTop: 40,
    marginBottom: 60,
  },
  saveBtn: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 35,
  },
  locationWrapper: {
    width: 335,
    marginLeft: 30,
    borderWidth: 1,
    borderColor: '#393939',
    borderRadius: 15,
  },
});
