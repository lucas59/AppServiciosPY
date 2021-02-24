import React from 'react'
import { Dimensions } from 'react-native';
import { View } from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function SkeletonShowStore() {
    const { width } = Dimensions.get('screen');
    return (
        <View style={{ alignItems:'center', height: "100%", padding: 20 }}>
            <SkeletonPlaceholder>
                <View style={{ height: "100%", flexDirection: "column", alignItems: "center" }}>
                    <View style={{ width: 150, height: 150, marginVertical: 20, borderRadius: 100 }} />
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ width: 150, height: 20, borderRadius: 4 }} />
                        <View style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }} />
                    </View>

                    <View style={{ width: width-100, height: 200, marginVertical: 10, borderRadius: 5 }} />
                </View>
            </SkeletonPlaceholder>
        </View>
    )
}
