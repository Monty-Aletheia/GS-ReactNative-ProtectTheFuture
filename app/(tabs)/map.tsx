import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useAuth } from "../../components/AuthProvider";
import DangerReportBottomSheet from "../../components/dangerReportBottomSheet";
import FAB from "../../components/FAB";
import SuccessMessage from "../../components/successMessage";
import { useLocation } from "../../hooks/useLocation";
import { useReportDisaster } from "../../hooks/useReporterDisaster";
import { getMarkers } from "../../service/markerService";
import { Markers } from "../../types/markerInfo";

const Map = () => {
  const [visible, setVisible] = useState(false);
  const [appearBottomSheet, setAppearBottomSheet] = useState(false);
  const [selectedReport, setSelectedReport] = useState("");
  const { userResponse } = useAuth()
  const queryClient = useQueryClient();
  const mutation = useReportDisaster(() => {
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  });
  const { data: reports } = useQuery<Markers>({
  queryKey: ['reports'],
  queryFn: getMarkers,
  });

  const mapRef = useRef<MapView>(null);
  const location = useLocation(mapRef);
  const bottomSheetRef = useRef(null);
  const snapPoints = ["50%", "85%"];

  const handleOpenBottomSheet = () => {
    setAppearBottomSheet(true);
    // @ts-ignore
    bottomSheetRef.current?.expand();
  };

  const handleReport = () => {
    if (!selectedReport || !location) return;

    mutation.mutate({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      desasterType: selectedReport,
      markerType: "ward",
      timestamp: new Date().toISOString(),
      description: userResponse?.user.id,
    });
  };

  useFocusEffect(()=>{
      queryClient.invalidateQueries({queryKey: ['reports']})}
    )

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
                latitude: report.latitude,
                longitude: report.longitude,
              }}
              title={ report.markerType === "Disaster"
                ? `RISCO CRÍTICO: ${report.desasterType}`
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

      <FAB onPress={() => handleOpenBottomSheet()} />

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
