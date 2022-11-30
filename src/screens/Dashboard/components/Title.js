import React from 'react'
import {
    StyleSheet,
    View
} from 'react-native'
import MyText from '../../../components/UI/MyText'
import Question from '../../../components/UI/Question'

export const Title = ({ text, data, onPress }) => {
    return (
        <View style={styles.title}>
            <MyText style={styles.text}>{text}</MyText>
            <Question data={data} onPress={onPress} />
        </View>

    )
}

const styles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 5,
    },
    text: {
        fontFamily: 'bold',
        fontWeight: '600',
    }
})

