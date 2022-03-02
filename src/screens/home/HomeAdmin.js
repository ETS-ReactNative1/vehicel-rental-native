import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';

export default function Home({navigation}) {
  const [search, onSearch] = useState('');
  const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];
  return (
    <View>
      <Image
        style={styles.tinyLogo}
        source={require('../../assets/homebg.png')}
      />
      <TextInput
        style={styles.input}
        onChangeText={onSearch}
        value={search}
        placeholder="search"
      />
      <SelectDropdown
        data={countries}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
      <TouchableOpacity style={styles.searchbtn}>
        <Text style={styles.searchtxt}>Search Vehicle</Text>
      </TouchableOpacity>
      <View>
        <Text>Recommended</Text>
        <TouchableOpacity>
          <Text>View more</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.addnew}
        onPress={() => navigation.navigate('Add')}>
        <Text style={styles.addnewtxt}>Add new item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 425,
    height: 250,
  },
  input: {
    height: 60,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#DFDEDE',
  },
  searchbtn: {
    alignItems: 'center',
    backgroundColor: '#FFCD61',
    padding: 10,
    borderRadius: 15,
    height: 60,
    textAlign: 'center',
  },
  searchtxt: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 35,
  },
  addnew: {
    alignItems: 'center',
    backgroundColor: '#393939',
    padding: 10,
    borderRadius: 15,
    height: 60,
    textAlign: 'center',
  },
  addnewtxt: {
    color: '#FFCD61',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 35,
  },
});
