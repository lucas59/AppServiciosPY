import { Body, Button, Header, Icon, Input, Item, Left, List, ListItem, Right, Thumbnail } from 'native-base';
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { View, Text, FlatList } from 'react-native'
import { useSelector } from 'react-redux'

export default function ListServices() {
    const services = useSelector(state => state.info.services);
    const [search, setsearch] = useState("");

    const renderItem = ({ item }) => {
        const visible = item.name.includes(search);
        console.log(visible);
        return (
            <ListItem style={{ display: visible ? 'flex' : 'none', paddingVertical: 5, marginVertical: 10 }} avatar>
                <Left>
                    <Thumbnail source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.newdesignfile.com%2Fpostpic%2F2009%2F03%2Fuser-icon_88187.jpg&f=1&nofb=1' }} />
                </Left>
                <Body style={{ borderBottomWidth: 0 }}>
                    <Text style={styleItem.name}>{item.name}</Text>
                    <Text note>{item.description}</Text>
                </Body>
            </ListItem>
        )
    }

    const styleItem = StyleSheet.create({
        name: { fontSize: 20, fontWeight: 'bold' }
    })

    return (
        <View style={{ flex: 1 }}>
            <Header searchBar style={{ borderBottomWidth: 0, backgroundColor: 'white' }}>
                <Item>
                    <Icon name="ios-search" />
                    <Input textContentType="name" onChangeText={(text) => setsearch(text)} placeholder="Search" />
                    <Icon name="ios-people" />
                </Item>
            </Header>
            <List style={{ flex: 1 }}>
                <FlatList contentContainerStyle={{ flexGrow: 1 }} keyExtractor={item => item.id} data={services} renderItem={renderItem} />
            </List>
        </View>
    )
}
