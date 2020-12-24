import React from 'react'
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { set_store_show } from '../../../../Redux/actions/infoActions';

function Map({ region, changeRegion, stores }) {
    const dispatch = useDispatch();
    const tagSelected = useSelector(state => state.tags.tagSelected);
    const showInfo = (store) => {
        dispatch(set_store_show(store));
    }
    return (
        <MapView region={region} showsUserLocation={true} onRegionChangeComplete={changeRegion} style={styles.map} >
            {stores.map((store, index) => {
                const coords = JSON.parse(store.user.locations[0].location);
                if (tagSelected) {
                    if (tagSelected.id === store.tagId) {
                        return (
                            <Marker onPress={() => showInfo(store)} coordinate={coords}>
                                <Icon
                                    raised
                                    name={"heart"}
                                    style={styles.marker}
                                    type='font-awesome'
                                    color='#f60'
                                    backgroundColor='red'
                                />
                            </Marker>)
                    }
                } else {
                    return (
                        <Marker onPress={() => showInfo(store)} coordinate={coords} >
                            <Icon
                                raised
                                name={"heart"}
                                source={require('../../../../assets/icon.png')}
                                style={styles.marker}
                                type='font-awesome'
                                color='#f60'
                                backgroundColor='red'
                            />
                        </Marker>)
                }
            })}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: '100%',
    },
    marker: {

    }
})


export default Map
