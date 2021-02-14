import React from 'react'
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { set_store_show } from '../../../../Redux/actions/infoActions';
import { set_region } from '../../../../Redux/actions/locationActions';

function Map() {
    const dispatch = useDispatch();
    const tagSelected = useSelector(state => state.tags.tagSelected);
    const tags = useSelector(state => state.tags.tags);
    const region = useSelector(state => state.location.region);
    const stores = useSelector(state => state.info.stores);
    const showInfo = (store) => {
        dispatch(set_store_show(store));
    }
    const changeRegion = (region) => {
        //dispatch(set_region(region));
    }
    return (
        <MapView region={region} showsUserLocation={true} onRegionChangeComplete={changeRegion} style={styles.map} >
            {stores.map((store, index) => {
                const coords = JSON.parse(store.user.locations[0].location);
                let tag = tags.find(tag => tag.id === store.tagId);
                if (tagSelected) {
                    if (tagSelected.id === 0 || tagSelected.id === store.tagId) {
                        return (
                            <Marker style={styles.item} onPress={() => showInfo(store)} coordinate={coords}>
                                <Icon
                                    raised
                                    name={tag.icon}
                                    type="font-awesome-5"
                                    color='#f60'
                                    size={24}
                                    color="black"
                                />
                            </Marker>)
                    }
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
