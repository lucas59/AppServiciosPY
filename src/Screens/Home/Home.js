import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Ionicons } from 'react-native-vector-icons'
import MapView, { Marker } from 'react-native-maps';
import { getStores, getTags } from '../../Api/DataApi';
import { Button, ButtonGroup } from 'react-native-elements';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Map from './Map/Map';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_USER } from '../../../Redux/actions/authActions';
import { Icon, Overlay } from 'react-native-elements'
import ShowStore from '../../Components/Info/ShowStore';
import ListItems from '../../Components/Services/ListItems';


export default function Home() {
    const [init, setInit] = useState(false);
    const [stores, setStores] = useState([]);
    const store = useStore();
    const [region, setRegion] = useState(null);
    const dispatch = useDispatch();
    const info = useSelector(state => state.info.store);
    const [tags, setTags] = useState([]);

    const listStores = () => {
        getStores().then((response) => {
            const data = response.data;
            setStores(data);
        }).catch((err) => {
            console.log("Error: ", err);
        })
    }

    const listTags = () => {
        getTags().then((response) => {
            const data = response.data;
            setTags(data);
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
                listTags();
            })
        }

        AsyncStorage.getItem("auth_user").then((session) => {
            dispatch(SET_USER(JSON.parse(session)));
        })

    }, [])

    const changeRegion = (region) => {
        setRegion(region);
    }


    return (
        <View style={styles.container}>
            <ListItems tags={tags} />
            <View style={styles.mapContainer}>
                <Map region={region} stores={stores} changeRegion={changeRegion} />
            </View>
            <ShowStore store={info} visible={info ? true : false} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F6F6'
    },

    mapContainer: {
        backgroundColor: "white",
        width: Dimensions.get('window').width,
        height: '70%',
        borderTopEndRadius: 15,
    }
})
