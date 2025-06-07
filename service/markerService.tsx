import { MarkerInfoRequest } from "../types/markerInfo"
import apiMarker from "./apiMarker"

export const getMarkers = async () => {
    const response = await apiMarker.get("/markers")
    return response.data
}

export const reportDisaster = async (data: MarkerInfoRequest) => {
    const response = await apiMarker.post("/report", {
        data: data
    })
}