import React from 'react'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'
import { View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CHANGE_OPTIONPANEL_VISIBLE } from '../../../../Redux/actions/panelsActions'
import { set_token, SET_USER } from '../../../../Redux/actions/authActions'
import { Dimensions } from 'react-native'

function PanelListItems({ navigation }) {
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const list = [
        {
            title: 'Perfil',
            code: 'profile',
            icon: require("../../../../assets/user-icon.png")
        },
        {
            title: 'Favoritos',
            code: 'favorites',
            icon: require("../../../../assets/heart.png")

        },

        {
            title: 'Acerca de',
            code: 'about',
            icon: require("../../../../assets/info.png")
        },
        {
            title: 'Ayuda',
            code: 'help',
            icon: require("../../../../assets/question.png")
        },
    ]

    const keyExtractor = (item, index) => index.toString()


    const closeSession = async () => {
        dispatch(CHANGE_OPTIONPANEL_VISIBLE(false));
        dispatch(set_token(null));
        dispatch(SET_USER(null));
        await AsyncStorage.removeItem("auth_user");
        AsyncStorage.removeItem("auth_token").then(() => {
            navigation.navigate("Entry");
        })

    }

    const openSession = () => {
        navigation.replace("Entry");
    }
    return (
        <View style={{ flex: 1, minHeight: 500, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Menú</Text>
            {token && (
                <FlatList style={{ width: '100%' }} data={list} keyExtractor={keyExtractor} renderItem={(objet) => (
                    <TouchableOpacity onPress={() => dispatch(SET_ITEM(objet.item.code))} style={styles.item}>
                        <Image style={styles.icon} source={objet.item.icon} />
                        <Text style={styles.title}>{objet.item.title}</Text>
                    </TouchableOpacity>
                )} />
            )}

            {token ? (
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
