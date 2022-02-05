import React from 'react'
import {
    View,
    StyleSheet
} from 'react-native';
import { t } from '../../i18n';
import MyText from './MyText';

export default ErrorHappened = () => {
    return (
        <View style={styles.container}>
            <MyText>errorHappened</MyText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})