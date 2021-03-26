import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Image, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { set_token, SET_USER } from '../../../../Redux/actions/authActions';
import { login } from '../../../Api/AuthApi';
import MyTextInput from '../Signup/Forms/MyTextInput';
import Logo from '../../../../assets/logo.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { requiered_field } from '../../../Utils/Constans/Validations';
import { CHANGE_OPTIONPANEL_VISIBLE } from '../../../../Redux/actions/panelsActions';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const validate = (values) => {
    let errors = {};

    if (!values.email) {
        errors.email = requiered_field
    } else if (! /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
        errors.email = "Correo invalido";
    }
    if (!values.password) {
        errors.password = requiered_field
    }
    return errors;
}

export default function Login() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        //AsyncStorage.removeItem("auth_token")
        AsyncStorage.getItem("auth_token").then((token) => {
            if (token) {
                navigation.replace('Home');
            }
        })
    }, [])

    const onSubmit = (values) => {
        login({ email: values.email, password: values.password })
            .then((res) => {
                const data = res.data;
                console.log(data);
                dispatch(set_token(data.token));
                dispatch(SET_USER(data.user));
                AsyncStorage.setItem("auth_token", JSON.stringify(data.token));
                dispatch(CHANGE_OPTIONPANEL_VISIBLE(false));
                AsyncStorage.setItem("auth_user", JSON.stringify(data.user));
                navigation.replace("Home");
            })
            .catch(({ response }) => {
                Alert.alert("Aviso", "asds");
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
        <View style={{ flex: 1 }}>
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#FD6C59', '#F05758', '#DF3E57', '#D32A56', '#C61755', '#C10F55']}
                style={{ flex: 5, paddingVertical: 20 }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                    <Image style={{ resizeMode: "contain", marginVertical: 20, width: 250, height: 80 }} source={Logo} />
                    <Text style={{ color: 'white', fontSize: 20 }}>Paysandú</Text>
                    <View style={{ width: '80%', alignItems: 'center', marginVertical: 30 }}>
                        <MyTextInput
                            placeholder="Correo"
                            onChangeText={formik.handleChange('email')}
                            value={formik.values.email}
                            error={formik.errors.email}
                            onBlur={formik.handleBlur('email')}
                            touched={formik.touched.email}
                            type={"emailAddress"}
                        />
                        <MyTextInput
                            placeholder="Contraseña"
                            onChangeText={formik.handleChange('password')}
                            value={formik.values.password}
                            error={formik.errors.password}
                            onBlur={formik.handleBlur('password')}
                            touched={formik.touched.password}
                            type={"password"}
                            autoCompleteType={'password'}
                            secureTextEntry={true}
                        />
                    </View>
                    <Button buttonStyle={{ marginVertical: 10, height: 40, width: 150, backgroundColor: "transparent", borderWidth: 2, borderRadius: 6, borderColor: 'white' }} title="Ingresar" onPress={formik.handleSubmit} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                        <Text style={{ color: "white", marginRight: 10 }}>¿No tienes una cuenta?</Text>
                        <Button buttonStyle={{ backgroundColor: "transparent", height: 40, width: 150, borderWidth: 2, borderRadius: 6, borderColor: 'white' }} onPress={() => navigation.navigate('Signup')} title="Registrarme"></Button>
                    </View>

                </View>
            </LinearGradient>
            <View style={{ paddingVertical: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24 }}>Ingresar con:</Text>
                <Button style={{ width: 150, height: 40, marginVertical: 5 }} buttonStyle={{ backgroundColor: '#c1272d' }} title="Google" />
                <Button style={{ width: 150, height: 40, }} buttonStyle={{ backgroundColor: '#0071bc' }} title="Facebook" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray'
    },
    form: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
