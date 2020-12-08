import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useStore } from 'react-redux'

export default function Entry({ navigation }) {
    const store = useStore();
    const state = store.getState();

    const checkAuth = async () => {
        const checkAuth = await AsyncStorage.getItem('auth_token');
        if (checkAuth) {
            navigation.replace("Main");
        }
    }

    useEffect(() => {
        checkAuth();
    }, [])

    return (
        <View style={styles.container}>
            <ImageBackground blurRadius={5} source={{ uri: "https://images.unsplash.com/photo-1553012781-b47b6751792c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" }} style={styles.image}>
                <Text style={styles.title}>Dónde PY</Text>
                <View style={styles.buttons}>
                    <Button
                        title="Ingresar"
                        onPress={() => navigation.navigate("Login")}
                        buttonStyle={styles.button}
                    />
                    <Button
                        title="Unirme"
                        onPress={() => navigation.navigate("Signup")}
                        buttonStyle={styles.button}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        paddingVertical: 100,
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    buttons: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    button: {
        width: 300,
        height: 50,
        marginVertical: 10,
        borderRadius: 50
    }
})