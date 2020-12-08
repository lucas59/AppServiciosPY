import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const component1 = () => <Icon name="user" size={32} />;
const component2 = () => <Icon name="store" size={32} />;

export default function Step1(props) {
    const buttons = [{ element: component1 }, { element: component2 }]
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tipo de cuenta</Text>
            <View style={styles.options}>
                    <ButtonGroup
                        selectedIndex={0}
                        buttonStyle={styles.buttonGroupStyle}
                        buttons={buttons}
                        containerStyle={{ height: 100 }} />
            </View>
                <Button style={styles.next} title="Siguiente" onPress={() => props.wizard.current.next()}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray'
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        paddingVertical: 100,
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    next: {
        width: 300,
        height: 50,
        borderRadius: 50,
    },
    options: {

    },
    next:{
        width: 300
    }
})