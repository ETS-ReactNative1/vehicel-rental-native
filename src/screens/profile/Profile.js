import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  View, TouchableOpacity , Alert, Modal, Pressable
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getUsers} from '../../modules/utils/users';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logoutAction} from '../../store/actions/auth';
import {logoutAuth} from '../../modules/utils/auth';
import { useFocusEffect } from '@react-navigation/native';

export default function Profile({navigation}) {

  const [user, setUser] = useState({});
  const [userImg, setUserImg] = useState();

  const token = useSelector(state => state.auth.userData.token);
  // console.log(token);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   getUsers(token)
  //     .then(res => {
  //       setUser({...res.data.result[0]});
  //       console.log('user data :', res.data.result[0]);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
         getUsers(token)
            .then(res => {
              setUser({...res.data.result[0]});
              console.log('user data :', res.data.result[0]);
            })
            .catch(err => {
              console.log(err);
            });
      },
      [],
    )
    
  )


  const onLogout = () => {
    // console.log('token', token);
    logoutAuth(token)
      .then(res => {
        dispatch(logoutAction());
        navigation.navigate('Login');
      })
      .catch(err => {
        console.log(err);
      });
  };

    const profilePic = user.image;
    const pic = {uri : `${process.env.API_URL}/${profilePic}`};
    
  return (
    <ScrollView style={styles.bg}>

    {token !== null ? 
    <>
      <View style={styles.user}>
        {profilePic  !== null ? 
        <Image source={pic}  style={styles.imgPlaceholder} />
        : <Image source={require('../../assets/default-placeholder.png')}
        style={styles.imgPlaceholder} /> }
        <Text style={styles.name}>{user.name}</Text>
      </View>
      <View>
        <Text style={styles.menu}>Your Favourites</Text>
        <Text style={styles.menu}>FAQ</Text>
        <Text style={styles.menu}>Help</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')}>
        <Text style={styles.menu}>Update Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
           const params = {
            address  : user.address,
            birthdate : user.dob,
            email : user.email_address,
            phone : user.mobile_number,
            name : user.name,
            gender : user.gender,
            usename : user.username,
            role : user.role,
            image : user.image,
          }
          const dataUser = user;
          navigation.navigate('EditProfile', params, user)}}>
        <Text style={styles.menu}>Update Profile</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.btnLgt}  onPress={() =>{ 
         setModalVisible(!modalVisible)}}>
        {/* onPress={onLogout} */}
          <Text style={styles.logout}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </>
    :
    <View>
      <View>
        <Text style={styles.titleBg}>You must be login</Text>
        </View>
    <TouchableOpacity style={styles.btnLgt}
     onPress={() =>navigation.navigate('Login')}>
      <Text style={styles.logout}>
        Login
      </Text>
    </TouchableOpacity>
  </View>
    }
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
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable> */}
            <Text style={styles.modalText}>Are you sure to Logout ?</Text>
            <TouchableOpacity  onPress={() => setModalVisible(!modalVisible)}
             style={styles.btnModalWrapper}>
                <Text  style={styles.btnModalWrapperText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.btnModalWrapper}  
            onPress={onLogout}>
                <Text  style={styles.btnModalWrapperText}>Yes</Text>
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
    {/* </ScrollView> */}
    {/* </> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#fff',
    color: 'black',
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
    flexDirection: 'row',
    // marginTop: '4%',
    marginBottom: '5%',
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    marginTop : 30,
  },
  menu: {
    fontWeight: '500',
    fontSize: 18,
    color: '#393939',
    marginTop: '4%',
    marginBottom: 10,
    marginLeft: '5%',
    flex: 1,
  },
  btnLgt: {
    alignItems: 'center',
    backgroundColor: '#FFCD61',
    padding: 10,
    borderRadius: 15,
    height: 60,
    textAlign: 'center',
    marginTop: '25%',
    width: 350,
    marginLeft: '7%',
  },
  logout: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 35,
    // padding : 10,
  },
  imgPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 75,
    marginLeft : 30,
    marginBottom : 20,
  },
  titleBg:{
    fontSize : 24,
    fontWeight : '600',
    textAlign : 'center',
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
    color: 'black',
    fontWeight: "bold",
    textAlign: "center",
    // color: '#000000',
    fontSize: 17,
    lineHeight: 35,
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
});
