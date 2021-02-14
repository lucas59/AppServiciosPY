import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { StylesButtons } from "./StylesButtons";

const { height } = Dimensions.get('window');

export const StyleGenerals = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
        height:height
    },
    form: {
        borderWidth:1,
        flex:5
    },
    options: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        borderWidth:1,
        paddingVertical: 20
    },
})