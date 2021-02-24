import React from 'react'
import { Image, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text, Dimensions } from 'react-native'
import { Icon, Overlay } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import { set_store_show } from '../../../Redux/actions/infoActions';
import PropTypes from 'prop-types';
import SkeletonShowStore from './SkeletonShowStore';
import { TouchableOpacity } from 'react-native-gesture-handler';

import StoreIcon from '../../../assets/icons/locals.png';

const WIDTH = Dimensions.get('window').width - 20;
const HEIGHT = Dimensions.get('window').height - 100;

function ShowStore({ visible, store }) {

    const dispatch = useDispatch();
    const onClose = () => {
        dispatch(set_store_show(null))
    }

    return (
        <Overlay animationType="slide" overlayStyle={styles.container} onBackdropPress={onClose} isVisible={visible} visible={visible}>
            {store ? (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    {store.img_first ? (
                        <Image style={{ flex: 2, resizeMode: 'stretch', width: 180, height: 180, borderWidth: 10, borderColor: "#ccce", marginVertical: 20, borderRadius: 100 }} source={{ uri: store.img_first }} transition={false} />
                    ) : (
                            <Image style={{ flex: 2, resizeMode: "contain", width: 120, height: 120 }} source={StoreIcon} transition={false} />
                        )}
                    <View style={{ flex: 3, width: "100%", alignItems: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', width: "100%" }}>
                            <Icon name="store" type="font-awesome-5" color='orange' style={{ alignSelf: 'flex-start' }} size={24} />
                            <Text style={styles.name}> {store.name}</Text>
                        </TouchableOpacity>
                        {store.description !== "" && <Text style={styles.description}>
                            {store.description}
                        </Text>
                        }
                        {store.web !== "" && <Text style={styles.description}>
                            {store.web}
                        </Text>
                        }
                    </View>

                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <TouchableOpacity style={{ flexDirection: 'row', width: "100%", alignItems: 'center' }}>
                            <Icon name="whatsapp" type="font-awesome-5" color='green' style={{ marginHorizontal: 10 }} size={24} />
                            <Text style={styles.phone}> {store.phone}</Text>
                        </TouchableOpacity>
                        <View style={{
                            paddingVertical: 15,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <Icon name="map-marker-alt" type="font-awesome-5" color='#ccc' style={{ marginHorizontal: 10 }} size={24} />
                            <Text>{store.user.locations[0].streetName + " " + store.user.locations[0].streetNumber + ", " + store.user.locations[0].locality}</Text>
                        </View>
                    </View>
                </View>
            ) : (
                    <SkeletonShowStore />
                )}
        </Overlay>
    )
}

const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        width: WIDTH,

    },
    name: {
        textAlign: 'center',
        fontSize: 20,
        alignItems: 'center',
    },
    description: {
        textAlign: 'center',
    },
    logo: {

    },
    phone: {
        color: 'blue',
        textAlign: 'right'
    }

})

ShowStore.prototype = {
    store: PropTypes.object.isRequired
}

export default ShowStore
