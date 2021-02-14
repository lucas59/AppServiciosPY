import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Image } from 'react-native'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux';
import { loadOrders } from '../../../../API/InfoApi';
import Mqttsp from '../../../../API/mqttsp';
import ButtonBack from '../ButtonBack';
import { format } from "date-fns";

function Orders() {
    const session = useSelector(state => state.auth.session);
    const [orders, setOrders] = useState([]);

    const responseMqtt = (arreglo) => {
        var arr = arreglo.split('[');
        var list = arr[1].split('{');

        var pedidos = new Array();
        var cont = 0;
        list.forEach(element => {
            element = element.replace('}', '');
            var arr = element.split('|');

            if (arr[0]) {
                var pedido = {
                    id: cont,
                    address: arr[0],
                    addressNumber: arr[1],
                    esquina: arr[2],
                    latitude: arr[3],
                    logitude: arr[4],
                    date: arr[5],
                    movil: arr[6],
                };
                pedidos.push(pedido);
            }
            cont++;
        });

        //        this.setState({ pedidos: pedidos }); //another array
        setOrders(pedidos);
    }

    useEffect(() => {
        Mqttsp.setHTLRespuesta(responseMqtt);
        loadOrders(session.email, session.password);
    }, [])


    const keyExtractor = (item, index) => index.toString();

    return (
        <View style={styles.container}>
            <ButtonBack title="Viajes" />

            <FlatList data={orders} keyExtractor={keyExtractor} renderItem={({ item }) => (
                <TouchableOpacity style={styles.item}>
                    <View style={styles.info}>
                        <Text style={styles.title}>{item.date}</Text>
                        <Text numberOfLines={1} ellipsizeMode="middle" style={styles.subtitle}> Viaje N {item.id} - {item.address} {item.addressNumber}</Text>
                    </View>
                    <Image style={styles.chevron} source={require("../../../../assets/chevron.png")} />
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
        alignItems: 'flex-start',
        width: "80%"
    },
    chevron: {
        resizeMode: 'contain',
        width: 30,
        height: 30
    }
})
export default Orders
