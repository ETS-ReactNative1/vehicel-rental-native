import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Platform,
    PermissionsAndroid,
    Button,
  } from 'react-native';
import React, {useState} from 'react'
import {addVehicle} from '../modules/utils/vehicles';
import { launchImageLibrary } from 'react-native-image-picker';
import {useSelector} from 'react-redux';


const createFormData = (photo, body = {}) => {

   // RNFetchBlob.fetch('POST', `${process.env.API_URL}/vehicles`, {
  //   // headers: {
  //     'x-access-token': token,
  //     Accept: 'application/json',
  //     'Content-Type': 'multipart/form-data',
  //     },[
  //       {
  //    name: images.fileName,
  //     type: images.type,
  //     uri: Platform.OS === 'android' ? images.uri.replace('file://', '') : images.uri,
  //     data : RNFetchBlob.wrap('images'),
  //       },
  //       {
  //         name : 'name', data : 'jazz',
  //       },
  //       {
  //         name : '', data : 'jazz',
  //       },
  //     ])
  // .then(response => {
  //   // response
  //   console.log('response', response);
  // })
  // .catch(error => {
  //   console.log('error', error);
  // });    
// };



  // const createFormData = (images, body) => {
    
    // Object.keys(body).forEach((key) => {
    //   data.append(key, body[key]);
    //   console.log('img data : ' ,data)
    // });
  //   return data;
  // };

  // const handleUploadPhoto = () => {

  //   const data = new FormData();
  //   console.log('createFormData: ', images);
  //   data.append('images', {
  //     name: images.fileName,
  //     type: images.type,
  //     uri:
  //       Platform.OS === 'android'
  //         ? images.uri.replace('file://', '')
  //         : images.uri,
  //   });
  //   data.append('name', 'name');
  //   console.log(data);

  //   const URL = `${process.env.API_URL}/vehicles`;
  //   console.log(URL)
  //   fetch(URL, {
  //     method: 'POST',
  //     body: data,
  //     headers: {
  //       'x-access-token': token,
  //       Accept: 'application/json',
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   })
  //     //  addVehicle(token,{ body: createFormData})
      

  //     .then(response => {
  //       // response
  //       console.log('response', response);
  //     })
  //     .catch(error => {
  //       console.log('error', error);
  //     });
  // };
    const data = new FormData();
  
    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
      console.log(data)
    });
  
    return data;
  };

export default function HandleImage() {
  const token = useSelector(state => state.auth.userData.token);
    const [photo, setPhoto] = React.useState(null);

    const handleChoosePhoto = () => {
      launchImageLibrary({ noData: true }, (response) => {
        console.log(response);
        if (response) {
          setPhoto(response);
        }
      });
    };
  
    const handleUploadPhoto = () => {
    //   fetch(`${SERVER_URL}/api/upload`, {
    //     method: 'POST',
    //     body: createFormData(photo, { userId: '123' }),
    //   })
         addVehicle(token,{ body: createFormData})
        .then((response) => response.json())
        .then((response) => {
          console.log('response', response);
        })
        .catch((error) => {
          console.log('error', error);
        });
    };
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop : 30 }}>
    {photo && (
      <>
        <Image
          source={{ uri: photo.assets[0].uri }}
          // style={{ width: 300, height: 300 }}
          style={styles.imgPlaceholder}
        />
        {/* <Button title="Upload Photo"
        onPress={handleUploadPhoto} /> */}
      </>
    ) !== null ? <Image
    source={{ uri: photo.assets[0].uri }}
    // style={{ width: 300, height: 300 }}
    style={styles.imgPlaceholder}
  /> :  <Image source={require('../assets/default-placeholder.png')}  style={styles.imgPlaceholder} />}
     <TouchableOpacity
       activeOpacity={0.5}
       style={styles.btnAddPic}
       onPress={handleChoosePhoto}>
       <Text style={styles.AddPic}>Add Item</Text>   
    </TouchableOpacity>
    {/* <Button title="Choose Photo" 
     style={styles.btnAddPic}
    onPress={handleChoosePhoto} /> */}
  </View>
  )
}

const styles = StyleSheet.create({
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
})