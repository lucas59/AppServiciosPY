import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
//import Autocomplete from 'react-native-autocomplete-input';
import { SearchBar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

export default function Search({ navigation }) {
    const [search, setSearch] = useState("");
    const session = useSelector(state => state.auth.user);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('')


    useEffect(() => {
        console.log("SESSION: ", session);
        if (!session) {
            navigation.replace("Entry");
        }

        const delayDebounceFn = setTimeout(() => {
            console.log(searchTerm)
            
        }, 1000)

        return () => clearTimeout(delayDebounceFn)


    }, [searchTerm]);


    return (
        <View style={styles.container}>
            <SearchBar
                lightTheme={true}
                placeholder="Busqueda"
                value={searchTerm}
                onChangeText={(text) => setSearchTerm(text)}
                showLoading={loadingSearch}
                round={true}
                containerStyle={{ backgroundColor: 'transparent', borderTopWidth: 0, height: 20 }}
                inputContainerStyle={{ backgroundColor: 'white' }}
            />


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})
