import React from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements';
import Logout from '../../Auth/Logout/Logout';
import StoresList from './Stores/StoresList';
import ServicesList from './Services/ServicesList';
import { useNavigation } from '@react-navigation/native';

export default function ManagerStores() {
    const navigation = useNavigation();
    const newService = () => {
        navigation.navigate("NewService");
    }

    return (
        <View style={{ display: 'flex', flex: 3, flexDirection: 'column', alignItems: 'center', paddingTop: 10 }}>
            <View style={{ minHeight: 80, width: '90%' }}>
                <Text style={{ fontSize: 22, textAlign: 'center', marginVertical: 10 }}>Tus comercios o servicios:</Text>
                <StoresList />
        {/*        <ServicesList />*/}
            </View>


            <View style={{ flex: 1, marginTop: 10, flexDirection: 'row' }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', marginHorizontal: 5 }}>Nuevo Comercio:</Text>
                    <Icon
                        reverse
                        reverseColor="white"
                        size={22}
                        name={"plus"}
                        type='font-awesome-5'
                        color={'red'}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={newService} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', marginHorizontal: 5 }}>Nuevo servicio:</Text>
                    <Icon
                        reverse
                        reverseColor="white"
                        size={22}
                        name={"plus"}
                        type='font-awesome-5'
                        color={'blue'}
                    />
                </TouchableOpacity>
            </View>
            <Logout />
        </View>
    )
}
