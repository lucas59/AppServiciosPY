import React from 'react'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'
import { View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { SET_ITEM, SET_PANEL } from '../../../Redux/Actions/InfoActions'
import { onSubmitCloseSession } from '../../../API/AuthApi';
import { SET_SESSION } from '../../../Redux/Actions/AuthActions'
import { useNavigation } from '@react-navigation/native'

function PanelListItems() {
    const session = useSelector(state => state.auth.session);
    const navigation = useNavigation();
    console.log("Session: ", session);
    const dispatch = useDispatch();
    const list = [
        {
            title: 'Viajes',
            code: 'orders',
            icon: require("../../../assets/map.png")
        },
        {
            title: 'Favoritos',
            code: 'favorites',
            icon: require("../../../assets/heart.png")

        },
        {
            title: 'Mensajes',
            code: 'messages',
            icon: require("../../../assets/message.png")
        },
        {
            title: 'Perfil',
            code: 'profile',
            icon: require("../../../assets/user-icon.png")
        },
        {
            title: 'Acerca de',
            code: 'about',
            icon: require("../../../assets/info.png")
        },
        {
            title: 'Ayuda',
            code: 'help',
            icon: require("../../../assets/question.png")
        },
    ]

    const keyExtractor = (item, index) => index.toString()

    const closeSession = () => {
        onSubmitCloseSession().then(() => {
            dispatch(SET_SESSION(null));
            dispatch(SET_PANEL(false));
        })
    }

    const openSession = () => {
        navigation.navigate("Auth");

    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 50 }}>
            <Text>Menú</Text>
            <FlatList data={list} keyExtractor={keyExtractor} renderItem={(objet) => (
                <TouchableOpacity onPress={() => dispatch(SET_ITEM(objet.item.code))} style={styles.item}>
                    {/*<Icon
                        name={objet.item.icon}
                        style={styles.icon}
                        size={35}
                        color='#517fa4'
                        type="entypo"
                    />*/}
                    <Image style={styles.icon} source={objet.item.icon} />

                    <Text style={styles.title}>{objet.item.title}</Text>
                </TouchableOpacity>
            )} />
            {session ? (
                <TouchableOpacity onPress={closeSession}>
                    <Text style={styles.closeSession}>Cerrar sesión</Text>
                </TouchableOpacity>

            ) : (
                    <TouchableOpacity onPress={openSession}>
                        <Text style={styles.openSession}>Inicia sesión</Text>
                    </TouchableOpacity>

                )}
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        color: 'gray'
    },
    icon: {
        resizeMode: "contain", width: 30, height: 30, marginHorizontal: 10
    },
    closeSession: {
        textAlign: 'center',
        marginTop: 30,
        color: '#FD646D',
        fontSize: 20
    },
    openSession: {
        textAlign: 'center',
        marginTop: 30,
        color: '#3A619D',
        fontSize: 20
    }
})

export default PanelListItems
