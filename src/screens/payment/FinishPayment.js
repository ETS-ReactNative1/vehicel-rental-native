import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  
} from 'react-native';
import React from 'react';
import {postPayment} from '../../modules/utils/payment';

export default function FinishPayment({navigation, route}) {
  const {body, paymentBody, payType, bookCode} = route.params;
  const a = paymentBody.date.toDateString();
  const email_address = body.email;
  const user = body.name;
  const userId = body.id;
  const vehicleId = paymentBody.id;
  console.log('bohadlankmsd: ', userId, vehicleId);

  const [withoutTime] = paymentBody.date.toISOString().split('T');
  const successToast = () => {
    ToastAndroid.showWithGravity(
      "Transaction Success",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  const failedToast = () => {
    ToastAndroid.showWithGravity(
      "Transaction Failed",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  // console.log(withoutTime);
  // const startDate = withoutTime.toDateString();
  // console.log('user id : ', body.id);
  const paymentHandler = () => {
    const body = {
      //  email_address,
      user,
      user_payment_id: userId,
      vehicle_payment_id: vehicleId,
      destination: paymentBody.location,
      vehicle_name: paymentBody.bikes,
      total_payment: paymentBody.price,
      start_date: withoutTime,
      prepayment: payType.paymentType,
      booking_code: bookCode.code,
    };
    console.log(body);

    postPayment(body)
      .then(res => {
        successToast();
        console.log(res);
        console.log(res.data);
      })
      .catch(err => {
        failedToast();
        console.log(err);
      });
  };

  return (
    <>
    <TouchableOpacity onPress={()=>navigation.goBack()}>
      <Text>Back</Text>
    </TouchableOpacity>
    <ScrollView>
      <View style={styles.bg}>
        {/* <ScrollView> */}
        <View>
          <Image
            source={require('../../assets/thirdstep.png')}
            style={styles.step}
          />
        </View>
        <View>
          <Text style={styles.codeTitle}>Payment Code:</Text>
          <Text style={styles.code}>90887620</Text>
          <Text style={styles.timerTitle}>
            Insert your payment code while you transfer booking order Pay before
            : {body.email}
            {body.name}
          </Text>
          <Text style={styles.statusTime}>1:59:34</Text>
          <Text style={styles.bankInfo}>Bank account information :</Text>
          <Text style={styles.bankCode}>0290-90203-345-2</Text>
          <Text style={styles.rentalName}>Vespa Rental Jogja</Text>
        </View>

        <View>
          <Text style={styles.infoCode}>
            Booking code :<Text style={styles.status}>{bookCode.code}</Text>
          </Text>
          <Text style={styles.timerTitle}>
            Use booking code to pick up your vespa
          </Text>

          <TouchableOpacity
            style={styles.FinPay}
            // onPress={() => navigation.navigate('Home')}
            onPress={() => Clipboard.setString(`${bookCode.code}`)}>
            <Text style={styles.FinPayBtn}>Copy Payment & Booking Code</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.desc}>
          <Text style={styles.info}>{paymentBody.bikes} Vespa</Text>
          <Text style={styles.info}>{payType.paymentType}</Text>
          <Text style={styles.info}>{paymentBody.day} days</Text>
          <Text style={styles.info}>{withoutTime} to Jan 22 2021</Text>
          <Text style={styles.price}>Rp.{paymentBody.price}</Text>
        </View>

        {/* </ScrollView> */}
        <TouchableOpacity
          style={styles.btnGetPay}
          onPress={() => {
            navigation.navigate('Success', {body, paymentBody, payType});
            paymentHandler();
          }}>
          <Text style={styles.payBtn}>Finish Payment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </>
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
    marginLeft: '13%',
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    marginBottom: 5,
    color: '#087E0D',
  },
  statusTime: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
    color: 'red',
  },
  FinPay: {
    alignItems: 'center',
    backgroundColor: '#FFCD61',
    padding: 10,
    borderRadius: 15,
    height: 60,
    textAlign: 'center',
    width: '80%',
    marginLeft: '10%',
    marginTop: 10,
    marginBottom: 5,
    // marginBottom: 60,
  },
  FinPayBtn: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 35,
  },
  desc: {
    paddingLeft: 40,
    marginTop: 10,
    marginBottm: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 26,
    lineHeight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  btnGetPay: {
    alignItems: 'center',
    backgroundColor: '#FFCD61',
    padding: 10,
    borderRadius: 15,
    height: 60,
    textAlign: 'center',
    width: '80%',
    marginLeft: '10%',
    marginTop: 10,
    marginBottom: 20,
  },
  payBtn: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 35,
  },
  code: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  codeTitle: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  bankCode: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  bankInfo: {
    fontSize: 14,
    color: '#616167',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  timerTitle: {
    fontSize: 14,
    color: '#616167',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: '12%',
    width: '75%',
  },
  rentalName: {
    fontSize: 18,
    color: '#616167',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  infoCode: {
    fontSize: 18,
    color: '#616167',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
});
