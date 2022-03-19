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
import {connect, useDispatch, useSelector} from 'react-redux';
import {loginAction} from '../store/actions/auth';
import {Formik} from 'formik';
import * as yup from 'yup';

const Login = props => {
  const token = useSelector(state => state.auth.userData.token);

  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [data, setData] = useState({
    email: '',
    password: '',
    check_inputChange: false,
    secureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true,
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

  // const loginValidationSchema = yup.object().shape({
  //   email: yup
  //     .string()
  //     .email("Please enter valid email")
  //     .required('Email Address is Required'),
  //   password: yup
  //     .string()
  //     .min(3, ({ min }) => `Password must be at least ${min} characters`)
  //     .required('Password is required'),
  // })

  // console.log('login token : ', token);
  if (token !== null) {
    () => {
      props.navigation.navigate('Home');
    };
  }

  const successToast = () => {
    ToastAndroid.showWithGravity(
      'Login Success',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  const failedToast = () => {
    ToastAndroid.showWithGravity(
      'Wrong Email / Password ',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const dispatch = useDispatch();
  const navigation = props.navigation;
  const loginHandler = () => {
    const body = {
      email_address: data.email,
      password: data.password,
    };
    dispatch(loginAction(body));
    // console.log(body);
  };

  useEffect(() => {
    if (props.auth.isFulfilled === true) {
      successToast();
      setTimeout(() => {
        navigation.navigate('NavBottom');
      }, 2000);
      console.log('login success');
    }
    if (props.auth.isRejected === true) {
      failedToast();
      console.log('login failed');
    }
  }, [props.auth, navigation]);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/login.png')}
        resizeMode="cover"
        style={styles.image}>
        <Text style={styles.text}>LET'S EXPLORE THE WORLD</Text>
        <View style={styles.containerFp}>
          {/* <Formik 
             validationSchema={loginValidationSchema}

            initialValues={{ email: '', password: '' }}
            onSubmit={loginHandler}
          >
             {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, loginHandler  }) => (

           <> */}
          <SafeAreaView>
            <TextInput
              style={styles.input}
              placeholder="Email"
              name="email"
              value={data.email}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={val => TextInputChange(val)}
              onEndEditing={e => handleValidUser(e.nativeEvent.text)}
              // onChangeText={handleChange('email', setEmail('email'))}
              // onBlur={handleBlur('email')}
            />

            {data.isValidEmail ? null : (
              <Text style={styles.errorMsg}>
                Email must be 4 characters long.
              </Text>
            )}

            {/* {errors.email &&
             <Text style={{ fontSize: 14, color: 'red', fontWeight: 'bold', marginLeft : 30, }}>{errors.email}</Text>
            } */}
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Password"
              name="password"
              value={data.password}
              autoCapitalize="none"
              onChangeText={val => handleValidPassword(val)}
              // value={password}
              // onChangeText={handleChange('password', setPassword('password'))}
              // onBlur={handleBlur('password')}
              // placeholderTextColor='black'
            />
            {data.isValidPassword ? null : (
              <Text style={styles.errorMsg}>
                Password must be 3 more characters long.
              </Text>
            )}
            {/* {errors.password &&
              <Text style={{ fontSize: 14, color: 'red', fontWeight: 'bold', marginLeft : 30, }}>{errors.password}</Text>
              } */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPassword}>Forgot password ?</Text>
            </TouchableOpacity>
          </SafeAreaView>
          <TouchableOpacity style={styles.btnLgn} onPress={loginHandler}>
            {/* // onPress={()=>loginHandler(setEmail(values.email), setPassword(values.password)), handleSubmit}
            // title="LOGIN"
            // disabled={!isValid} */}
            <Text style={styles.login}>Login</Text>
          </TouchableOpacity>
          {/* </>
            )}
        </Formik> */}

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signup}>Don't have account? Sign up now</Text>
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
    // opacity: 0.7,
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
    opacity: 0.8,
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
    marginRight: '58%',
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
    marginBottom: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  login: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 35,
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

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

// export default Login;
export default connect(mapStateToProps)(Login);
