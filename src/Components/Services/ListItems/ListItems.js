import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native'
import Item from './Item'

function ListItems() {
    return (
        <View style={styles.container}>
            <View style={styles.headerTabs}>
                <Text style={styles.title}>COMERCIOS</Text>
                <Text style={styles.title}>SERVICIOS</Text>
            </View>
            <View style={styles.list}>
                <Item name="stores" icon="store" />
                <Item name="services" icon="tools" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { width: "100%", flexDirection: "column", alignItems: 'center', justifyContent: 'space-around' },
    headerTabs: { justifyContent: 'space-around', alignItems: "center", flexDirection: 'row', width: '100%', backgroundColor: 'black' },
    title: { padding: 3, fontWeight: 'bold', paddingHorizontal: 5, color: '#ccc', backgroundColor: '#272727' },
    list: { paddingVertical: 10, justifyContent: 'space-around', alignItems: "center", flexDirection: 'row', width: '100%', backgroundColor: '#999999' },
})

export default ListItems