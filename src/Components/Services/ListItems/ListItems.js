import React, { useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { set_tag_show } from '../../../../Redux/actions/tagsActions'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { CHANGE_TAB } from '../../../../Redux/actions/tabsActions'
import { Icon } from 'react-native-elements'
import Item from './Item'

function ListItems() {
    const dispatch = useDispatch();


    const changeTab = (name) => {
        dispatch(CHANGE_TAB(name))
    }

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