import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { set_token, SET_USER } from '../../../../Redux/actions/authActions';
import { login } from '../../../Api/AuthApi';
import { StylesButtons } from '../../../Utils/Styles/StylesButtons';
import MyTextInput from '../Signup/Forms/MyTextInput';
import ProfileImage from '../../../../assets/icons/profile.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { requiered_field } from '../../../Utils/Constans/Validations';
import { CHANGE_OPTIONPANEL_VISIBLE } from '../../../../Redux/actions/panelsActions';

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

export default function Login({ navigation }) {
    const dispatch = useDispatch();

    useEffect(() => {
        //AsyncStorage.removeItem("auth_token")
        AsyncStorage.getItem("auth_token").then((token) => {
            if (token) {
                navigation.navigate('Home');
            }
        })
    }, [])

    const onSubmit = (values) => {
        login({ email: values.email, password: values.password })
            .then((res) => {
                const data = res.data;
                console.log("-------------");
                console.log("DATA: ", data);
                console.log("-------------");
                dispatch(set_token(data.token));
                dispatch(SET_USER(data.user));
                dispatch(CHANGE_OPTIONPANEL_VISIBLE(false));
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
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.header}>
                <Image style={{ resizeMode: "cover", width: 150, height: 150 }} source={ProfileImage} />
                <Text>Ingresar</Text>
            </View>
            <View style={styles.form}>
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
            <View style={styles.options}>
                <Button buttonStyle={StylesButtons.buttonSuccess} title="Ingresar" onPress={formik.handleSubmit} />
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}><Text>Crear cuenta</Text></TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    options: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
