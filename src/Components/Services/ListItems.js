import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { Title } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { set_tag_show } from '../../../Redux/actions/tagsActions'

function ListItems({ tags }) {
    const dispatch = useDispatch();
    const tagSelected = useSelector(state => state.tags.tagSelected);
    const onPress = (tag) => {
        dispatch(set_tag_show(tag))
    }

    return (
        <View style={styles.headerMaps}>
            <Title style={styles.welcomeTitle}>Servicios - {tagSelected ? tagSelected.title : "Todos"}</Title>
            <FlatList horizontal={true} data={tags} style={styles.listServices} contentContainerStyle={styles.listServicesContainer} renderItem={(item) => {
                return (
                    <Icon
                        reverse={tagSelected && tagSelected.id === item.item.id}
                        raised
                        name={item.item.icon}
                        type='font-awesome'
                        color='#f60'
                        backgroundColor='red'
                        onPress={() => onPress(item.item)}
                    />
                )
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F6F6'
    },
    headerMaps: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 20,
        marginBottom: 10,
        marginTop: 20,
        justifyContent: 'center',
        borderRadius: 15,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    listServices: {
        flex: 1,
        width: "100%",
        flexDirection: 'row',
    },
    listServicesContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-start",
    },
    welcomeTitle: {
        fontSize: 16,
        padding: 5,
        textAlign: 'center'
    },
    icons: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 50,
        marginHorizontal: 10
    },
    mapContainer: {
        backgroundColor: "white",
        width: Dimensions.get('window').width,
        height: '70%',
        borderTopEndRadius: 15,
    }
})

export default ListItems
