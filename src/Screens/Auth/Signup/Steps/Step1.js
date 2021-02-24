import React, { useState } from 'react';
import { Image } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RadioGroup from 'react-native-radio-buttons-group';
import { useDispatch } from 'react-redux';
import { SET_DATA_SIGNUP, SET_TYPE_SIGNUP } from '../../../../../Redux/actions/authActions';
import { StylesButtons } from '../../../../Utils/Styles/StylesButtons';
import { StyleGenerals } from '../../../../Utils/Styles/StylesGenerals';

export default function Step1(props) {
    const dispatch = useDispatch();

    const data = [
        {
            label: 'Comercial',
            value: "store",
        },
        {
            label: 'Personal',
            value: "personal",
        },
    ];

    const [type, setType] = useState(data);
    const onPress = value => setType(value);

    const onNext = () => {
        type.forEach(item => {
            if (item.selected) {
                let data = {
                    type: item.value
                }
                dispatch(SET_DATA_SIGNUP(data));
                props.wizard.current.next();
            }
        });
    }

    return (
        <View style={StyleGenerals.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Bienvenido</Text>
                <Text style={styles.subTitle}>Comencemos a crear tu cuenta..</Text>
            </View>
            <View style={styles.form}>
                <View style={styles.images}>
                    <Image style={styles.logo} source={require("../../../../../assets/icons/locals.png")} />
                    <Image style={styles.logo} source={require("../../../../../assets/icons/user.png")} />
                </View>
                <RadioGroup flexDirection='row' radioButtons={data} onPress={onPress} />
            </View>
            <View style={styles.options}>
                <Button buttonStyle={StylesButtons.buttonSuccess} style={styles.next} title="Siguiente" onPress={onNext}></Button>
                <TouchableOpacity onPress={() => props.navigation.navigate("Login")}><Text>Iniciar sesión</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 24,
        paddingVertical: 10,
        color: 'black',
        textTransform: 'uppercase'
    },
    header: {
        justifyContent: 'center',
        flex:2
    },
    subTitle: {
        textAlign: 'center',
        fontSize: 14,
        color: 'black',
    },
    images: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        marginVertical: 20,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: "cover"
    },
    form:{
        flex:3,
        justifyContent:'center'
    },
    options: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    next: {
        width: 300,
        height: 50,
        borderRadius: 50,
    },
    buttonGroupStyle: {
        backgroundColor: 'transparent',
    },
    buttonGroupContainerStyle: {
        height: 100,
        width: "100%",
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        borderWidth: 1,
        marginVertical: 50,
    },
    nextContainer: {
        borderRadius: 50,
    },
    next: {
        width: 300,

    }
})