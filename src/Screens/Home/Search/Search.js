import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
//import Autocomplete from 'react-native-autocomplete-input';
import { SearchBar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Search() {
    const [search, setSearch] = useState("");
    return (
        <View style={styles.container}>
            {/*<Autocomplete
                data={["asdasd", "asdasd"]}
                renderItem={({ item, i }) => (
                    <TouchableOpacity key={i}>
                        <Text>{item}</Text>
                    </TouchableOpacity>
                )}
                />*/}
            <SearchBar
                lightTheme={true}
                placeholder="Busqueda"
                value={search}
                onChangeText={setSearch}
                round={true}
                containerStyle={{ backgroundColor: 'transparent', borderTopWidth: 0, height: 20}}
                inputContainerStyle={{backgroundColor:'white'}}
            />

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
})
