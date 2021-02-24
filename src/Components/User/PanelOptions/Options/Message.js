import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'

function Messages() {
    return (
        <View style={styles.container}>
            <ButtonBack title="Mensajes" />

            <Text>Messages</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
export default Messages
