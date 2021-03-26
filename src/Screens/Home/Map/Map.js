import React from 'react'
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { set_store_show } from '../../../../Redux/actions/infoActions';
import * as firebase from 'firebase';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
import LocationIcon from '../../../../assets/icons/mylocation.png'
import { set_region } from '../../../../Redux/actions/locationActions';

function Map() {
    const dispatch = useDispatch();
    const tagSelected = useSelector(state => state.tags.tagSelected);
    const tags = useSelector(state => state.tags.tags);
    const region = useSelector(state => state.location.region);
    const stores = useSelector(state => state.info.stores);

    const myLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0020,
                longitudeDelta: 0.0020
            }
            dispatch(set_region(region));
        })
    }

    const showInfo = (store) => {
        var ref = firebase.storage().ref().child('images/' + store.img_first);
        ref.getDownloadURL()
            .then((urlDownload) => {
                store.img_first = urlDownload
                dispatch(set_store_show(store));
            })
            .catch((err) => {
                console.log(err);
                dispatch(set_store_show(store));
            })
    }
    return (
        <React.Fragment>
            <MapView region={region} showsUserLocation={true} style={styles.map} >
                {stores.map((store, index) => {
                    if (store.tagId) {
                        const coords = JSON.parse(store.user.locations[0].position);
                        let tag = tags.find(tag => tag.id === store.tagId);
                        if (tagSelected) {
                            if (tagSelected.id === 0 || tagSelected.id === store.tagId) {
                                return (
                                    <Marker style={styles.item} onPress={() => showInfo(store)} coordinate={coords}>
                                        <Icon
                                            raised
                                            name={tag.icon}
                                            type="font-awesome-5"
                                            size={24}
                                            color={tag.color}
                                        />
                                    </Marker>)
                            }
                        }
                    }
                })}
            </MapView>
            <TouchableOpacity onPress={myLocation} style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', width: 50, height: 50, borderRadius: 25, bottom: 20, right: 5 }}>
                <Image style={{ resizeMode: "cover", width: 35, height: 35 }} source={LocationIcon} />
            </TouchableOpacity>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: '100%',
    },
    marker: {

    },
    item: {
        height: 50,
        width: 50,
        marginHorizontal: 5,
        padding: 5,
        borderRadius: 100,
        backgroundColor: 'white'
    },
    icon: {
        width: 30,
        height: 30
    },
})


export default Map
