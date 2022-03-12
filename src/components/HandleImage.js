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
    const data = new FormData();
  
    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
    console.log(data)
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    {photo && (
      <>
        <Image
          source={{ uri: photo.assets[0].uri }}
          style={{ width: 300, height: 300 }}
        />
        <Button title="Upload Photo" onPress={handleUploadPhoto} />
      </>
    )}
    <Button title="Choose Photo" onPress={handleChoosePhoto} />
  </View>
  )
}