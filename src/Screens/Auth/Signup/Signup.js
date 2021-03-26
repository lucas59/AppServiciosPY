import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux';
import { signup as signupApi } from '../../../Api/AuthApi';
import { getCategories } from '../../../Api/DataApi';
import * as ImagePicker from 'expo-image-picker';

import { Alert } from 'react-native';
import { set_categories } from '../../../../Redux/actions/categoryActions';
import { View } from 'react-native';
import MyTextInput from './Forms/MyTextInput';
import { useFormik } from 'formik';
import { Image } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Button, Container, Text } from 'native-base';
import { Header, useHeaderHeight } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const GradientHeader = props => (
    <View style={{ color: 'white', backgroundColor: '#eee' }}>
        <LinearGradient
            colors={['#FD6C59', '#F05758', '#DF3E57', '#D32A56', '#C61755', '#C10F55']}
            style={{ height: props.height, color: 'white' }}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        >
            <Header {...props} />
        </LinearGradient>
    </View>
)
export default function Signup() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const height = useHeaderHeight();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'PAYSANDÚ',
            header: props => <GradientHeader height={height} {...props} />,
            headerStyle: {
                backgroundColor: 'transparent',
                position: 'absolute',
                color: 'white',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            },
        });
    }, [navigation]);



    useEffect(() => {
        getCategories()
            .then((categories) => {
                if (categories.length > 0) {
                    let prepareToPicker = [];
                    categories.forEach(category => { //prepare to picker
                        category.value = category.id.toString();
                        category.label = category.title.toString();

                        prepareToPicker.push(category);
                    });
                    dispatch(set_categories(prepareToPicker));
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5,
            maxWidth: 500,
            maxHeight: 500,
        });

        setImage(result.uri);
        //dispatch(SET_IMAGE_SIGNUP(result.uri));
    }

    const onSubmit = async (values) => {
        signupApi(values)
            .then((response) => {
                Alert.alert("Aviso", "Cuenta creada correctamente");
                navigation.navigate('Login');
            })
            .catch((err) => {
                Alert.alert("Error", "A ocurrido un error, por favor revisa tus datos.");
                console.log(err);
            })

    }


    const validate = (values) => {
        let errors = {};

        if (!values.email) {
            errors.email = "Requerido"
        } else if (! /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
            errors.email = "Correo invalido";
        }
        if (!values.name) {
            errors.name = "Requerido"
        }
        if (!values.surname) {
            errors.surname = "Requerido"
        }
        if (!values.phone) {
            errors.phone = "Requerido"
        }
        if (!values.password) {
            errors.password = "Requerido"
        }
        if (!values.confirm) {
            errors.confirm = "Requerido"
        }
        return errors;
    }


    const formik = useFormik({
        initialValues: {
            name: 'lucas',
            surname: 'ciceri',
            phone: '091690509',
            email: 'lucasciceri59@gmail.com',
            password: 'lucasciceri',
            confirm: 'lucasciceri'
        },
        onSubmit: values => onSubmit(values),
        validate
    });
    return (
        <Container>
            <KeyboardAwareScrollView style={{ width: '100%' }}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 30, marginTop: 20 }}>Bienvenid@</Text>
                    {image ?
                        <Image source={{ uri: image }} style={styles.image} />
                        :
                        <Image style={styles.logo} source={require("../../../../assets/icons/user.png")} />
                    }
                    <Button style={styles.btnSelect} transparent onPress={pickImage} >
                        <Text>Elegir mí foto</Text>
                    </Button>
                </View>

                <View style={styles.form}>
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
                    <MyTextInput
                        label="Contraseña"
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
                    <MyTextInput
                        label="Confirmar contraseña"
                        placeholder="Confirmar contraseña"
                        onChangeText={formik.handleChange('confirm')}
                        value={formik.values.confirm}
                        error={formik.errors.confirm}
                        onBlur={formik.handleBlur('confirm')}
                        touched={formik.touched.confirm}
                        type={"password"}
                        autoCompleteType={'password'}
                        secureTextEntry={true}
                    />
                    <LinearGradient
                        style={{ marginTop: 10, borderRadius: 5 }}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#FD6C59', '#F05758', '#DF3E57', '#D32A56', '#C61755', '#C10F55']}
                    >
                        <Button transparent style={{ width: 200, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white' }} >Crear Cuenta</Text>
                        </Button>
                    </LinearGradient>
                </View>
            </KeyboardAwareScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex'
    },
    header: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        alignContent: 'center'
    },
    form: { flex: 4, alignItems: 'center', width: "80%", marginRight: 'auto', marginLeft: 'auto' },
    image: {
        width: 80,
        height: 80,
        resizeMode: "cover",
        marginVertical: 5,
        borderRadius: 100
    },
    btnSelect: { marginLeft: 'auto', marginRight: 'auto' },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        marginVertical: 5,
    },
    formPassword: { width: '50%', justifyContent: 'center', alignItems: 'center' }
})
