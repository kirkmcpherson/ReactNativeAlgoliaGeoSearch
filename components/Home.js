import {StyleSheet, View, Text, TouchableOpacity} from "react-native";

const Home = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Text>Welcome!  Click below to see the map.</Text>
            <TouchableOpacity 
                style={styles.buttonStyle}
                onPress={() => navigation.navigate('Map')}>
                <Text style={styles.buttonTextStyle}>Go To Map</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
      },
      buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
      },    
})