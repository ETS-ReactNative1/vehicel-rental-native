import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {registerAuth} from '../../src/modules/utils/auth';

function Register({navigation}) {
  
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);

  const [data, setData] = useState({
    email: '',
    name: '',
    password: '',
    check_inputChange: false,
    secureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true,
    isValidName : true,
  });

  const TextInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_inputChange: true,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_inputChange: false,
        isValidEmail: false,
      });
    }
  };

  const handleValidUserName = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        name : val,
        isValidName: true,
      });
    } else {
      setData({
        ...data,
        name : val,
        isValidName: false,
      });
    }
  };

  //  {/* // (!fields["name"].match(/^[a-zA-Z]+$/))*/}
  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        isValidEmail: false,
      });
    }
  };

  const handleValidPassword = val => {
    if (val.trim().length >= 3) {
      // change lenght to 8
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };


  const successToast = () => {
    ToastAndroid.showWithGravity(
      'SignUp Success',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  const failedToast = () => {
    ToastAndroid.showWithGravity(
      'Rigeister Error',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const registerUser = async () => {
    try {
      const body = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      console.log(body);
      // console.log(register);
      const result = await registerAuth(body);
      // console.log(result.data);
      if (result.data.result) {
        console.log(result);
        successToast();
        navigation.navigate('Login');
      }
    } catch (err) {
      failedToast();
      console.log(err);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.containerKeyboard}>
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
                onChangeText={val => TextInputChange(val)}
                onEndEditing={e => handleValidUser(e.nativeEvent.text)}
                placeholderTextColor='black'
                // onChangeText={handleChange('email', setEmail('email'))}
                // onBlur={handleBlur('email')}
              />

              {data.isValidEmail ? null : (
                <Text style={styles.errorMsg}>
                  Email must be 4 characters long.
                </Text>
              )}
              <TextInput
                style={styles.input}
                onChangeText={text => setName(text)}
                // value={name}
                placeholder="username"
                onChangeText={val => handleValidUserName(val)}
                placeholderTextColor='black'

                // onEndEditing={e => handleValidUserName(e.nativeEvent.text)}
              />

              {data.isValidName ? null : (
                <Text style={styles.errorMsg}>
                  User name must be 4 characters long.
                </Text>
              )}

              <TextInput
                style={styles.input}
                onChangeText={text => setPassword(text)}
                // value={password}
                secureTextEntry={true}
                placeholder="password"
                placeholderTextColor='black'

                onChangeText={val => handleValidPassword(val)}
              />
              {data.isValidPassword ? null : (
                <Text style={styles.errorMsg}>
                  Password must be 3 more characters long.
                </Text>
              )}

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
    color : 'black',
  },
  containerFp: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    flex: 1,
    marginTop: 50,
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
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
  errorText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'red',
    marginLeft: 30,
  },
  errorMsg: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'red',
    marginLeft: 30,
    backgroundColor: 'white',
    // opacity: 0.8,
    padding: 10,
    borderRadius: 10,
    width: 300,
    // color: '#FF0000',
    // fontSize: 14,
  },
});

export default Register;
