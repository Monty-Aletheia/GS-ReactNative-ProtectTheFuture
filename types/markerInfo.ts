export interface Markers {
    markers: MarkerInfo[]
}

export interface MarkerInfo {
    id: string;
    latitude: number,
    longitude: number,
    desasterType: string,
    markerType: string
    description: string
    timestamp: string
}

export interface MarkerInfoRequest {
    latitude: number,
    longitude: number,
    desasterType: string,
    markerType: string,
    timestamp: string,
    description: string | undefined
}