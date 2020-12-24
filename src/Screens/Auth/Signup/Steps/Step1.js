import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, ButtonGroup, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const component1 = () => <CheckBox
    title='Click Here'
    checked={true}
/>;
const component2 = () => <CheckBox
    title='Click Here'
    checked={false}
/>;

export default function Step1(props) {
    const buttons = [{ element: component1 }, { element: component2 }]
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido a ...</Text>
            <Text style={styles.subTitle}>A continuación deberás seguir 3 pasos para crear tu cuenta</Text>
            <View style={styles.options}>
                <ButtonGroup
                    buttonStyle={styles.buttonGroupStyle}
                    buttons={buttons}
                    containerStyle={styles.buttonGroupContainerStyle}
                />
            </View>
            <Button containerStyle={styles.nextContainer} style={styles.next} title="Siguiente" onPress={() => props.wizard.current.next()}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        paddingVertical: 50,
        justifyContent:'center',
        alignItems:'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        paddingVertical: 10,
        color: 'black',
        textTransform: 'uppercase'
    },
    subTitle: {
        textAlign: 'center',
        fontSize: 14,
        color: 'black',
    },
    next: {
        width: 300,
        height: 50,
        borderRadius: 50,
    },
    buttonGroupStyle:{
        backgroundColor:'transparent',
    },
    buttonGroupContainerStyle:{
        height:100,
        width:"100%",
        borderColor:'transparent',
        backgroundColor:'transparent',
        borderWidth:1,
        marginVertical:50,
    },
    options: {

    },
    nextContainer:{
        borderRadius:50,
    },
    next: {
        width: 300,

    }
})