import {ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import ActiveChat from '../components/chat/ActiveChat';
import ChatUn from '../components/chat/Chat';
import {useSelector} from 'react-redux';

export default function Chat() {
  const token = useSelector(state => state.auth.userData.token);

  return (
    <View style={styles.bg}>
    {token !== null ? 
    <View>
   <ScrollView>
 <TextInput
   style={styles.input}
 placeholder="search" />
   <ActiveChat />
   <ChatUn />
    <Text style={styles.conv}>You have no conversation left</Text>
   </ScrollView>
   </View>
   : <View>
      <View>
        <Text  style={styles.titleBg}>You must be Login</Text>
      </View>
      <View>
      <TouchableOpacity style={styles.btnLgt}>
        <Text style={styles.logout} onPress={() => navigation.navigate('Login')}>
          Go to Login
        </Text>
      </TouchableOpacity>
    </View>
    </View>
    }
  </View>
  );
}

const styles = StyleSheet.create({
  bg:{
    backgroundColor : 'white',
    height : '100%',
  },
  input: {
    height: 60,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#DFDEDE',
  },
  conv:{
    marginLeft : '25%',
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
    fontSize: 24,
    lineHeight: 35,
    // padding : 10,
  },
  titleBg:{
    fontSize : 24,
    fontWeight : '600',
    textAlign : 'center',
  },
})
