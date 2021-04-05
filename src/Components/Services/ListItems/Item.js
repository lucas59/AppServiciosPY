import React from 'react'
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_TAB } from '../../../../Redux/actions/tabsActions';

export default function Item({ name, icon }) {
    const tab = useSelector(state => state.tabsManager.tab);
    const dispatch = useDispatch();

    const changeTab = (name) => {
        dispatch(CHANGE_TAB(name))
    }

    return (
        <TouchableOpacity onPress={() => changeTab(name)} containerStyle={styles.container}>
            <Icon
                size={30}
                name={icon}
                type='font-awesome-5'
                color={name == tab ? 'white' : '#D6D6D6'}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', width: 100, height: 40
    }
})