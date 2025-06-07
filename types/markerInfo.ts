export interface Markers {
    markers: MarkerInfo[]
}

export interface MarkerInfo {
    id: string;
    latitude: number,
    longitude: number,
    desasterType: string,
    markerType: string
}

export interface MarkerInfoRequest {
    latitude: number,
    longitude: number,
    desasterType: string,
    markerType: string
}