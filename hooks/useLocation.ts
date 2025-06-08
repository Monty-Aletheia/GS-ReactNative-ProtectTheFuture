import { useEffect, useState } from "react";
import { LocationAccuracy, LocationObject, getCurrentPositionAsync, requestForegroundPermissionsAsync, watchPositionAsync } from "expo-location";
import MapView from "react-native-maps";

export function useLocation(mapRef?: React.RefObject<MapView | null>) {
  const [location, setLocation] = useState<LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      const { granted } = await requestForegroundPermissionsAsync();
      if (granted) {
        const currentPosition = await getCurrentPositionAsync();
        setLocation(currentPosition);

        watchPositionAsync(
          {
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (newLocation) => {
            setLocation(newLocation);
            mapRef?.current?.animateCamera({
              pitch: 70,
              center: newLocation.coords,
            });
          }
        );
      }
    })();
  }, []);

  return location;
}
