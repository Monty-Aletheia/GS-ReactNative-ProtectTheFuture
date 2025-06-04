import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { getCurrentPositionAsync, LocationAccuracy, LocationObject, requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location'
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';


const Map = () => {

  const [location, setLocation] = React.useState<LocationObject | null>(null);
  const mapRef = useRef<MapView>(null);

  async function getLocation() {
    const { granted } = await requestForegroundPermissionsAsync();

    if(granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      console.log("Location permission granted. Current position:", currentPosition);
      
      console.log("Current position:", location);
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
  }, []);

  return (
    <View style={styles.container}>
      { location &&
        <MapView style={styles.map} 
        >
          <Marker coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }} title="Você está aqui" icon={require("../../assets/images/user_marker.png")} />

          </MapView>
        
        }
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
  }
})