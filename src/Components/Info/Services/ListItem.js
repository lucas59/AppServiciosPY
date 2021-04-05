import { Text } from 'native-base'
import React from 'react'

export default function ListItem({item}) {
    return (
        <Text>{ item.name }</Text>
    )
}
