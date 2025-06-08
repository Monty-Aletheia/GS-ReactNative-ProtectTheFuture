import { MarkerInfoRequest, Markers } from "../types/markerInfo"
import apiMarker from "./apiMarker"

export const getMarkers = async () => {
    const response = await apiMarker.get("/markers")    
    return response.data
}

export const reportDisaster = async (data: MarkerInfoRequest) => {
    const response = await apiMarker.post("/send-marker", data)
    return response
}

export const getUserMarkersById = async (userId: string | undefined) => {
  const response = await apiMarker.get<Markers>("/markers");

  const userMarkers = response.data.markers.filter(
    (marker) => marker.description === userId
  );  
  return userMarkers;
};

export const deleteMarker = async (latitude: number, longitude: number, markerType: string) => {
  const response = await apiMarker.delete("/delete-marker", {
    data: {
      latitude: latitude,
      longitude: longitude,
      markerType: markerType,
      desasterType: "normal"
    }
  });

  return response.data;
};
