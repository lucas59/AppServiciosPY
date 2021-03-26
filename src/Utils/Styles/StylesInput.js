import { StyleSheet } from "react-native";

export const StylesInput = StyleSheet.create({
    containerInput: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45
    },
    label: {
        fontSize: 12,
        width: '30%',
    },
    input: {
        borderWidth: 0,
        borderRadius: 5,
        backgroundColor: '#ccc',
        color: 'black',
        height: 35,
    },
    messageError: {
        color: "red"
    },
    errorMessage: {
        color: 'red',
        fontSize: 12
    }
})