import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
import { Checkbox } from 'react-native-paper';

export default function DeleteModal(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = React.useState([]);
  const [open, setOpen] = useState(false);

  // let {param} = route.params;

  // let idx = deleteId;
  // let a = setDeleteId;
  // console.log(idx, a);

  console.log(props.deleteId, props.setDeleteId);

  return (
    <View style={styles.centeredView}>
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(true);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={style.textStyle}>Close</Text>
            </Pressable> */}
            <Text style={styles.modalText}>Are you sure to delete ?</Text>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible) } style={styles.btnModalWrapper}>
                <Text style={styles.btnModalWrapperText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnModalWrapper }>
            {/* onPress={deleteHandle} */}
                <Text style={styles.btnModalWrapperText}>Yes</Text>
            </TouchableOpacity>
          </View>
          <Text>id : </Text>
        </View>
      </Modal>
         <Pressable
        // style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
         <Checkbox style={styles.Checkbox}
             unchecked = "black"
             color = "#FFCD61"
              status={checked ? checked : 'unchecked'}
              // status={isBoxChecked(historys.id)}
              onPress={() => {
                // const param = {
                //   id: historys.id,
                // };
                // // navigation.navigate(param)
                // console.log('id delete',param.id)
                setChecked(!checked)
                setModalVisible(!modalVisible)
                // setModalV(true)
              }}
              // value={checkbox.checked}
            onValueChange={() => checkboxHandler}
            // value={historys.isChecked}
            // onChange={() => {
            // handleChecker(historys.id)
            // }}
              />
        {/* <Text style={styles.textStyle}>Show Modal</Text> */}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
  Checkbox:{
    width : 40,
    height : 40,
    marginLeft : 20,
  },
});
