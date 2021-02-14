import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Title } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { set_tag_show } from '../../../Redux/actions/tagsActions'
import { Icon } from 'react-native-elements';
import { set_user_options_show } from '../../../Redux/actions/userActions'

function ListItems() {
    const dispatch = useDispatch();
    const tagSelected = useSelector(state => state.tags.tagSelected);
    const tags = useSelector(state => state.tags.tags);

    const onPress = (tag) => {
        dispatch(set_tag_show(tag))
    }

    return (
        <View style={styles.headerMaps}>
            <TouchableOpacity onPress={() => dispatch(set_user_options_show(true))} style={{ zIndex:1000, position: 'absolute', right: 0, top: 0 }}>
                <Icon
                    raised
                    name={"user"}
                    type="font-awesome-5"
                    color='#f60'
                    size={24}
                    color="orange"
                />
            </TouchableOpacity>
            <Title style={styles.welcomeTitle}>Servicios - {tagSelected ? tagSelected.title : "Todos"}</Title>
            <FlatList showsHorizontalScrollIndicator={false} scrollEnabled={true} horizontal={true} data={tags} style={styles.listServices} contentContainerStyle={styles.listServicesContainer} renderItem={(item) => {
                return (
                    <TouchableOpacity onPress={() => onPress(item.item)} style={styles.item}>
                        <Icon
                            reverse={tagSelected && tagSelected.id === item.item.id}
                            raised
                            name={item.item.icon}
                            type="font-awesome-5"
                            color='#f60'
                            size={24}
                            color="orange"
                        />
                    </TouchableOpacity>
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
        },
        width: '100%'
    },
    item: {
        height: 50,
        width: 50,
        marginHorizontal: 5,
        padding: 5,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: "center",
        shadowOpacity: 0.4,
        resizeMode: "stretch",
        borderWidth: 1,
        borderColor: '#ccc'
    },
    icon: {
        width: 30,
        height: 30
    },
    listServices: {
        flex: 1,
    },
    listServicesContainer: {
        alignItems: 'center',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    welcomeTitle: {
        fontSize: 16,
        padding: 5,
        textAlign: 'center'
    },
    mapContainer: {
        backgroundColor: "white",
        width: Dimensions.get('window').width,
        height: '70%',
        borderTopEndRadius: 15,
    }
})

export default ListItems