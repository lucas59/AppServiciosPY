import React from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { View, Text } from 'react-native'

export default function StoresList() {
    return (
        <View style={styles.container}>
            <Text>Comercial: </Text>

            <View style={{ flex: 1, alignItems:'center' }}>
                {true ? (
                    <Text style={{color:'gray'}}>Sin servicios</Text>
                ): (
                        <TouchableOpacity style = {styles.itemContainer}>
                        <Text>Item</Text>
                    </TouchableOpacity>
                )}
        </View>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 50,
        marginVertical: 10
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'red',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})