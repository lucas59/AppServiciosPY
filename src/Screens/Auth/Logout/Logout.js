import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native'


export default function Logout() {
    const navigation = useNavigation();

    const logOut = () => {
        console.log("Cerrando sesión");
        AsyncStorage.removeItem("auth_token");
        AsyncStorage.removeItem("auth_user");
        navigation.replace("Login");
    }

    return (
        <TouchableOpacity style={styles.container} onPress={logOut}>
            <Text style={{ fontSize: 28, color: "red" }}>Cerrar sesión</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
