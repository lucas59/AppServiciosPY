import React from 'react'
import { StyleSheet, View, Button as ButtonRN } from 'react-native'
import { Text, Button, Input, Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Step2(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Información personal</Text>

            <View style={styles.form}>
                <Input
                    placeholder='Nombre'
                    inputStyle={styles.input}
                    containerStyle={styles.containerInput}
                />
                <Input
                    placeholder='Apellido'
                    inputStyle={styles.input}
                    containerStyle={styles.containerInput}
                />
                <Input
                    placeholder='Correo'
                    inputStyle={styles.input}
                    containerStyle={styles.containerInput}
                />

                <View style={styles.options}>
                    <ButtonRN title="Volver" onPress={() => props.wizard.current.prev()}></ButtonRN>
                    <Button title="Siguiente" onPress={() => props.wizard.current.next()}></Button>
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