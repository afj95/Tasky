import React from 'react'
import {
    StyleSheet,
    View
} from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import MyText from '../../../components/UI/MyText'
import Question from '../../../components/UI/Question'
import Colors from '../../../utils/Colors'

export const Title = ({ text, data, onPress, loading }) => {
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <MyText style={styles.text}>{text}</MyText>
                <Question data={data} onPress={onPress} />
            </View>
            {loading ? <ActivityIndicator size={10} color={Colors.primary} /> : null}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingEnd: 10,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 5,
        width: '100%'
    },
    text: {
        fontFamily: 'bold',
        fontWeight: '600',
    }
})

