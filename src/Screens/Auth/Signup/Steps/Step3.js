import React from 'react'
import { View, Text, StyleSheet, Button as ButtonRN } from 'react-native'
import { Button, Input } from 'react-native-elements'

export default function Step3(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Establece una contraseña</Text>

            <View style={styles.form}>
                <Input placeholder='Contraseña'
                    secureTextEntry={true}
                    inputStyle={styles.input}
                    containerStyle={styles.containerInput} />

                <Input placeholder='Confirmación'
                    secureTextEntry={true}
                    inputStyle={styles.input}
                    containerStyle={styles.containerInput} />

                <View style={styles.options}>
                    <ButtonRN title="Volver" onPress={() => props.wizard.current.prev()}></ButtonRN>
                    <Button title="Listo" onPress={() => props.wizard.current.next()}></Button>
                </View>

            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray'
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        paddingVertical: 100,
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    next: {
        width: 300,
        height: 50,
        borderRadius: 50,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerInput: {
        width: "90%",
        marginHorizontal: 'auto',
    },
    options: {
        flexDirection: 'row', justifyContent: "space-around"
    },
    next: {
        width: 300
    }
})