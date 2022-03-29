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
import {co} from '../../modules/utils/auth';

export default function Checkotp({navigation}) {

  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState(null);


  const successToast = () => {
    ToastAndroid.showWithGravity(
      'Otp Checked',
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
  const forgotHandlerOtp = () =>{
    console.log('body emmail axiso : ',email)
    const body = {
      email : email,
      otp : otp,
    }
    
      co(body)
      .then((res) => {
        console.log(res.data.result)
        successToast();
        setTimeout(() => {
          navigation.navigate('Reset')
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
        </SafeAreaView>
        <View style={styles.containerFp}>
          <TouchableOpacity style={styles.btnLgn} onPress={forgotHandlerOtp}>
            <Text style={styles.login}> Check Otp </Text>
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

