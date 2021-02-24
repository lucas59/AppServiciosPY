import React, { useState } from 'react'
import Profile from './Options/Profile'
import About from './Options/About'
import PanelListItems from './PanelListItems'
import Help from './Options/Help'
import { SwipeablePanel } from 'rn-swipeable-panel'
import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_OPTIONPANEL_VISIBLE } from '../../../../Redux/actions/panelsActions'

export default function PanelOptions({ navigation }) {
    const item = "none"
    const dispatch = useDispatch();

    const closePanel = () =>{
        dispatch(CHANGE_OPTIONPANEL_VISIBLE(false))
    }

    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,
        showCloseButton: true,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        // ...or any prop you want
    });
    const visible = useSelector(state => state.optionsPanel.visible)
    const handleItem = (code) => {
        setitem(code);
    }
    console.log(visible);
    return (
        <SwipeablePanel {...panelProps} isActive={visible}>
            { item === 'none' ? (
                <PanelListItems navigation={navigation} handleItem={handleItem} />
            ) : item === 'profile' ? (
                <Profile />
            ) : item === 'about' ? (
                <About />
            ) : item === 'help' ? (
                <Help />
            ) : (
                                <Text>Cargando</Text>
                            )}
        </SwipeablePanel>
    )
}
