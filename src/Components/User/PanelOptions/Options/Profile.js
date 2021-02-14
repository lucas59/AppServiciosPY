import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { SET_ITEM } from '../../../../Redux/Actions/InfoActions';
import ButtonBack from '../ButtonBack';

function Profile() {
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <ButtonBack title="Perfil" />
            <View style={styles.form}>
                <Input label="Número" />
                <Input label="Nombre" />
                <Input label="Apellido" />
                <Input label="Email" />
                <Button title="Confirmar" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonBack: {
        display: 'flex',
        borderWidth: 1,
    },
    form:{
        paddingHorizontal:50
    }
})
export default Profile
