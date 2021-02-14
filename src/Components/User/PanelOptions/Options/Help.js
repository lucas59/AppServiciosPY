import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import ButtonBack from '../ButtonBack'

function Help() {
    return (
        <View style={styles.container}>
            <ButtonBack title="Ayuda" />
            <Text>Help</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
export default Help
