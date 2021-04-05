import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native';
import { getStores, getSubUsers } from '../../Api/DataApi';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Map from './Map/Map';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set_token, SET_USER } from '../../../Redux/actions/authActions';
import ShowStore from '../../Components/Info/ShowStore';
import ListItems from '../../Components/Services/ListItems/ListItems';
import { set_region } from '../../../Redux/actions/locationActions';
import { set_services, set_stores } from '../../../Redux/actions/infoActions';
import { getSession } from '../../Api/AuthApi';
import PanelOptions from '../../Components/User/PanelOptions/PanelOptions';
import { getDownloadUrl } from '../../Utils/Firebase/FirebaseUtils';
import { ADD_SEARCH } from '../../../Redux/actions/searchActions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Icon } from 'react-native-elements';
import { Image } from 'react-native';
import Logo from "../../../assets/logo.png";
import ListServices from './Services/ListServices';

function Home({ navigation }) {
    const [init, setInit] = useState(false);
    const [stores, setStores] = useState([]);
    const dispatch = useDispatch();
    const info = useSelector(state => state.info.store);
    const tab = useSelector(state => state.tabsManager.tab);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'PAYSANDÚ',
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerLeft: () => (
                <Image style={{ marginHorizontal: 20, resizeMode: 'contain', width: 100 }} source={Logo} />
            ),
            headerRight: () => (
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Profile")
                    }
                >
                    <Icon
                        reverse
                        name='menu'
                        type='ionicon'
                        color='transparent'
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);


    const listSubUsers = (token) => {
        getSubUsers(token).then((response) => {
            const subUsers = response.data;
            let services = subUsers.filter((values) => values.type === 'service');
            dispatch(set_services(services));
            console.log("services: ", services);
        }).catch((err) => {
            console.log("Error: ", err.response.data);
        })
    }





    const getUserToken = () => {
        return new Promise((res, rej) => {
            AsyncStorage.getItem("auth_token").then((token) => {
                if (token) {
                    res(token);
                } else {
                    rej(null)
                }
            })
        })
    }


    useEffect(() => {
        if (!init) {
            navigator.geolocation.getCurrentPosition((position) => {
                let region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.020,
                    longitudeDelta: 0.020
                }
                dispatch(set_region(region));
                setInit(true);

                getUserToken()
                    .then((token) => {
                        listSubUsers(token);
                    })
            })
        }

        AsyncStorage.getItem("auth_token").then((token) => {
            dispatch(set_token(token));
        })
        AsyncStorage.getItem("auth_user").then((session) => {
            dispatch(SET_USER(JSON.parse(session)));
        })
        AsyncStorage.getItem("searches").then((searches) => {
            if (searches !== null) {
                dispatch(ADD_SEARCH(JSON.parse(searches)));
            } else {
                dispatch(ADD_SEARCH([]));
            }
        })
    }, [])


    return (
        <View style={styles.container}>
            <ListItems />
            {tab === 'stores' ? ( // vista de mapa
                <View style={styles.mapContainer}>
                    <Map stores={stores} />
                </View>
            ) : ( // vista de servicios
                <View style={styles.mapContainer}>
                    <ListServices />
                </View>
            )}
            <ShowStore store={info} visible={info ? true : false} />{/* Muestro informacion del comercio */}
            <PanelOptions navigation={navigation} />
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
        height: '100%',
        flex: 4,
        borderTopEndRadius: 15,
    }
})

export default Home;
