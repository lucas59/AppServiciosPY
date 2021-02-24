import React, { useEffect, useState } from 'react'
import { Image } from 'react-native';
import { Alert } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { searchTermInStores } from '../../../Utils/Filters/DataStores';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_SEARCH } from '../../../../Redux/actions/searchActions';

export default function Search({ navigation }) {
    const dispatch = useDispatch();
    const session = useSelector(state => state.auth.user);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const searches = useSelector(state => state.filters.searches)
    const [searchTerm, setSearchTerm] = useState("")
    const stores = useSelector(state => state.info.stores);
    const [storeFound, setstoreFound] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const renderSearchItem = ({ item }) => {
        return (
            <SearchItem
                item={item}
                onPress={() => setSelectedId(item)}
            />
        );
    }

    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
            />
        );
    };
    const SearchItem = ({ item, onPress, style }) => {
        const stylesItem = StyleSheet.create({
            container: {
                paddingVertical: 10,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderTopWidth: 1,
                borderTopColor: '#ccc',
            },
            name: {
                fontSize: 20,
                color: 'gray'
            }
        })
        return (
            <TouchableOpacity onPress={() => returnTuSearch(item)} style={stylesItem.container}>
                <Text style={stylesItem.name}>{item}</Text>
            </TouchableOpacity>
        )
    }

    const Item = ({ item, onPress, style }) => {
        console.log("Item: ", item);
        const stylesItem = StyleSheet.create({
            container: {
                marginVertical: 5,
                height: 130,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: 'white'
            },
            image: {
                height: 80,
                width: 80,
                borderRadius: 40,
                resizeMode: "contain"
            },
            name: {
                fontSize: 20,
                paddingVertical: 5,
                textAlign: 'center',
                color: 'gray',
            },
            description: {
                fontSize: 12,
                textAlign: 'center',
                color: 'gray'
            },
            location: {
                fontSize: 12,
                paddingVertical: 5,
                textAlign: 'center',
                color: 'gray'
            }
        })
        return (
            <TouchableOpacity onPress={() => console.log(item)} style={stylesItem.container}>
                <Image style={stylesItem.image} source={{ uri: item.img_first }} />
                <View style={{ flex: 1, height: '100%', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={stylesItem.name}>{item.name}</Text>
                        <Text style={stylesItem.description}>{item.description}</Text>
                    </View>
                    <Text style={stylesItem.location}>{item.user.locations[0].streetName} {item.user.locations[0].streetNumber}, {item.user.locations[0].locality} </Text>
                </View>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        {/* const delayDebounceFn = setTimeout(() => {
            if (searchTerm !== "") {
                setLoadingSearch(true)
                searchTermInStores(searchTerm, stores).then((values) => {
                    setLoadingSearch(false)
                    setstoreFound(values);
                    searches.push(searchTerm)
                    dispatch(ADD_SEARCH(searches));
                    //console.log("searches: ", searches);

                    //              await AsyncStorage.setItem("searches", searches);
                })
                    .catch(() => {
                        setLoadingSearch(false)
                    })
            }
        }, 1000)
        return () => clearTimeout(delayDebounceFn)
    */}
        //}, [searchTerm]);
    }, [searchTerm]);


    const returnTuSearch = (search) => {
        setSearchTerm(search);
        onSearch();
    }

    const onSearch = () => {
        if (searchTerm !== "") {
            setLoadingSearch(true)
            searchTermInStores(searchTerm, stores).then((values) => {
                setLoadingSearch(false)
                setstoreFound(values);
                searches.push(searchTerm)
                dispatch(ADD_SEARCH(searches));
                AsyncStorage.setItem("searches", JSON.stringify(searches));
            })
                .catch(() => {
                    setLoadingSearch(false)
                })
        }
    }

    return (
        <View style={styles.container}>
            <SearchBar
                lightTheme={true}
                placeholder="Busqueda"
                value={searchTerm}
                onBlur={onSearch}
                onChangeText={(text) => setSearchTerm(text)}
                showLoading={loadingSearch}
                round={true}
                containerStyle={{ backgroundColor: 'transparent', borderBottomWidth: 0, borderTopWidth: 0, justifyContent: 'center', height: 100 }}
                inputContainerStyle={{ backgroundColor: 'white' }}
            />
            {searchTerm !== "" ? (
                <FlatList data={storeFound} style={{ flex: 4, position: 'relative' }} renderItem={renderItem} extraData={selectedId} keyExtractor={(item) => item.id} />
            ) : (
                    <React.Fragment>
                        <Text style={{ color: 'gray' }}>Busquedas recientes</Text>
                        <FlatList data={searches} style={{ flex: 4, position: 'relative' }} renderItem={renderSearchItem} extraData={selectedId} keyExtractor={(item) => item.id} />
                    </React.Fragment>
                )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
    }
})
