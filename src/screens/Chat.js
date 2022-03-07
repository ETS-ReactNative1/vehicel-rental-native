import {ScrollView, View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import ActiveChat from '../components/chat/ActiveChat';
import ChatUn from '../components/chat/Chat';

export default function Chat() {
  return (

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
  );
}

const styles = StyleSheet.create({
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
})
