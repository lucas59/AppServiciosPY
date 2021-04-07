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
        <View style={{ flex: 1, flexDirection: 'column', paddingTop: 10 }}>
            <View>
                <Text style={{ fontSize: 22, textAlign: 'center', marginVertical: 10 }}>Tus comercios o servicios:</Text>
                {/*
                <StoresList />
                <ServicesList />
                */}
            </View>


            <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: 'row', width: '100%', marginBottom: 5, justifyContent: "space-around", marginTop: 10 }}>
                    <TouchableOpacity style={{ width: 100, flexDirection: 'row', alignItems: 'center' }}>
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
                    <TouchableOpacity onPress={newService} style={{ width: 100, flexDirection: 'row', alignItems: 'center' }}>
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
        </View>
    )
}
