import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, ScrollView, 
  ToastAndroid,
  SafeAreaView, FlatList,TouchableOpacity, Alert, Modal, Pressable, } from 'react-native';

import { Checkbox } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {getHistory} from '../modules/utils/history';
import {useSelector} from 'react-redux';
// import {registerAuth} from '../../src/modules/utils/auth';
import {delHistory} from '../../src/modules/utils/history';
import DeleteModal from '../components/DeleteModal';



export default function History({navigation}) {
  const id = useSelector(state => state.auth.userData.id);
  const token = useSelector(state => state.auth.userData.token);

  const [history, setHistory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalV, setModalV] = useState(false);

  const [deleteId, setDeleteId] = useState();

  // const [checkboxValue, setCheckboxValue] = useState([]);
  const [checked, setChecked] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState([]);


  const successToast = () => {
    ToastAndroid.showWithGravity(
      'Deleted Success',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  const failedToast = () => {
    ToastAndroid.showWithGravity(
      'Delete Failed',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  useEffect(() => {
    // const id = route.params.id;
    getHistory(token)
    .then((res) => {
      setHistory(res.data.result)
      console.log(res.data.result)
      setTimeout(() => {
        navigation.navigate('History')
      }, 1500);
     
      // setCheckboxValue(res.data.result.id)
      console.log(res.data.result.id)
    }).catch((err) => {
      console.log(err)
    });
  }, []);

  
  const  deleteHandle  = () => {
      const id = deleteId;
      delHistory(id)
        .then((res) => {
          successToast();
          console.log(res)
        }).catch((err) => {
      failedToast();
          console.log(err)
        });
    }



  // {history.length > 0 }

  const [products, setProducts] = useState(history);

  const handleChange = (id) => {
    let temp = products.map((product) => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setProducts(temp);
  };

  let selected = products.filter((product) => product.isChecked)

  const isBoxChecked = idx => {
    console.log('check : ',checked, typeof checked)
    return checked.includes(idx);
  };
  const handleChecker = idx => {
    const isChecked = isBoxChecked(idx);
    if (!isChecked) {
      const newArr = [...checked];
      newArr.push(idx);
      setChecked(newArr);
      // callback(newArr);
    } else {
      const index = checked.indexOf(idx);
      const newArr = [...checked];
      newArr.splice(index);
      console.log('bug 6');
      setChecked(newArr);
      // callback(newArr);
    }
  };
  
  return (
    <>
    <ScrollView style={style.bg}>
    {token !== null ? 
      <>
      <View>
      <Text style={style.titleBg}>History Order</Text>
      <View style={style.historyTitleTop}>
        <Text style={style.historyTitleToptxt}>A Week Ago</Text>
        <Text style={style.historyTitleToptxt}>Delete</Text>
      </View>
      </View>
        {history.length > 0 && history.map((historys, idx)=>{
        return (
          <>
          <View style={style.cardHistory} key={idx}>
            <View>
              <Image style={style.imageWrapper} source={require('../assets/detailbg.png')}/>    
            </View>
            <View style={style.textInfoWrapper}>
              <Text style={style.title}>{historys.vehicle_name}</Text>
              <Text style={style.titleNd}>{`${historys.end_date}` === null ?  'null' : `${historys.end_date}` }</Text>
              <Text style={style.title}>Prepayment : Rp. {historys.total_payment}</Text>
              <Text style={style.titleRd}>{`${historys.status}` === null ?  'null' : `${historys.status}` }</Text>
            </View>
            <View style={style.centeredView}>
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(true);
        }}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>Are you sure to delete ?</Text>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible) } style={style.btnModalWrapper}>
                <Text style={style.btnModalWrapperText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.btnModalWrapper } 
            onPress={deleteHandle}
            >
                <Text style={style.btnModalWrapperText}>Yes</Text>
            </TouchableOpacity>
          </View>
          <Text>id : </Text>
        </View>
      </Modal>
         <Pressable
        // style={[style.button, style.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
         <Checkbox style={style.Checkbox}
             unchecked = "black"
             color = "#FFCD61"
              status={checked ? checked : 'unchecked'}
              onPress={() => {
                console.log('id delete',historys.id)
                setChecked(!checked)
                setModalVisible(!modalVisible)
                setDeleteId(historys.id)
              }}
            onValueChange={() => checkboxHandler}
              />
      </Pressable>
    </View>

          <View>
      
          </View> 
          </View>
              </>
              )
            }) }
    </> :
      <View>
      <Text style={style.titleBg}>History Order</Text>
      <View>
        <Text>You might not have Transaction</Text>
      </View>
      <View>
      <TouchableOpacity style={style.btnLgt}>
        <Text style={style.logout} onPress={() => {navigation.navigate('Login')}}>
          Go to Login
        </Text>
      </TouchableOpacity>
    </View>
    </View>
    }
    </ScrollView>
    </>
    );
};

const style = StyleSheet.create({
  bg:{
    backgroundColor : 'white',
  },
  textInfoWrapper:{
    marginRight : 20,
    marginLeft: 10,
  },
  historyTitleTop:{
    flexDirection : 'row',
    width : 200,
    marginLeft : '28%',
  },
  historyTitleToptxt:{
    color : 'grey',
    fontSize : 14,
    fontWeight : '600',
    margin : 20,
    alignItems : 'center',
    width : 150,
  },
  imageWrapper:{
    borderRadius : 30,
    width: 100,
    height : 100,
    // margin : 10,
    marginLeft : 15,
  },
  title:{
    fontSize : 16,
    fontWeight: 'bold',
    color : 'black',
  },
  titleNd:{
    color : 'black',
    fontSize : 16,
  },
  titleRd:{
    fontSize : 16,
    color : '#087E0D',
  },
  Checkbox:{
    width : 40,
    height : 40,
    marginLeft : 20,
    color : 'black',
  },
  cardHistory :{
    flexDirection : 'row',
    alignItems : 'center',
    textAlign : 'center',
    width : '100%',
    marginTop : 20,
    marginBottom : 20,
    color : 'black',

  },
  titleBg:{
    fontSize : 24,
    fontWeight : '600',
    color: 'black',
    marginTop : 30, 
    textAlign : 'center',
  },
  btnLgt: {
    alignItems: 'center',
    backgroundColor: '#FFCD61',
    padding: 10,
    borderRadius: 15,
    height: 60,
    textAlign: 'center',
    marginTop: '25%',
    width: 350,
    color : 'black',
    marginLeft: '7%',
  },
  logout: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 35,
    // padding : 10,
  },
  centeredView: {
    width : '100%',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 15,
    height: 60,
    color : 'black',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
    width: 150,
  },
  buttonOpen: {
    backgroundColor: "#FFCD61",
  },
  buttonClose: {
    backgroundColor: "black",
    marginBottom : 50,
  },
  textStyle: {
    color: '#FFCD61',
    fontWeight: "bold",
    textAlign: "center",
    // color: '#000000',
    fontSize: 15,
    lineHeight: 35,
  },
  modalText: {
    marginBottom: 15,
    color: 'black',
    fontWeight: "bold",
    textAlign: "center",
    // color: '#000000',
    fontSize: 17,
    lineHeight: 35,
  },
  btnModalWrapper: {
    alignItems: 'center',
    backgroundColor: '#FFCD61',
    padding: 10,
    borderRadius: 15,
    height: 60,
    color : 'black',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
    width: 250,
    // marginLeft: '7%',
  },
  btnModalWrapperText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 35,
    // padding : 10,
  },
})

 {/* <View>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
        </View> */}

      {/* {history.length > 0 && 
      history.map((historys, idx)=>{
        return (
        <View key={idx}>
          <View style={style.cardHistory}>
            <View>
              <Image style={style.imageWrapper} source={require('../assets/detailbg.png')}/>    
            </View>
            <View>
              <Text style={style.title}>Vespa Matic</Text>
              <Text style={style.titleNd}>Jan 18 to 21 2021</Text>
              <Text style={style.title}>Prepayment : Rp. 245.000</Text>
              <Text style={style.titleRd}>Has been returned</Text>
            </View>
          <View>
            <Checkbox style={style.Checkbox}
             unchecked = "black"
             color = "#FFCD61"
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
              />
          </View> 
          </View>
            <View>
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
          </View>
      </View>
        );
      })} */}