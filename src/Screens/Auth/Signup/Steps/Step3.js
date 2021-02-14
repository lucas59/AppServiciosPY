import React, { useState } from 'react';
import { reduxForm } from 'redux-form';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button as ButtonRN } from 'react-native'
import MyTextInput from '../Forms/MyTextInput';
import { StyleGenerals } from '../../../../Utils/Styles/StylesGenerals';
import { Button } from 'react-native-elements';
import { StylesButtons } from '../../../../Utils/Styles/StylesButtons';
import { useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';

const validate = (values) => {
    let errors = {};

    if (!values.password) {
        errors.password = "Requerido"
    }

    if (!values.confirm) {
        errors.confirm = "Requerido"
    } else if (values.password !== values.confirm) {
        errors.confirm = 'No coinciden'
    }

    return errors;
}

function StepPassword(props) {
    
    const creatingAccount = useSelector(state => state.signup.creatingAccount)
    const formik = useFormik({
        initialValues: {
            password: '',
            confirm: ''
        },
        onSubmit: values => props.onSubmit(values),
        validate
    });
    return (
        <View style={StyleGenerals.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={styles.header}>
                    <Image style={styles.logo} source={require("../../../../../assets/icons/user-data.png")} />
                    <Text>Datos de comercio</Text>
                </View>

                <View style={styles.form}>

                    <MyTextInput
                        placeholder="Contraseña*"
                        onChangeText={formik.handleChange('password')}
                        value={formik.values.password}
                        type={"password"}
                        error={formik.errors.password}
                        onBlur={formik.handleBlur('password')}
                        touched={formik.touched.password}
                        type={"password"}
                        secureTextEntry={true}
                    />

                    <MyTextInput
                        placeholder="Confirmar*"
                        onChangeText={formik.handleChange('confirm')}
                        value={formik.values.confirm}
                        type={"password"}
                        error={formik.errors.confirm}
                        onBlur={formik.handleBlur('confirm')}
                        touched={formik.touched.confirm}
                        autoCompleteType={'password'}
                        type={"confirm"}
                        secureTextEntry={true}
                    />
                </View>


                <View style={styles.options}>
                    <ButtonRN title="Volver" onPress={() => props.wizard.current.prev()}></ButtonRN>
                    <Button disabled={creatingAccount} loading={creatingAccount} buttonStyle={StylesButtons.buttonSuccess} title="Listo" onPress={formik.handleSubmit}></Button>

                </View>
            </KeyboardAwareScrollView>
        </View >
    );
}

export default reduxForm({
    form: 'passwordForm',
    validate: (values) => {
        const errors = {};
        errors.password = !values.password
            ? 'Campo requerido'
            : undefined;

        errors.confirm = !values.confirm
            ? 'Campo requerido'
            : undefined;
        return errors;
    }
})(StepPassword);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3'
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        paddingVertical: 50,
        color: 'black',
        fontWeight: 'bold',
    },
    next: {
        width: 300,
        height: 50,
        borderRadius: 50,
    },
    form: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    options: {
        flex: 1,
        flexDirection: 'column-reverse',
        justifyContent: "space-around",
    },
    next: {
        width: 300
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        marginVertical: 5,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        marginVertical: 5,
        borderRadius: 100
    },
    formInput: {
        width: 300,
        height: 50
    },
    firstInput: {
        width: 300,
        height: 60,
        borderWidth: 1
    },
})