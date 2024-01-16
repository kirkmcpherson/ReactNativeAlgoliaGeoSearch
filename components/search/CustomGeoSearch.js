import { StyleSheet, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import  MapView, {PROVIDER_GOOGLE, Marker}  from 'react-native-maps';
import { useGeoSearch } from 'react-instantsearch-core';
import * as Location from "expo-location";

export function CustomGeoSearch({...props}) {
    var mapRef;
    const [initialRegion, setInitialRegion] = useState(null);
    const { items, refine } = useGeoSearch({...props});

    useEffect(() => {
        const getLocation = async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            console.log("Permission to access location was denied");
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});

          setInitialRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            //latitude: 43.6472722,
            //longitude: -79.3776902,    
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          });


        };

        getLocation();
    }, []);

    mapRef = null;
    onRegionChangeComplete = async () => {
        if(this.mapRef)
        {
          var boundary = await this.mapRef.getMapBoundaries();
          //console.log("onRegionChangeComplete", boundary);

          refine({
              northEast: {"lat": boundary.northEast.latitude, "lng": boundary.northEast.longitude},
              southWest: {"lat": boundary.southWest.latitude, "lng": boundary.southWest.longitude},
          });
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={(ref) => {
                    this.mapRef = ref;
                }}
                onRegionChangeComplete={this.onRegionChangeComplete}
                style={StyleSheet.absoluteFill}
                region={initialRegion}
            >
                {items.map((item) => (
                <Marker key={item.objectID} coordinate={{latitude: item._geoloc.lat, longitude: item._geoloc.lng}}>
                    <View style={{backgroundColor: "red", padding: 10}}>
                        <Text>{item.name}</Text>
                    </View>
                </Marker>
                ))}

            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})