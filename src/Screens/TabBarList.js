import React, { Component } from 'react'
import { Text, View, TabBarIOS, TabBarIOSItem } from 'react-native'
import Superheroes from './superheroes'

export default function TabBarListSuperheroes() {

    return (
        <View>
            <TabBarIOS barTintColor="white" tintColor="black" unselectedTintColor="grey">
                <TabBarIOSItem title="tab 1" >asd</TabBarIOSItem>
            </TabBarIOS>
        </View>
    )
}
