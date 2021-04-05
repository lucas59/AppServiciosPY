import { useNavigation } from '@react-navigation/core';
import { useFormik } from 'formik';
import { Button, Icon, Picker, Spinner, Textarea, Toast } from 'native-base';
import React, { useLayoutEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text, Image } from 'react-native'
import MyTextInput from '../../../Auth/Signup/Forms/MyTextInput';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { validate } from '../../../../Utils/Forms/validationNewService.helper'
import { newService } from '../../../../Api/AuthApi';
import { useSelector } from 'react-redux';
import { uploadImage } from '../../../../Utils/Firebase/FirebaseUtils';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';


export default function NewService() {
    const navigation = useNavigation();
    const [loading, setloading] = useState(false);
    const { token } = useSelector(state => state.auth)
    const [image, setimage] = useState(null);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'NUEVO SERVICIO',
        });
    }, [navigation]);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        setimage(pickerResult.uri);
    };



    const onSubmit = (values) => {
        setloading(true);
        uploadImage(image)
            .then((fileName) => {
                let data = {
                    name: values.name,
                    phone: values.phone,
                    description: values.description,
                    category: values.category,
                    image: fileName,
                    type: 'service'
                }
                console.log(data);
                newService(data, token)
                    .then((res) => {
                        setloading(false)
                        console.log("res: ", res);
                    })
                    .catch((response) => {
                        setloading(false)
                        console.log(response);
                    })
            })
            .catch((err) => {
                console.log(err);
                setloading(false)
            })

    }



    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            phone: '',
            category: ''
        },
        onSubmit: values => onSubmit(values),
        validate
    });


    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={styles.container}>
                <View style={styles.form}>
                    {image ? (
                        <Image style={styles.image} source={{ uri: image }} />
                    ) : (
                        <Image style={styles.image} source={require('../../../../../assets/icons/locals.png')} />
                    )}

                    <TouchableOpacity onPress={openImagePickerAsync} style={styles.pickerImage}>
                        <Icon name="camera" />
                        <Text style={styles.buttonText}>Seleccionar una imagen</Text>
                    </TouchableOpacity>

                    <MyTextInput
                        placeholder="Nombre"
                        onChangeText={formik.handleChange('name')}
                        value={formik.values.name}
                        error={formik.errors.name}
                        onBlur={formik.handleBlur('name')}
                        touched={formik.touched.name}
                        type={"name"}
                    />

                    <MyTextInput
                        placeholder="Celular"
                        onChangeText={formik.handleChange('phone')}
                        value={formik.values.phone}
                        error={formik.errors.phone}
                        onBlur={formik.handleBlur('phone')}
                        touched={formik.touched.phone}
                        type={"phone"}
                    />

                    <View style={{ width: '100%' }}>
                        <Picker
                            mode="dialog"
                            iosIcon={<Icon type="FontAwesome5" name="arrow-down" />}
                            style={{
                                width: '100%',
                                marginVertical: 15,
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1
                            }}
                            placeholder="Categoría"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={formik.values.category}
                            onValueChange={formik.handleChange('category')}
                        >
                            <Picker.Item label="Wallet" value="key0" />
                            <Picker.Item label="ATM Card" value="key1" />
                            <Picker.Item label="Debit Card" value="key2" />
                            <Picker.Item label="Credit Card" value="key3" />
                            <Picker.Item label="Net Banking" value="key4" />
                        </Picker>
                    </View>
                    <Textarea bordered style={{ width: '100%' }} rowSpan={4} onChangeText={formik.handleChange('description')} placeholder="Descripción" />

                    <Button disabled={loading} onPress={formik.handleSubmit} style={styles.btnSuccess}>{loading && (<Spinner size={10} color='white' />)}<Text>Crear</Text></Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    form: { width: '80%', justifyContent: 'center', alignItems: 'center', marginVertical: 30 },
    btnSuccess: { marginTop: 30, paddingHorizontal: 20, marginRight: 'auto', marginLeft: 'auto', backgroundColor: 'green', minWidth: 150, justifyContent: 'space-evenly' },
    pickerImage: { marginVertical: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '70%' },
    image: { width: 150, height: 150, borderRadius: 75 }
})
