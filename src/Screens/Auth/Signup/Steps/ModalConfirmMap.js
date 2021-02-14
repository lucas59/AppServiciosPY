import React, { useState } from 'react'
import { View } from 'react-native';
import { Button as ButtonRN } from 'react-native'
import { Text, StyleSheet } from 'react-native'
import { Button, Overlay } from 'react-native-elements'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { CHANGE_ADDRESS, CHANGE_SHOW_CONFIRM_MAP } from '../../../../../Redux/actions/signupActions';
import MyTextInput from '../Forms/MyTextInput';

export default function ModalConfirmMap({goToNext}) {
    const showConfirm = useSelector(state => state.signup.showConfirmMap);
    const address = useSelector(state => state.signup.address);
    const state = useStore().getState();
    const dispatch = useDispatch();
    const [indication, setIndication] = useState("")

    const returnToEdit = () => {
        dispatch(CHANGE_SHOW_CONFIRM_MAP(false));
    }

    const onSubmit = () => {
        console.log('submit');
        goToNext();
    }

    const setAddressAttribute = (attribute, value) => {
        let newAddress = address;
        newAddress[attribute] = value;
        dispatch(CHANGE_ADDRESS(newAddress))
    }

    console.log(address);

    return (
        <Overlay isVisible={showConfirm} overlayStyle={styles.container} visible={showConfirm}>
            <View style={styles.header}><Text style={styles.title}>Confirmar dirección</Text></View>
            <View style={styles.form}>
                <MyTextInput
                    defaultValue={address && address.street}
                    //value={address && address.street}
                    placeholder="Calle*"
                    type={"street"}
                    onChangeText={(text) => setAddressAttribute('street', text)}
                />
                <MyTextInput
                    defaultValue={address && address.streetNumber}
                    placeholder="Número*"
                    type={"number"}
                    onChangeText={(text) => setAddressAttribute('streetNumber', text)}
                />
                <MyTextInput
                    value={indication}
                    placeholder="Indicación"
                    onChangeText={(text) => setAddressAttribute('indication', text)}
                />
            </View>
            <View style={styles.footer}>
                <ButtonRN onPress={returnToEdit} type="outline" title="Editar" />
                <Button onPress={onSubmit} title="Listo" />
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "70%",
        width: "80%"
    },
    header: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        color: "gray",
    },
    form: {
        flex: 4,
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})