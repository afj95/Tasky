import React from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import MyText from '../../../components/UI/MyText'
import Colors from '../../../utils/Colors'

export const DetailesText = ({ text, value = 0 }) => {
    return (
        <View style={styles.detailsTextContainer}>
            <MyText style={styles.detailsText}>{text}</MyText>
            <MyText style={[styles.detailsText, { color: value ? Colors.primary : Colors.red }]} text={value} />
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