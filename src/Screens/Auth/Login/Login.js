import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { set_token, SET_USER } from '../../../../Redux/actions/authActions';
import { login } from '../../../Api/AuthApi';
import { StylesButtons } from '../../../Utils/Styles/StylesButtons';
import { StyleGenerals } from '../../../Utils/Styles/StylesGenerals';
import MyTextInput from '../Signup/Forms/MyTextInput';

const validate = (values) => {
    let errors = {};

    if (!values.email) {
        errors.email = "Requerido"
    } else if (! /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
        errors.email = "Correo invalido";
    }
    if (!values.password) {
        errors.password = "Requerido"
    }
    return errors;
}

export default function Login({ navigation }) {
    const dispatch = useDispatch();

    useEffect(() => {
        AsyncStorage.getItem("auth_token").then((value) => {
            if (value) {
                // navigation.navigate("Main");
            }
        })
    }, [])

    const onSubmit = (values) => {
        login({ email: values.email, password: values.password })
            .then((res) => {
                console.log("USER: ", res.data.user);
                const data = res.data;
                dispatch(set_token(data.token));
                dispatch(SET_USER(data.user));
                AsyncStorage.setItem("auth_token", data.token);
                AsyncStorage.setItem("auth_user", JSON.stringify(data.user));
                navigation.navigate("Main");
            })
            .catch(({ response }) => {
                Alert.alert("Aviso", response.data.message);

            })
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => onSubmit(values),
        validate
    });

    return (
        <KeyboardAvoidingView style={StyleGenerals.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 40 }}>Login</Text>
            </View>
            <View style={styles.form}>
                <MyTextInput
                    placeholder="Correo"
                    onChangeText={formik.handleChange('email')}
                    value={formik.values.email}
                    error={formik.errors.email}
                    onBlur={formik.handleBlur('email')}
                    touched={formik.touched.email}
                />
                <MyTextInput
                    placeholder="Contraseña"
                    onChangeText={formik.handleChange('password')}
                    value={formik.values.password}
                    error={formik.errors.password}
                    onBlur={formik.handleBlur('password')}
                    touched={formik.touched.password}
                />
            </View>
            <View style={styles.options}>
                <Button buttonStyle={StylesButtons.buttonSuccess} title="Ingresar" onPress={formik.handleSubmit} />
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}><Text>Crear cuenta</Text></TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray'
    },
    header: {
        flex: 2,
        justifyContent:'center',
        alignItems:'center'
    },
    form: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    options: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
})
