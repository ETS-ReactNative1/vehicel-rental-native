import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {rp} from '../../modules/utils/auth';

export default function Reset({navigation}) {

  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState(null);
  const [password, setPassword] = useState(null);

  const successToast = () => {
    ToastAndroid.showWithGravity(
      'Password Change, please login',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  const failedToast = () => {
    ToastAndroid.showWithGravity(
      'Something wrong ',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };


  // console.log('body : ',body)
  console.log('body emmail : ',email)
  const forgotHandlerResetPass = () =>{
    console.log('body emmail axiso : ',email)
    const body = {
      email : email,
      otp : otp,
      password : password
    }
    
      rp(body)
      .then((res) => {
        console.log(res.data.result)
        successToast();
        setTimeout(() => {
          navigation.navigate('Login')
        }, 1500);
      }).catch((err) => {
        failedToast();
        console.log(err)
      });
    } 
  

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/fp.png')}
        resizeMode="cover"
        style={styles.image}>
        <Text style={styles.text}>THAT'S OKAY, WE GOT YOUR BACK</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="email"
            onChangeText={text => setEmail(text)}
          />
           <TextInput
            style={styles.input}
            value={otp}
            placeholder="otp"
            onChangeText={text => setOtp(text)}
          />
            <TextInput
            secureTextEntry={true}
            style={styles.input}
            value={password}
            placeholder="password"
            onChangeText={text => setPassword(text)}
          />
        </SafeAreaView>
        <View style={styles.containerFp}>
          <TouchableOpacity style={styles.btnLgn} onPress={forgotHandlerResetPass}>
            <Text style={styles.login}> Reset Password </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

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
    color: 'black',
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

