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
import {getAllVehicle} from '../../modules/utils/vehicles';
import { useSelector } from 'react-redux';
import AddProductBtn from '../../components/AddProductBtn';

import axios from 'axios';
export default function Home({navigation}) {
  const role = useSelector((state) => state.auth.userData.role);
  const [cars, setCars] = useState([]);
  const [motorbikes, setMotorbikes] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pic, setPic] = useState(null);

  const getVehicleType = () => {
    getAllVehicle()
      .then(
        axios.spread((...res) => {
          setIsLoading(true);
          setCars(res[0].data.result.data);
          setMotorbikes(res[1].data.result.data);
          setBikes(res[2].data.result.data);
          // console.log('home v : ',res)
          // console.log('img res home :  ',res[0].data.result.data[0].images);
          // const vImg = res[0].data.result.data[0].images;
          console.log(res)
          
          setPic(res[0].data.result.data[0].images);
        }),
        )
        .catch(err => console.log(err));
      };
      
      useEffect(() => {
        getVehicleType();
      }, []);
      
      // console.log('home v bikwe : ', bikes);
      console.log('pic: ',pic, process.env.API_URL);
      const picVehicle = {uri : `${process.env.API_URL}/${pic}`};
  return (
    <ScrollView style={styles.bg}>
      <View style={styles.search}>
      <ImageBackground
        source={require('../../assets/homebg.png')}
        style={styles.tinyLogo}
      >
       <TextInput
       style={styles.input}
       placeholder="search"
       placeholderTextColor = 'white'
       />
        { role === 1 && (
          <View>
          <AddProductBtn />
          </View>
        )}
      </ImageBackground>
      </View>

      <View style={styles.imageWrapper}>
        <Text style={styles.title}>Car</Text>
        <Text
          style={styles.more}
          onPress={() => {
            const param = {
              type: 'car',
            };
            navigation.navigate('DetailsCategory', param);
          }}>
          View More >
        </Text>
      </View>
      {cars.length > 0 && isLoading ? (
        <FlatList
          data={cars}
          horizontal={true}
          renderItem={({item: vehicles}) => {
            let linkpic = JSON.parse(vehicles.images)[0];
            // console.log('car img fl :',vehicles.images, vehicles.id);
             const picVehicle = {uri : `${process.env.API_URL}/${linkpic}`};
            return (
              <TouchableOpacity
                onPress={() => {
                  const param = {
                    id: vehicles.id,
                    image : vehicles.images,
                  };
                  navigation.navigate('Detail', param);
                }}>
                  {/* <Image source={{uri : `${process.env.API_URL}/${pic[0]}`}} style={styles.card} />  */}
                 {pic !== null ? 
                <Image source={picVehicle}  style={styles.card} />
                : <Image source={require('../../assets/default-placeholder.png')}
                style={styles.card} /> }
                {/* <Image
                  source={ require('../../assets/default-placeholder.png')}
                  style={styles.card}
                /> */}
              </TouchableOpacity>
            );
          }}
          keyExtractor={vehicles => vehicles.id}
        />
      ) : (
        <Image
          source={require('../../assets/loadingimg.gif')}
          style={styles.loading}
        />
      )}

      
      <View style={styles.imageWrapper}>
        <Text style={styles.title}>Motorbike</Text>
        <Text
          style={styles.more}
          onPress={() => {
            const param = {
              type: 'motorbike',
            };
            navigation.navigate('DetailsCategory', param);
          }}>
          View More >
        </Text>
      </View>
      {motorbikes.length > 0 && isLoading ? (
        <FlatList 
          data={motorbikes}
          horizontal={true}
          renderItem={({item: vehicles}) => {
            let linkpic = JSON.parse(vehicles.images)[0];
            // console.log('car img fl :',vehicles.images, vehicles.id);
             const picVehicle = {uri : `${process.env.API_URL}/${linkpic}`};
            return (
              <TouchableOpacity
                onPress={() => {
                  const param = {
                    id: vehicles.id,
                    image : vehicles.images,
                  };
                  navigation.navigate('Detail', param);
                }}>
                 {pic !== null ? 
                <Image source={picVehicle}  style={styles.card} />
                : <Image source={require('../../assets/default-placeholder.png')}
                style={styles.card} /> }
              </TouchableOpacity>
            );
          }}
          keyExtractor={vehicles => vehicles.id}
        />
      ) : (
        <Image
          source={require('../../assets/loadingimg.gif')}
          style={styles.loading}
        />
      )}
      <View style={styles.imageWrapper}>
        <Text style={styles.title}>Bike</Text>
        <Text
          style={styles.more}
          onPress={() => {
            const param = {
              type: 'bike',
            };
            navigation.navigate('DetailsCategory', param);
          }}>
          View More >
        </Text>
      </View>
      {bikes.length > 0 && isLoading ? (
        <FlatList
          data={bikes}
          horizontal={true}
          renderItem={({item: vehicles}) => {
            let linkpic = JSON.parse(vehicles.images)[0];
            // console.log('car img fl :',vehicles.images, vehicles.id);
             const picVehicle = {uri : `${process.env.API_URL}/${linkpic}`};
            return (
              <TouchableOpacity
                onPress={() => {
                  const param = {
                    id: vehicles.id,
                    image : vehicles.images,
                  };
                  navigation.navigate('Detail', param);
                }}>
                 {pic !== null ? 
                <Image source={picVehicle}  style={styles.card} />
                : <Image source={require('../../assets/default-placeholder.png')}
                style={styles.card} /> }
              </TouchableOpacity>
            );
          }}
          keyExtractor={vehicles => vehicles.id}
        />
      ) : (
        <Image
          source={require('../../assets/loadingimg.gif')}
          style={styles.loading}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg:{
    backgroundColor : '#fff',
  },
  tinyLogo: {
    width: 425,
    height: 300,
  },
  di: {
    width: 225,
    height: 150,
  },
  headerWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    marginTop: 15,
    padding: 8,
    color: '#000',
  },
  itemHeader: {
    flex: 1,
    // backgroundColor: 'lightblue',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
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
  input: {
    height: 60,
    // margin: 12,
    borderWidth: 0,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#393939',
    color : 'white',
    // placeholderTextColor : '#fff',
    // placeholderTextColor : '#ffffff',
    opacity : .5,
    width : '80%',
    marginLeft: '8%',
    marginBottom: 12,
    marginTop: 32,
    fontSize: 17,
    fontWeight : 'bold',
  },
  // search:{
  //   position: 'realative',
  // }
});
