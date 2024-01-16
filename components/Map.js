import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import  MapView, {PROVIDER_GOOGLE, Marker}  from 'react-native-maps';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure} from 'react-instantsearch-core';
import { CustomGeoSearch } from './search/CustomGeoSearch';
import { SearchBox } from "./search/SearchBox";

const searchClient = algoliasearch('YourApplicationID', 'YourSearchOnlyAPIKey');

const Map = () => {

    return (
        <View style={styles.container}>
            <InstantSearch searchClient={searchClient} indexName="places">
                <SearchBox/>
                <CustomGeoSearch/>
            </InstantSearch>
        </View>
    )
}

export default Map;

const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: '#252b33',
    },
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "row",  
      backgroundColor: '#ffffff',
      flexDirection: 'column',
    },
});