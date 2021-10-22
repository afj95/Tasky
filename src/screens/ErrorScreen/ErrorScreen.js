import React from 'react'
import { View } from "react-native"
import MyText from "../../components/UI/MyText"

export const ErrorScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MyText>errorHappened</MyText>
            <MyText>pleaseClose</MyText>
        </View>
    )
}
