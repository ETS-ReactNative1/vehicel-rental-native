import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';

export default function GetPayment({navigation, route}) {
  const {body, paymentBody, payType} = route.params;
  console.log('test body :', body);
  console.log('payement body :', paymentBody);
  console.log('payement body :', payType);
  const a = paymentBody.date.toDateString();
  console.log(a);
  const [codeBook, setCodeBook] = useState(null)

  // paymentBody.bikes) etc

 useEffect(() => {
  const length = 10;
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( let i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    setCodeBook(result);
 }, []);

    // console.log(code)
// setCodeBook = getRandomString(10);
// console.log(codeBook) ;
//usage: getRandomString(20);

  return (
    <ScrollView style={styles.bg}>
      <View>
        <Image
          source={require('../../assets/secondstep.png')}
          style={styles.step}
        />
      </View>
      <Text style={styles.infoCode}>Your Booking Code :</Text>
      <Text style={styles.code}>{codeBook}</Text>
      <View>
        <Image
          source={require('../../assets/detailbg.png')}
          style={styles.pic}
        />
      </View>
      <View style={styles.desc}>
        <Text style={styles.info}>{paymentBody.bikes} Vespa</Text>
        <Text style={styles.info}>{payType.paymentType}</Text>
        <Text style={styles.info}>{paymentBody.day} days</Text>
        <Text style={styles.info}>{a} to Jan 22 2021</Text>
        <Text style={styles.price}>Rp.{paymentBody.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.btnGetPay}
        onPress={() => {
            const bookCode = {
            code: codeBook,
          };
          navigation.navigate(
            'FinishPayment',
            // params
            {body, paymentBody, payType, bookCode},
          );
        }}>
        <Text style={styles.payBtn}>Finish Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'white',
  },
  step: {
    width: 300,
    height: 100,
    marginTop: '10%',
    marginLeft: '5%',
  },
  pic: {
    width: 380,
    height: 200,
    marginLeft: '4%',
    marginBottom: 20,
    borderRadius: 20,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 35,
  },
  desc: {
    paddingLeft: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  btnGetPay: {
    alignItems: 'center',
    backgroundColor: '#FFCD61',
    padding: 10,
    borderRadius: 15,
    height: 60,
    textAlign: 'center',
    width: '80%',
    marginLeft: '8%',
    marginTop: 30,
    // marginBottom: 60,
  },
  payBtn: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 35,
  },
  code:{
    fontSize: 26,
    fontWeight : 'bold',
    color: '#087E0D',
    textAlign : 'center',
    marginTop : 10,
    marginBottom : 15,
    },
    infoCode: {
      textAlign : 'center',
      fontSize: 16,
      marginBottom: 5,
    },
});
