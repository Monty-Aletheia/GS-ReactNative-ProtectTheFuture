import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { getCurrentPositionAsync, LocationAccuracy, LocationObject, requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location'
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { reportService } from '../../service/reportService';



const Map = () => {

  const [location, setLocation] = React.useState<LocationObject | null>(null);
  const [appearBottomSheet, setAppearBottomSheet] = useState(false);
  const [selectedReport, setSelectedReport] = useState("")
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef(null);
  const snapPoints = ['50%', '85%'];
  const reports = [
  { id: 1, type: "flood", latitude: -23.56, longitude: -46.63 },
  { id: 2, type: "fire", latitude: -23.55, longitude: -46.62 },
  { id: 3, type: "crime", latitude: -23.54, longitude: -46.61 },
];


  const handleOpenBottomSheet = () => {
    setAppearBottomSheet(true);
    // @ts-ignore
    bottomSheetRef.current?.expand()}

    const handleReport = () => {
  if (!selectedReport) return;
  switch (selectedReport) {
    case "fire":
      reportService.reportFire();
      break;
    case "flood":
      reportService.reportFlood();
      break;
    case "landslide":
      reportService.reportLandslide();
      break;
    case "crime":
      reportService.reportCrime();
      break;
  }
};

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

  return (
    <View style={styles.container}>
      { location &&
        <MapView style={styles.map} 
        >
          <Marker coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }} title="Você está aqui" icon={require("../../assets/images/user_marker.png")} />

          {reports.map((report) => (
          <Marker
            key={report.id}
            coordinate={{
              latitude: report.latitude,
              longitude: report.longitude,
            }}
            title={`Perigo: ${report.type}`}
            icon={require("../../assets/images/danger_marker.png")} 
          />
          ))}
        </MapView>
        
        }

        <TouchableOpacity style={styles.fab} onPress={handleOpenBottomSheet}>
        <LinearGradient
          colors={['#FF3131', '#FF914D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Image source={require("../../assets/images/danger_report_icon.png")}/>
        </LinearGradient>
      </TouchableOpacity>

      { appearBottomSheet && (
        <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true} 
        onClose={() => setAppearBottomSheet(false)}
        
        >
        <BottomSheetView>
          <View>
            <View className='p-4'>
              <Text className='text-xl font-black self-center'>Relatar Perigo</Text>
              <Text className='text-lg self-center'>Selecione o perigo encontrado</Text>
            </View>
            <View className="flex px-10 flex-col items-center gap-10 mt-14">

              <View className="flex-row justify-around w-full">
                <TouchableOpacity onPress={() => {setSelectedReport("landslide")}} className={`w-36 h-36 bg-red-500 rounded-3xl ${selectedReport === "landslide" ? " border-black border-2" : "border-none"}`} />
                <TouchableOpacity onPress={() => {setSelectedReport("crime")}} className={`w-36 h-36 bg-blue-500 rounded-3xl ${selectedReport === "crime" ? " border-black border-2" : "border-none"}`} />
              </View>
 
              <View className="flex-row justify-around w-full">
                <TouchableOpacity onPress={() => {setSelectedReport("fire")}} className={`w-36 h-36 bg-yellow-500 rounded-3xl ${selectedReport === "fire" ? " border-black border-2" : "border-none"}`} />
                <TouchableOpacity onPress={() => {setSelectedReport("flood")}} className={`w-36 h-36 bg-green-500 rounded-3xl ${selectedReport === "flood" ? " border-black border-2" : "border-none"}`} />
              </View>
            </View>
            <LinearGradient
              colors={['#ff4235', '#ff8348']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="self-center rounded-xl shadow-lg overflow-hidden mt-16 w-[50%]"
            >
              <TouchableOpacity
                onPress={handleReport}
                activeOpacity={0.8}
                className="p-4 rounded-xl py-"
                style={{ backgroundColor: 'transparent' }}
              >
                <Text className="text-white text-center font-semibold text-xl ">
                  Reportar
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            
          </View>
        </BottomSheetView>
      </BottomSheet>
    )}
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