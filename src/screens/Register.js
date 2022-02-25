import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

function Register({navigation}) {
  const [email, onChangeText] = useState('');
  const [phone, onChangePhone] = useState('');
  const [password, onChangePsd] = useState('');
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/signup.png')}
        resizeMode="cover"
        style={styles.image}>
        <Text style={styles.text}>LET'S HAVE SOME RIDE </Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={email}
            placeholder="email"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePhone}
            value={phone}
            placeholder="mobile phone"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePsd}
            value={password}
            placeholder="password"
          />
        </SafeAreaView>

        <View style={styles.containerFp}>
          <TouchableOpacity style={styles.btnLgn}>
            <Text style={styles.login}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.forgotPassword}>
              Have an account? Login now
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 32,
    width: 370,
    textAlign: 'left',
    lineHeight: 34,
    fontWeight: 'bold',
    padding: 60,
    flex: 1,
  },
  input: {
    height: 60,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#DFDEDE',
  },
  containerFp: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    flex: 2,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    color: '#000000',
  },
  forgotPassword: {
    color: 'white',
    fontSize: 18,
    textAlign: 'left',
  },
  btnLgn: {
    alignItems: 'center',
    backgroundColor: '#FFCD61',
    padding: 10,
    borderRadius: 15,
    height: 60,
    textAlign: 'center',
  },
  login: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 35,
  },
});

export default Register;
