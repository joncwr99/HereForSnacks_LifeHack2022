import React, { useState, useEffect }  from 'react';
import { StyleSheet, SafeAreaView, Text, View, Dimensions, FlatList } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useTailwind } from 'tailwind-rn';
import { SearchBar } from 'react-native-elements';
import getDirections from 'react-native-google-maps-directions';
import * as Location from 'expo-location';

export default mapPage = () => {
    const data = require('./stores.json');
    const tailwind = useTailwind();
    const [search, setSearch] = useState("");
    let [filteredDataSource, setFilteredDataSource] = useState([]);
    let [masterDataSource, setMasterDataSource] = useState([]);
    let [currentLocation, setCurrentLocation] = useState({});
    // setFilteredDataSource(data);
    // setMasterDataSource(data);
    useEffect(() => {
      setFilteredDataSource(data);
      setMasterDataSource(data);
      getCurrentLocation();
    }, []);

    const getCurrentLocation = async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();
    
      if (status !== 'granted') {
        Alert.alert(
          'Permission not granted',
          'Allow the app to use location service.',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      }
    
      let { coords } = await Location.getCurrentPositionAsync();
    
      if (coords) {
        const { latitude, longitude } = coords;
        // for (let item of response) {
        //   // let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
        let address = {
          "LATITUDE": latitude,
          "LONGITUDE": longitude,
        };
        setCurrentLocation(address);
      }
      
    };

    handleGetDirections = (chosenLocation) => {
      const data = {
         source: {
          latitude: currentLocation.LATITUDE,
          longitude: currentLocation.LONGITUDE
        },
        destination: {
          latitude: chosenLocation.LATITUDE,
          longitude: chosenLocation.LONGITUDE
        },
        params: [
          {
            key: "travelmode",
            value: "driving"        
          },
          {
            key: "dir_action",
            value: "navigate"       
          }
        ],
      }
      getDirections(data)
    }

    const searchFilterFunction = (text) => {
      if (text) {
        const newData = masterDataSource.filter(function (item) {
          const itemData = item.NAME.toUpperCase()
            ? item.NAME.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setFilteredDataSource(newData);
        setSearch(text);
      } else {
        setFilteredDataSource(masterDataSource);
        setSearch(text);
      }
    }; 

    const ItemView = ({ item }) => {
      return (
        // Flat List Item
        <Text style={styles.itemStyle} onPress={() => handleGetDirections(item)}>
          {item.NAME.toUpperCase()}
          {'\n'}
          {item.ADDRESS + ", Singapore " + item.POSTAL_CODE}
        </Text>
      );
    };

    const ItemSeparatorView = () => {
      return (
        // Flat List Item Separator
        <View
          style={{
            height: 0.5,
            width: '100%',
            backgroundColor: '#C8C8C8',
          }}
        />
      );
    };

    return (
      <Layout style={tailwind('flex-grow')}> 
        <Layout style={tailwind('flex-row justify-center h-24')}>
          <Text style={tailwind('font-bold text-[#a3080c] text-3xl top-8')}> Store Locations </Text>
        </Layout>
            <View style={styles.container}>
              <SearchBar
                round
                searchIcon={{ size: 24 }}
                onChangeText={(text) => searchFilterFunction(text)}
                onClear={(text) => searchFilterFunction('')}
                placeholder="Search for location..."
                value={search}
              />
              <FlatList
                data={filteredDataSource}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
              />
            </View>
        </Layout>
    );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  inputContainer: {
    width: '80%'
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#a12427',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  fieldTitle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'left',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  map: {
    width: Dimensions.get('window').width ,
    height: (Dimensions.get('window').height * 0.5),
    paddingBottom: 40,
  },
});