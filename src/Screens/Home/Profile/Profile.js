import React, { useLayoutEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements';

import MyTextInput from '../../Auth/Signup/Forms/MyTextInput';
import { LinearGradient } from 'expo-linear-gradient';
import { useFormik } from 'formik';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ManagerStores from './ManagerStores';

export default function Profile({ navigation }) {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'MI CUENTA',
        });
    }, [navigation]);

    const formik = useFormik({
        initialValues: {
            name: 'lucas',
            surname: 'ciceri',
            phone: '091690509',
            email: 'lucasciceri59@gmail.com',
            password: 'lucasciceri',
            confirm: 'lucasciceri'
        },
        onSubmit: values => console.log(values),
        //validate
    });

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ flex: 3, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 22, paddingVertical: 20 }}>Tu perfil en DONDE: </Text>
                <View style={{ width: '100%' }}>
                    <MyTextInput
                        label={'Nombre: '}
                        placeholder="Nombre"
                        onChangeText={formik.handleChange('name')}
                        value={formik.values.name}
                        error={formik.errors.name}
                        onBlur={formik.handleBlur('name')}
                        touched={formik.touched.name}
                        type={"emailAddress"}
                    />
                    <MyTextInput
                        label="Apellido"
                        placeholder="Apellido"
                        onChangeText={formik.handleChange('surname')}
                        value={formik.values.surname}
                        error={formik.errors.surname}
                        onBlur={formik.handleBlur('surname')}
                        touched={formik.touched.surname}
                        type={"emailAddress"}
                    />
                    <MyTextInput
                        label="Celular"
                        placeholder="Celular"
                        onChangeText={formik.handleChange('phone')}
                        value={formik.values.phone}
                        error={formik.errors.phone}
                        onBlur={formik.handleBlur('phone')}
                        touched={formik.touched.phone}
                        type={"phone"}
                    />
                    <MyTextInput
                        label="Mail"
                        placeholder="Mail"
                        onChangeText={formik.handleChange('email')}
                        value={formik.values.email}
                        error={formik.errors.email}
                        onBlur={formik.handleBlur('email')}
                        touched={formik.touched.email}
                        type={"emailAddress"}
                    />
                </View>
                <LinearGradient
                    style={{ width: 200, marginTop: 10, height: 40, borderRadius: 5 }}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#FD6C59', '#F05758', '#DF3E57', '#D32A56', '#C61755', '#C10F55']}
                >
                    <TouchableOpacity onPress={formik.handleSubmit} style={{ width: 200, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: 'white' }}>Cambiar contraseña</Text>
                    </TouchableOpacity>
                </LinearGradient>

            </View>
            <ManagerStores />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {

    }
})
