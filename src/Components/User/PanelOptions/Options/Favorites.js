import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Image } from 'react-native'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import ButtonBack from '../ButtonBack'
import { loadFavorites } from '../../../../API/InfoApi';
import { useSelector } from 'react-redux'
import mqttsp from '../../../../API/mqttsp'

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const session = useSelector(state => state.auth.session);

    const responseMqtt = (arreglo) => {
        /*console.log(arreglo);
        let arreglocheck = arreglo[1].split("|");
        if (arreglocheck[2] == "E8") {
            Toast.show("Hubo un problema al recuperar favoritos. Intente nuevamente", Toast.LONG);
        } else {
            let split = arreglo[1].split("[");
            let nuevaCadena = "[" + split[1];
            var re = new RegExp("\\[(.*?)\\]");
            var re2 = new RegExp("\\{(.*?)\\}");
            //var pattern = re.compile()
            var arreglo1 = nuevaCadena.match(re);
            var direction = arreglo1[1].split(re2);

            var newArray = [];

            for (const element of direction) {
                if (element !== "") {
                    newArray.push(element);
                }
            }
            setFavorites(newArray);
            console.log("arreglo: ", newArray);
        }*/
        let list = arreglo[1].split('{');
        console.log(list);

        let favorites = new Array();
        let cont = 0;
        list.forEach(element => {
            element = element.replace('}', '');
            let arr = element.split('|');

            if (cont !== 0 && arr[0]) {
                let favorite = {
                    id: cont,
                    title: arr[1],
                    address: arr[2],
                    addressNumber: arr[0],
                    latitude: arr[5],
                    logitude: arr[6],
                };
                favorites.push(favorite);
            }
            cont++;
        });

        //        this.setState({ pedidos: pedidos }); //another array
        console.log(favorites);
        setFavorites(favorites)

    }

    const responseDeleteMqtt = () => {

    }

    useEffect(() => {
        mqttsp.setRespuestaFavorito(responseMqtt);
        mqttsp.setRespuestaEliminarFavorito(responseDeleteMqtt);
        loadFavorites(session.email, session.password);
    }, [])

    const keyExtractor = (item, index) => index.toString();
    console.log(favorites);
    return (
        <View style={styles.container}>
            <ButtonBack title="Viajes" />
            <FlatList data={favorites} keyExtractor={keyExtractor} renderItem={({ item }) => (
                <TouchableOpacity style={styles.item}>
                    <View style={styles.info}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <Image style={styles.chevron} source={require("../../../../assets/trash.png")} />
                </TouchableOpacity>
            )} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 50 },
    item: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        height: 50,
        alignItems: "center",
        justifyContent: 'space-between',
        flexDirection: "row",
        color: '#ccc'
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
    },
    info: {
        alignItems: 'flex-start'
    },
    chevron: {
        resizeMode: 'contain',
        width: 30,
        height: 30
    }
})
export default Favorites
