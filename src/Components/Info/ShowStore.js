import React from 'react'
import { Image, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text, Dimensions } from 'react-native'
import { Overlay } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import { set_store_show } from '../../../Redux/actions/infoActions';
import PropTypes from 'prop-types';
import SkeletonShowStore from './SkeletonShowStore';

const WIDTH = Dimensions.get('window').width - 20;
const HEIGHT = Dimensions.get('window').height - 100;

function ShowStore({ visible, store }) {

    const dispatch = useDispatch();
    const onClose = () => {
        dispatch(set_store_show(null))
    }
    return (
        <Overlay animationType="slide" overlayStyle={styles.container} onBackdropPress={onClose} visible={visible}>
            <SkeletonShowStore />
            {store && (
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.title}>{store.name}</Text>
                        <Text style={styles.description}>{store.description}</Text>
                        <Image style={{ resizeMode: 'stretch', width: "100%", height: "75%" }} source={{ uri: 'https://storage.googleapis.com/servicios-py-299813.appspot.com/profiles/' + store.img_portal }} transition={false} />
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.phone}>{store.phone}</Text>
                    </View>
                </View>
            )}
        </Overlay>
    )
}

const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        width: WIDTH,

    },
    title: {
        textAlign: 'center',
        fontSize: 20
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
