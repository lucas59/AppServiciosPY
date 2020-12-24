import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Input, Button, ButtonGroup, CheckBox } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useStore } from 'react-redux';
import { set_token, SET_USER } from '../../../../Redux/actions/authActions';
import { login } from '../../../Api/AuthApi';
const component1 = () => <Text>Hello</Text>
const component2 = () => <Text>World</Text>

export default function Login({ navigation }) {
    const buttons = [{ element: component1 }, { element: component2 }]
    const [correo, setCorreo] = useState("lucasca@gmail.com");
    const [password, setPassword] = useState("lucasciceri");
    const store = useStore();
    const dispatch = useDispatch();

    const onSubmit = () => {
        login({ email: correo, password })
            .then((res) => {
                console.log("USER: ", res.data.user);
                const data = res.data;
                dispatch(set_token(data.token));
                dispatch(SET_USER(data.user));
                AsyncStorage.setItem("auth_token", data.token);
                AsyncStorage.setItem("auth_user", JSON.stringify(data.user));
                navigation.navigate("Main");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <KeyboardAvoidingView style={{ flex: 1, paddingVertical: 10 }}>
                <View style={styles.form}>
                    <Input
                        inputStyle={styles.input}
                        containerStyle={styles.containerInput}
                        label="Correo"
                        onChangeText={setCorreo}
                        value={correo}
                        placeholder="Correo"
                        leftIcon={<Icon style={styles.inputIcon} name="user" size={24} color="black" />}
                    />
                    <Input
                        inputStyle={styles.input}
                        containerStyle={styles.containerInput}
                        label="Contraseña"
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Contraseña"
                        secureTextEntry={true}
                        leftIcon={<Icon style={styles.inputIcon} name="lock" size={24} color="black" />}
                    />
                    <Button buttonStyle={styles.buttonOpen} onPress={onSubmit} title="Ingresar" />
                    <TouchableOpacity onPress={()=>navigation.navigate("Signup")}><Text>Crear cuenta</Text></TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray'
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        paddingVertical: 100,
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerInput: {
        width: "90%",
        marginHorizontal: 'auto'
    },
    input: {

    },
    inputIcon: {
        color: "gray"
    },
    buttonOpen: {
        width: 300,
        height: 50,
        marginVertical: 10,
        borderRadius: 50
    }
})
