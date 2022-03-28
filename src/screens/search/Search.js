import { View, Text, TextInput, StyleSheet, FlatList, ScrollView,
  Image,  TouchableOpacity, SafeAreaView} from 'react-native'
import React, {useState, useRef, useEffect} from 'react'
import {getVehicleCategory, getVehicles} from '../../modules/utils/vehicles';

// const data = [
//   {id : 1, name : 'ipul'},
//   {id : 2, name : 'iqbal'},
//   {id : 3, name : 'agus'},
//   {id : 4, name : 'ojan'}
// ]

export default function Search({navigation}) {

  const [vehicle, setVehicle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const [stateSearch, setStateSearch] = useState({ data: []})
  
  // console.log('vehicle', vehicle);

  const [pic, setPic] = useState(null);

  const { data } = vehicle;
  console.log(vehicle)

  const getVehicle = () => {
    // const type = route.params.type;
    let type = "";
    let limit = 10;
    getVehicles(type, limit)
      .then((res, data) => {
        setIsLoading(true);
        console.log('get Vehicles : ', res.data.result)
        setVehicle(res.data.result)
        // setVehicle([...vehicle, ...res.data.result.data]);
        // console.log('data search : ' , data)
        // console.log('data search 2: ' , res.data.result)
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

  console.log('searh base : ',vehicle)

  const searchFilterData = text 
  ? vehicle.filter(item=>{
    const itemData = item.name;
    const textData = text;
    return itemData.indexOf(textData) > -1;
  }): vehicle;
  // console.log('data filetr :' ,data, vehicle)

  //Just for testing separatir item
  const itemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          // backgroundColor: 'red',
        }}
      />
    );
  };

  // const [dataFromState, setData] = useState(data);

  // const item = ({item}) =>{
  //   return (
  //   <View>
  //     <Text>{item.name}</Text>
  //   </View>
  //   )
  // }

  // const searchName = (input)=>{
  //   let data = dataFromState
  //   let searchData = data.filter((item)=>{
  //     return item.name.toLowerCase().includes(input.toLowerCase())
  //   })
  //   setData(searchData)
  // }

  return (
    // <View> 

    // <View>
    // <TextInput
    //     style={styles.input}
    //     placeholder="search" 
    //     onChangeText={(input)=>{
    //       searchName(input)
    //     }}
    //     />
    // </View>

    //   <FlatList 
    //   data={dataFromState}
    //   renderItem={item}
    //   keyExtractor={(item, index)=> index.toString()}
    //   />
    // </View>
    <>
    <TouchableOpacity onPress={()=>navigation.goBack()}>
      <View style={styles.backBtn}>
      <Image source={require('../../assets/back-arrow.png')} style={styles.backBtnImg}/>
      <Text style={styles.backBtnTxt}>Back</Text>
      </View>
    </TouchableOpacity>

    <SafeAreaView style={styles.bg}>
      {isLoading === true ? (
      <View>
        <View style={styles.MainContainer}>
          <TextInput
            style={styles.inputSearchBar}
            onChangeText={text => setText(text)}
            value={text}
            // underlineColorAndroid="transparent"
            placeholder="Search Here"
            placeholderTextColor ='white'
          />
            <View>
           <TouchableOpacity style={styles.btnAdd} onPress={()=> navigation.navigate('FilterProduct')}>
             <Image source={require('../../assets/filter-icon.png')} style={styles.filterIcon} /> 
              <Text style={styles.AddBtn}>Filter</Text>
          </TouchableOpacity> 
              </View>
          <FlatList
            data={searchFilterData}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={itemSeparator}
            renderItem={({ item }) =>{ 
              let linkpic = JSON.parse(item.images);
              // console.log('car img fl :',vehicles.images, vehicles.id);
               const picVehicle = {uri : `${process.env.API_URL}/${linkpic}`};
              return (
                <View>
                <View style={styles.cardWrapper}>
                  <View>
  
                <TouchableOpacity
                  onPress={() => {
                    const param = {
                      id: item.id,
                      image : item.images,
                    };
                    navigation.navigate('Detail', param);
                  }}>
                   {linkpic !== null ? 
                  <Image source={picVehicle}  style={styles.imageWrapper} />
                  : <Image source={require('../../assets/default-placeholder.png')}
                  style={styles.imageWrapper} /> }
                </TouchableOpacity>
                  </View>
                  <View style={styles.textInfoWrapper}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.titleNd}>Capacity {`${item.capacity}` === null ?  'null' : `${item.capacity}` }</Text>
                    <Text style={styles.title}>Location Speculations</Text>
                    <Text style={styles.titleRd}>{`${item.status}` === null ?  'null' : `${item.status}` }</Text>
                    <Text style={styles.title}>Price Rp.{item.price}</Text>
                  </View>
                </View>
                </View>
              // <Text style={styles.row}>{item.name}</Text>
              );
            }}
            style={{ marginTop: 10 }}
          />
        </View>
    </View>
     ) : (
      <Image
        source={require('../../assets/loadingimg.gif')}
        style={styles.loading}
      />
      )}
    </SafeAreaView>

    </>
  )
}


const styles = StyleSheet.create({
  backBtn:{
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop : 20,
    marginLeft : 20,
  },
  backBtnImg:{
    width : 40,
    height : 40,
  },
  backBtnTxt:{
    color : 'black',
    fontWeight : 'bold',
    fontSize : 20,
    lineHeight : 37,
  },
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
    width: 300,
    height: '100%',
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
  input: {
    height: 60,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#DFDEDE',
  },
  btnAdd: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
    height: 60,
    textAlign: 'center',
    // width : '150',
    marginLeft: '8%',
    flexDirection : 'row',
  },
  AddBtn: {
    color : '#393939',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 35,
  },
  filterIcon:{
    width : 25,
    height: 25,
    marginRight: 20,
  },
  inputSearchBar: {
    height: 60,
    // margin: 12,
    borderWidth: 0,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#393939',
    color : 'white',
    // placeholderTextColor : '#fff',
    // placeholderTextColor : '#ffffff',
    opacity : .3,
    width : '80%',
    marginLeft: '8%',
    marginBottom: 12,
    marginTop: 32,
    fontSize: 17,
    // fontWeight : 'bold',
  },      
  })
  

// const styles = StyleSheet.create({
//   input: {
//     height: 60,
//     margin: 12,
//     borderWidth: 0,
//     padding: 10,
//     borderRadius: 15,
//     backgroundColor: '#DFDEDE',
//   },
// })

      {/* ) : (
        <Text>loading</Text>
      )} */}

        {/* <View>
          <TextInput
            style={styles.input}
            placeholder="search" 
            onChangeText={(input)=>{
              searchName(input)
            }}
            />
        </View> */}
          
    {/* <View style={styles.imageWrapper}> */}
        {/* <Text style={styles.title}>test</Text> */}
      {/* {vehicle.length > 0 && isLoading ? (
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
         */}
