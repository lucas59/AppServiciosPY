import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native';
import { getStores, getTags } from '../../Api/DataApi';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Map from './Map/Map';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set_token, SET_USER } from '../../../Redux/actions/authActions';
import ShowStore from '../../Components/Info/ShowStore';
import ListItems from '../../Components/Services/ListItems/ListItems';
import { set_tags } from '../../../Redux/actions/tagsActions';
import { set_region } from '../../../Redux/actions/locationActions';
import { set_stores } from '../../../Redux/actions/infoActions';
import { getSession } from '../../Api/AuthApi';
import PanelOptions from '../../Components/User/PanelOptions/PanelOptions';
import { getDownloadUrl } from '../../Utils/Firebase/FirebaseUtils';
import { ADD_SEARCH } from '../../../Redux/actions/searchActions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Icon } from 'react-native-elements';
import { Image } from 'react-native';
import Logo from "../../../assets/logo.png";

function Home({ navigation }) {
    const [init, setInit] = useState(false);
    const [stores, setStores] = useState([]);
    const dispatch = useDispatch();
    const info = useSelector(state => state.info.store);
    const tab = useSelector(state => state.tabsManager.tab);
    const token = useSelector(state => state.auth.token);


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


    const listStores = (token) => {
        getStores(token).then((response) => {
            const stores = response.data;
            for (let index = 0; index < stores.length; index++) {
                const store = stores[index];
                getDownloadUrl(store.img_first).then((url) => {
                    data[index].img_first = url;
                })
                    .catch((err) => {
                        console.log(err);
                    })
                if (index === data.length - 1) {
                    dispatch(set_stores(data))
                }
            }
        }).catch((err) => {
            console.log("Error: ", err.response.data);
        })
    }

    const getUserToken = () => {
        AsyncStorage.getItem("auth_token").then((token) => {
            if (token) {
                listStores(token);
            }
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
                getUserToken();
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
            {tab === 'stores' ? (
                <View style={styles.mapContainer}>
                    <Map stores={stores} />
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    <Text>Servicios</Text>
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
