import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getVehicleCategory} from '../modules/utils/vehicles';

export default function DetailsCategory({navigation, route}) {

  console.log('type catergory ?: ',route.params.type);
  const [vehicle, setVehicle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  console.log('vehicle', vehicle);

  const [pic, setPic] = useState(null);

  const getVehicle = () => {
    const type = route.params.type;
    getVehicleCategory(type)
      .then(res => {
        setIsLoading(true);
        // setVehicle([...vehicle, ...res.data.result.data]);
        setVehicle(res.data.result.data)
        // console.log(res)
        // setPic(res.data.result.data.images);
      })
      .catch(err => console.log(err));
  };

  // console.log('pic: ',pic, process.env.API_URL);
  // const picVehicle = {uri : `${process.env.API_URL}/${pic}`};

  // getVehicleType(type, currentPage)
  //     .then(res => {
  //       console.log('cek vehicle', res.data.result.data);
  //       // console.log('cek meta', res.data.result.meta.next);
  //       // console.log('cekcek', res.data.result.data);
  //       setIsSuccess(true);
  //       setVehicle([...vehicle, ...res.data.result.data]);
  //       setIsNext(true);
  //       setIsLoading(false);
  //       if (res.data.result.meta.next === null) {
  //         setIsNext(false);
  //         setIsLoading(false);
  //       }
  //     })

  useEffect(() => {
    getVehicle();
  }, []);
  return (
    <ScrollView style={styles.bg}>
    {/* <View style={styles.imageWrapper}> */}
        {/* <Text style={styles.title}>test</Text> */}
      {vehicle.length > 0 && isLoading ? (
        <FlatList
          data={vehicle}
          // horizontal={true}
          renderItem={({item: vehicles}) => {
            let linkpic = JSON.parse(vehicles.images);
            // console.log('car img fl :',vehicles.images, vehicles.id);
             const picVehicle = {uri : `${process.env.API_URL}/${linkpic}`};
            return (
              <View>
              <View style={styles.cardWrapper}>
                <View>

              <TouchableOpacity
                onPress={() => {
                  const param = {
                    id: vehicles.id,
                    image : vehicles.images,
                  };
                  navigation.navigate('Detail', param);
                }}>
                 {linkpic !== null ? 
                <Image source={picVehicle}  style={styles.imageWrapper} />
                : <Image source={require('../assets/default-placeholder.png')}
                style={styles.imageWrapper} /> }
              </TouchableOpacity>
                </View>
                <View style={styles.textInfoWrapper}>
                  <Text style={styles.title}>{vehicles.name}</Text>
                  <Text style={styles.titleNd}>{`${vehicles.capacity}` === null ?  'null' : `${vehicles.capacity}` }</Text>
                  <Text style={styles.title}>Location Speculations</Text>
                  <Text style={styles.titleRd}>{`${vehicles.status}` === null ?  'null' : `${vehicles.status}` }</Text>
                  <Text style={styles.title}>Price {vehicles.price}</Text>
                </View>
              </View>
              </View>
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

      
  </ScrollView>
  )
}


const styles = StyleSheet.create({
  bg:{
    backgroundColor : '#fff',
  },
  tinyLogo: {
    width: 425,
    height: 300,
  },
  cardWrapper:{
    flexDirection : 'row',
    alignItems : 'center',
    textAlign : 'center',
    width : '100%',
    marginTop : 20,
    marginBottom : 20,
    marginLeft: 20,
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
    backgroundColor: 'lightblue',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  // imageWrapper: {
  //   flexDirection: 'row',
  // },
  title: {
    fontWeight: 'bold',
    fontSize: 23,
    color: '#393939',
    marginTop: '4%',
    marginLeft: '5%',
    flex: 1,
  },
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
  imageWrapper:{
    borderRadius : 30,
    width: 120,
    height : 120,
    // margin : 10,
    marginLeft : 15,
    marginRight: 30,
  },
  title:{
    fontSize : 16,
    fontWeight: 'bold',
  },
  titleNd:{
    fontSize : 16,
  },
  titleRd:{
    fontSize : 16,
    color : '#087E0D',
  },
  })