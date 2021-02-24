import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'

function About() {
    return (
        <View style={styles.container}>
            <ButtonBack title="Acerca de" />

            <Text>About</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
export default About
