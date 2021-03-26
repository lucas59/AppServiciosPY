import React, { useLayoutEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements';

import MyTextInput from '../../Auth/Signup/Forms/MyTextInput';
import { LinearGradient } from 'expo-linear-gradient';
import { useFormik } from 'formik';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    const logOut = () => {
        console.log("Cerrando sesión");
        AsyncStorage.removeItem("auth_token");
        AsyncStorage.removeItem("auth_user");
        navigation.replace("Login");
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 10, justifyContent: 'center' }}>
            <View style={{ flex: 1, justifyContent: "flex-end", paddingVertical: 20 }}>
                <Text style={{ fontSize: 22 }}>Tu perfil en DONDE?: </Text>
            </View>
            <View style={{ flex: 2, paddingHorizontal: 20, justifyContent: 'flex-start', flexDirection: 'row' }}>
                <View style={{ flex: 2, paddingHorizontal: 5, paddingVertical: 20 }}>
                    <View style={{ backgroundColor: 'red', width: 100, height: 100 }}></View>
                </View>
                <View style={{ flex: 4, alignItems: 'center', paddingVertical: 20 }}>
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
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
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

            <View style={{ flex: 3, flexDirection: 'column', alignItems: 'center', paddingTop: 30 }}>
                <Text style={{ fontSize: 24 }}>Tus comercios o servicios:</Text>
                <View style={{ width: '90%' }}>
                    <Text>Comercial: </Text>
                </View>
                <View style={{ width: '90%' }}>
                    <Text>Servicios: </Text>
                </View>

                <View style={{ height: 100, width: '100%', flexDirection: 'row', justifyContent: "flex-end" }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: "auto", maxWidth: '50%', flex: 3 }}>
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
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: "auto", maxWidth: '50%', flex: 3 }}>
                        <Text style={{ textAlign: 'center', marginHorizontal: 5 }}>Nuevo Comercio:</Text>
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
                <TouchableOpacity onPress={logOut}>
                    <Text style={{ fontSize: 28, color: "red" }}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
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
