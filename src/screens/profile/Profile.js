import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from "react-redux";
import {getUsers} from "../../modules/utils/users";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const [ user, setUser] = useState({});
  const token = useSelector((state) => state.auth.userData.token);
  console.log(token)

  const logoutAction = async () => {
    try {
        await AsyncStorage.removeItem('token');
        // setFoundToken('');
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getUsers(token)
    .then((res) => {
      setUser({...res.data.result[0]})
      console.log(res)
    }).catch((err) => {
      console.log(err)
    });
  }, []);

  return (
    <ScrollView style={styles.bg}>
      <View style={styles.user}>
        <Image source={require('../../assets/doe.png')} />
        <Text style={styles.name}>{user.name}</Text>
      </View>
      <View>
        <Text style={styles.menu}>Your Favourites</Text>
        <Text style={styles.menu}>FAQ</Text>
        <Text style={styles.menu}>Help</Text>
        <Text style={styles.menu}>Update Profile</Text>
      </View>

      <View>
        <TouchableOpacity style={styles.btnLgt}>
          <Text style={styles.logout} onPress={logoutAction}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
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
    height: 50,
    textAlign: 'center',
    marginTop: '50%',
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
});
