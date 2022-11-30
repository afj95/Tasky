import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import MyText from '../../../components/UI/MyText'

export const DetailesText = ({ text, value }) => {
    return (
        <View style={styles.detailsTextContainer}>
            <MyText style={styles.detailsText}>{text}</MyText>
            <MyText text={value} style={styles.detailsText} />
        </View>
    )
}

const styles = StyleSheet.create({
    detailsTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    detailsText: {
        marginVertical: 10,
        fontFamily: 'light'
    }
})