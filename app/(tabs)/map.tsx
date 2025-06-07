import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import {
  getCurrentPositionAsync,
  LocationAccuracy,
  LocationObject,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import DangerReportBottomSheet from "../../components/dangerReportBottomSheet";
import { MarkerInfo, MarkerInfoRequest, Markers } from "../../types/markerInfo";
import { getMarkers, reportDisaster } from "../../service/markerService";
import { useMutation, useQuery } from "@tanstack/react-query";
import SuccessMessage from "../../components/successMessage";

const Map = () => {
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = React.useState<LocationObject | null>(null);
  const [appearBottomSheet, setAppearBottomSheet] = useState(false);
  const [selectedReport, setSelectedReport] = useState("");
  const mutation = useMutation({
  mutationFn: (data: MarkerInfoRequest) => reportDisaster(data),
  onSuccess: () => {
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  },
  onError: (error) => {
    console.error(error);
    Alert.alert("Erro ao enviar o relatório", "Ocorreu uma falha ao enviar seu relatório, tente novamente");
  },
  });
  const { data: reports } = useQuery<Markers>({
  queryKey: ['reports'],
  queryFn: getMarkers,
  });

  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef(null);
  const snapPoints = ["50%", "85%"];

  const handleOpenBottomSheet = () => {
    setAppearBottomSheet(true);
    // @ts-ignore
    bottomSheetRef.current?.expand();
  };

  const handleReport = () => {
    if (!selectedReport) return;
    if (!location) {
    console.warn('Localização não disponível');
    return;
    }

    const reportData: MarkerInfoRequest = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      desasterType: selectedReport, 
      markerType: "ward",
    };
  
    mutation.mutate(reportData);
  };

  async function getLocation() {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
        getLocation();
      watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (newLocation) => {
        setLocation(newLocation);
        mapRef.current?.animateCamera({
          pitch: 70,
          center: newLocation.coords,
        });
      }
    );
    console.log("Current position:", location);
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Você está aqui"
            icon={require("../../assets/images/user_marker.png")}
          />

          {reports?.markers.map((report) => (
            <Marker
              key={report.id}
              coordinate={{
                latitude: report.longitude,
                longitude: report.longitude,
              }}
              title={ report.markerType === "Disaster"
                ? `RISCO CRÍTICO:: ${report.desasterType}`
                : `Alerta: ${report.desasterType}`}
              icon={
                report.markerType === "Disaster"
                  ? require("../../assets/images/critical_marker.png")
                  : require("../../assets/images/danger_marker.png")
              }
            />
          ))}
        </MapView>
      )}
      {visible && (
        <SuccessMessage
          visible={visible}
          message="Relatório cadastrado com sucesso!"
          onHide={() => setVisible(false)}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={handleOpenBottomSheet}>
        <LinearGradient
          colors={["#FF3131", "#FF914D"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}>
          <Image source={require("../../assets/images/danger_report_icon.png")}/>
        </LinearGradient>
      </TouchableOpacity>

      {appearBottomSheet && (
        <DangerReportBottomSheet
          visible={appearBottomSheet}
          onClose={() => setAppearBottomSheet(false)}
          selectedReport={selectedReport}
          setSelectedReport={setSelectedReport}
          handleReport={handleReport}
          // @ts-ignore
          bottomSheetRef={bottomSheetRef}
          snapPoints={snapPoints}
        />
      )}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    flex: 1,
  },
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fabText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
  },
});
