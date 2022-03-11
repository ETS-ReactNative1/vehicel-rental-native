import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';

const AddImage = () => {
  const [image, setImage] = useState();
  const [imageState, setImageState] = useState();
  const [filePath, setFilePath] = useState({});

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
        if (response.assets[0].uri) {
            // console.log('BERHASIL', response);
            setPhoto(response.assets[0].uri);
            setImage(response.assets[0].uri);
          }

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

  // const options = {
  //   noData: true,
  //   mediaType: 'photo' 
  //   //as const
  // }
  // launchImageLibrary(options, (response) => {
  //   if (response.assets) {
  //     const imageAssetsArray = response.assets[0].uri
  //     setImageState(imageAssetsArray)
  //   }
  // })
  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
        const imageAssets = response.assets[0].uri
        console.log('Response = ', response, imageAssets);

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
  };

  return (
    <> 
    {/* style={{flex: 1}} */}
      {/* <Text style={styles.titleText}>
        Example of Image Picker in React Native
      </Text> */}
      <View style={styles.container}>
        <Image
          source={{
            uri: 'data:image/jpeg;base64,' + filePath.data,
          }}
          style={styles.imageStyle}
        />
        <View style={styles.imgWrapper}>
       {/* <Image
        source={require('../assets/default-placeholder.png')}
        style={styles.imgPlaceholder}
        /> */}
        <Image
          // source={{uri: filePath.assets[0].uri}  !== null ? {uri: filePath.assets[0].uri} : 'null'}
          source={{uri: filePath.uri} !== null ? {uri: filePath.uri} : require('../assets/default-placeholder.png')}
          style={styles.imgPlaceholder}
          />
        <Text style={styles.textStyle}>{filePath.uri}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.btnAddPic}
          onPress={() => captureImage('photo')}>
          <Text style={styles.AddPic}>
            Add Item Launch Camera 
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.btnAddPic}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.AddPic}>Add Item</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddImage;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    // paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 100,
    height: 100,
    // margin: 5,
  },
  btnAddPic: {
    alignItems: 'center',
    backgroundColor: '#393939',
    padding: 10,
    borderRadius: 15,
    height: 60,
    textAlign: 'center',
    width : '60%',
    // marginLeft: '20%',
    marginTop: 10,
    marginBottom: 10,
  },
  AddPic: {
    color : '#FFCD61',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 35,
  },
  imgPlaceholder:{
    width : 150,
    height: 150,
    borderRadius : 75,
  },
  imgWrapper:{
    width : 150,
    height: 150,
    borderRadius : 50,
    // marginLeft : '5%',
    // marginTop : 40,
  },
});