import {
    ScrollView,
    View,
    Text,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
  } from 'react-native';
  import React, {useState, useEffect} from 'react';
  // import SelectDropdown from 'react-native-select-dropdown';
  import {getVehicleCategory} from '../modules/utils/vehicles';

export default function Category() {

    const [vehicle, setVehicle] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    getVehicleCategory()
      .then((res) => {
        setVehicle(res.data.result.data[0])
        console.log('res catergory: ', res.data.result.data)
      }).catch((err) => {
        console.log(err)
      });
    }, []);

  return (
 <>
 <ScrollView>
 <View>
      <Text>Category</Text>
      <View style={styles.imageWrapper}>
        <Text style={styles.title}>Cars</Text>
      </View>
      {vehicle.length > 0 && isLoading ? (
        <FlatList
          data={vehicle}
          horizontal={true}
          renderItem={({item: vehicles}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  const param = {
                    id: vehicles.id,
                  };
                  navigation.navigate('Detail', param);
                }}>
                <Image
                  source={require('../assets/default-placeholder.png')}
                  style={styles.card}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={vehicles => vehicles.id}
        />
      ) : (
        <Image
          source={require('../assets/loadingimg.gif')}
          style={styles.loading}
        />
      )}

    </View>
 </ScrollView>
 </>
  )
}

const styles = StyleSheet.create({
 
    more: {
      flex: 1,
      // backgroundColor: 'grey',
      textAlign: 'right',
      color: '#000',
      padding : 20,
    },

imageWrapper: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 23,
    color: '#393939',
    marginTop: '4%',
    marginLeft: '5%',
    flex: 1,
  },
  // more: {
  //   fontSize: 14,
  //   fontWeight: '700',
  //   color: '#393939',
  //   marginVertical: '6%',
  //   marginRight: '5%',
  // },
  card: {
    width: 250,
    height: 150,
    borderRadius: 12,
    marginLeft: 15,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  loading: {
    width: 250,
    height: 150,
    marginLeft: 50,
  },

})