import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { getStores, getTags } from '../../Api/DataApi';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Map from './Map/Map';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_USER } from '../../../Redux/actions/authActions';
import ShowStore from '../../Components/Info/ShowStore';
import ListItems from '../../Components/Services/ListItems';
import { set_tags } from '../../../Redux/actions/tagsActions';
import { set_region } from '../../../Redux/actions/locationActions';
import { set_stores } from '../../../Redux/actions/infoActions';
import { getSession } from '../../Api/AuthApi';

export default function Home() {
    const [init, setInit] = useState(false);
    const [stores, setStores] = useState([]);
    const store = useStore();
    const dispatch = useDispatch();
    const info = useSelector(state => state.info.store);
    const auth = useSelector(state => state.auth);

    const listStores = () => {
        getStores().then((response) => {
            const data = response.data;
            dispatch(set_stores(data))
        }).catch((err) => {
            console.log("Error: ", err);
        })
    }

    const getDataUser = () => {
        AsyncStorage.getItem("auth_token").then((token) => {
            if (token) {
                console.log(token);
                getSession(token).then((response) => {
                    console.log(response);
                })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        })
    }

    const listTags = () => {
        getTags().then((response) => {
            const data = response.data;
            dispatch(set_tags(data));
            getDataUser();
            listStores();
        })
    }

    console.log(auth);

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
                dispatch(set_region(region));
                setInit(true);
                listTags();
            })
        }

        AsyncStorage.getItem("auth_user").then((session) => {
            dispatch(SET_USER(JSON.parse(session)));
        })

    }, [])



    return (
        <View style={styles.container}>
            <ListItems />
            <View style={styles.mapContainer}>
                <Map stores={stores} />
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
