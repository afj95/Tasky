import React from 'react'
import { View } from "react-native"
import MyText from "../../components/UI/MyText"

export const NoInternetScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MyText style={{ fontFamily: 'bold', fontSize: 15, color: 'red' }}>noInternet</MyText>
        </View>
    )
}
