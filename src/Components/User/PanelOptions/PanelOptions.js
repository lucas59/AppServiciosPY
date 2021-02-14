import React from 'react'
import Profile from './Options/Profile'
import About from './Options/About'
import Profile from './Options/Profile'
import PanelListItems from './PanelListItems'
import Help from './Options/Help'
import Messages from './Options/Message'
import Favorites from './Options/Favorites'
import Orders from './Options/Orders'

export default function PanelOptions() {

    const handleItem = (code) => {
        setitem(code);
    }
    
    return (
        <SwipeablePanel closeRootStyle={styles.close} {...panelProps} isActive={panelDrawer}>
        { item === 'none' ? (
            <PanelListItems handleItem={handleItem} />
        ) : item === 'profile' ? (
            <Profile />
        ) : item === 'about' ? (
            <About />
        ) : item === 'help' ? (
            <Help />
        ) : item === "messages" ? (
            <Messages />
        ) : item === 'favorites' ? (
            <Favorites />
        ) : item === 'orders' ? (
            <Orders />
        ) : (
                                        <Text>Cargando</Text>
                                    )}
    </SwipeablePanel>
    )
}
