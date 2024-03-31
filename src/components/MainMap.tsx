import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Pressable,
} from 'react-native';
import GeoLocation from '@react-native-community/geolocation';
import MapView, {Marker, LatLng, PROVIDER_GOOGLE} from 'react-native-maps';
import styled from 'styled-components';
import {Button} from 'react-native-paper';

function MainMap() {
  const [location, setLocation] = useState<LatLng>();
  const [allowMyLocation, setAllowMyLocation] = useState(false);
  const mapRef = useRef<MapView | null>(null);

  const handleClick = () => {
    setAllowMyLocation(true);
  };
  useEffect(() => {
    if (!allowMyLocation) {
      return;
    }
    GeoLocation.getCurrentPosition(info => {
      if (info?.coords) {
        const {latitude, longitude} = info.coords;
        // setLocation({latitude, longitude});
        if (latitude && longitude) {
          mapRef.current?.animateToRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        }
      }
    });
  }, [allowMyLocation]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <View1>
          <Map
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: location?.latitude || 0,
              longitude: location?.longitude || 0,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            showsUserLocation
            followsUserLocation>
            <Marker
              coordinate={location || {latitude: 0, longitude: 0}}
              title={'내 위치'}
              description={'안녕'}
            />
          </Map>
        </View1>
        <Button
          mode="contained"
          onPress={handleClick}
          style={styles.myLocation}>
          내 위치
        </Button>
      </SafeAreaView>
    </>
  );
}
const View1 = styled(View)`
  flex: 1;
`;

const Map = styled(MapView)`
  flex: 1;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
  myLocation: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    width: 100,
  },
});
export default MainMap;
