import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Ionicons } from 'react-native-vector-icons'
import MapView, { Marker } from 'react-native-maps';
import { getStores } from '../../Api/DataApi';
import { Button, ButtonGroup } from 'react-native-elements';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from 'react-redux';

export default function Home() {
    const [init, setInit] = useState(false);
    const [stores, setStores] = useState([]);
    const store = useStore();
    const state = store.getState();
    const [user, setUser] = useState(state.auth.user);
    const initialRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.020,
        longitudeDelta: 0.020
    }
    const [region, setRegion] = useState(initialRegion)
    const listStores = () => {
        getStores().then((response) => {
            const data = response.data;
            console.log(data);
            setStores(data);
        }).catch((err) => {
            console.log("Error: ", err);

        })
    }

    useEffect(() => {
        if (!init) {
            console.log("Store: ", store.getState());
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                let region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.020,
                    longitudeDelta: 0.020
                }
                setRegion(region);
                setInit(true);
                listStores();
            })
        }

    })

    const changeRegion = (region) => {
        setRegion(region);
    }

    const component1 = () => <Ionicons size={30} name="md-restaurant"></Ionicons>
    const component2 = () => <Ionicons size={30} name="md-restaurant"></Ionicons>
    const component3 = () => <Ionicons size={30} name="md-restaurant"></Ionicons>
    const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }, { element: component3 }, { element: component3 }]


    return (
        <View style={styles.container}>
            <View style={styles.headerMaps}>
                <Title style={styles.welcomeTitle}>Lucas, ¿qué estas buscando?</Title>
                <FlatList horizontal={true} data={buttons} style={styles.listServices} contentContainerStyle={styles.listServicesContainer} renderItem={(item) => {
                    return (<TouchableOpacity onPress={() => listStores()} style={styles.icons}><Ionicons size={30} name="md-restaurant"></Ionicons></TouchableOpacity>)
                }} />
            </View>
            <MapView region={region} showsUserLocation={true} onRegionChangeComplete={changeRegion} style={styles.map} >
                {stores.map((store, index) => {
                    const coords = JSON.parse(store.user.locations[0].location);
                    console.log(coords);
                    return <Marker coordinate={coords} />
                })}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: '70%',
    },
    headerMaps: {
        flex: 1,
        backgroundColor: 'white',
        height: "20%"
    },
    listServices: {
        flex: 1,
        width: "100%",
        flexDirection: 'row'
    },
    listServicesContainer: {
        flex: 1,
        alignItems: 'center'
    },
    welcomeTitle: {
        fontSize: 16,
        padding: 5,
        width: "100%"
    },
    icons: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 50,
        marginHorizontal: 10
    }
})
