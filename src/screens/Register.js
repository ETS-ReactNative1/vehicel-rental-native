import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ToastAndroid,
  TouchableOpacity, KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard, 
} from 'react-native';
import React, {useState} from 'react';
import {registerAuth} from '../../src/modules/utils/auth';

function Register({navigation}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Register Success",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const registerUser = async () => {
    try {
      const body = {
        email_address: email,
        name: name,
        password: password,
      };
      // console.log(body);
      // console.log(register);
      const result = await registerAuth(body);
      // console.log(result.data);
      if (result.data.result) {
        console.log(result);
        showToastWithGravity();
        navigation.navigate('Login');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <View style={styles.container}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.containerKeyboard}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ImageBackground
      source={require('../assets/signup.png')}
      resizeMode="cover"
      style={styles.image}>
        <Text style={styles.text}>LET'S HAVE SOME RIDE </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
            // value={email}
            placeholder="email"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setName(text)}
            // value={name}
            placeholder="username"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setPassword(text)}
            // value={password}
            secureTextEntry={true}
            placeholder="password"
          />

        <View style={styles.containerFp}>
          <TouchableOpacity style={styles.btnLgn} onPress={registerUser}>
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </View>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 5,
    justifyContent: 'center',
    // opacity: 0.8,
  },
  text: {
    color: 'white',
    fontSize: 32,
    width: 370,
    textAlign: 'left',
    lineHeight: 34,
    fontWeight: 'bold',
    padding: 40,
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
    flex: 1,
    marginTop : 50
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
  containerKeyboard: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  }
});

export default Register;
