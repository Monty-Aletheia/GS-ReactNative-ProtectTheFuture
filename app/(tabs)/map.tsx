import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { getCurrentPositionAsync, LocationAccuracy, LocationObject, requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location'
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';


const Map = () => {

  const [location, setLocation] = React.useState<LocationObject | null>(null);
  const mapRef = useRef<MapView>(null);

  async function getLocation() {
    const { granted } = await requestForegroundPermissionsAsync();

    if(granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      console.log("Location permission granted. Current position:", currentPosition);
      
      
    }
  
  }

  useEffect(() => {
    getLocation();
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1,
    }, (newLocation) => {
      setLocation(newLocation);
      mapRef.current?.animateCamera({
        pitch: 70,
        center: newLocation.coords
      })
    })
    console.log("Current position:", location);
  }, []);
  
  const handlePress = () => {
    console.log('Botão pressionado!');
  };

  return (
    <View style={styles.container}>
      { location &&
        <MapView style={styles.map} 
        >
          <Marker coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }} title="Você está aqui" icon={require("../../assets/images/user_marker.png")} />

          <Marker coordinate={{
            latitude: -23.550520,
            longitude: -46.633308,
          }} title="São Paulo" icon={require("../../assets/images/user_marker.png")} />

          </MapView>
        
        }

        <TouchableOpacity style={styles.fab} onPress={handlePress}>
        <LinearGradient
          colors={['#FF3131', '#FF914D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Image source={require("../../assets/images/danger_report_icon.png")}/>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  map: {
    width: '100%',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
})