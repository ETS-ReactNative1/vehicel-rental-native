import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {loginAction} from '../store/actions/auth';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(process.env.API_URL);
  const dispatch = useDispatch();
  const navigation = props.navigation;
  const loginHandler = () => {
    const body = {
      email_address: email,
      password: password,
    };
    dispatch(loginAction(body));
    console.log(body);
  };

  useEffect(() => {
    if (props.auth.isFulfilled === true) {
      navigation.navigate('NavBottom');
      console.log('login success');
    }
    if (props.auth.isRejected === true) {
      console.log('login failed');
    }
  }, [props.auth, navigation]);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/login.png')}
        resizeMode="cover"
        style={styles.image}>
        <Text
          style={styles.text}
          onPress={() => navigation.navigate('NavBottom')}>
          LET'S EXPLORE THE WORLD
        </Text>
          <View style={styles.containerFp}>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
            // value={email}
            placeholder="email"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setPassword(text)}
            // value={password}
            placeholder="password"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot password ?</Text>
          </TouchableOpacity>
        </SafeAreaView>
          <TouchableOpacity style={styles.btnLgn} onPress={loginHandler}>
            <Text style={styles.login}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signup}>
              Don't have account? Sign up now
            </Text>
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
    paddingLeft: 20,
    paddingTop: 60,
    flex: 1,
  },
  input: {
    height: 60,
    margin: 10,
    borderWidth: 0,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#DFDEDE',
  },
  containerFp: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    flex: 2,
    // marginTop:
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
    marginRight : '58%',
  },
  signup: {
    color: 'white',
    fontSize: 18,
  },
  btnLgn: {
    alignItems: 'center',
    backgroundColor: '#FFCD61',
    padding: 10,
    borderRadius: 15,
    height: 60,
    textAlign: 'center',
    marginBottom : 40,
    marginLeft : 10,
    marginRight : 10,
  },
  login: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 35,
  },
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

// export default Login;
export default connect(mapStateToProps)(Login);
