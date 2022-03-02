import React from 'react';
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

export default function Profile() {
  return (
    <ScrollView>
      <View style={styles.user}>
        <Image source={require('../../assets/doe.png')} />
        <Text style={styles.name}>Samantha Doe</Text>
      </View>
      <View>
        <Text style={styles.menu}>Your Favourites</Text>
        <Text style={styles.menu}>FAQ</Text>
        <Text style={styles.menu}>Help</Text>
        <Text style={styles.menu}>Update Profile</Text>
      </View>

      <View>
        <TouchableOpacity style={styles.btnLgt}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    elevation: 4,
    marginTop: '4%',
    marginBottom: '14%',
  },
  menu: {
    fontWeight: '500',
    fontSize: 18,
    color: '#393939',
    marginTop: '4%',
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
    marginTop: '60%',
  },
  logout: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 35,
  },
});
