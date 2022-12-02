import React from 'react'
import {
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import { AntDesign, Entypo } from '@expo/vector-icons';
import MyText from '../../../components/UI/MyText';
import { t } from '../../../i18n';
import Colors from '../../../utils/Colors';

export const AddEmpoyeeForm = ({ RegisterProps: { handleChange, values, errors, handleBlur, handleSubmit }, isLoading }) => {
    return (
        <View>
            <View style={styles.textContainer}>
                <AntDesign name={'user'} size={15} style={{ marginEnd: 5 }} color={Colors.appWhite} />
                <MyText style={styles.label}>name</MyText>
            </View>
            <TextInput
                style={styles.input}
                // placeholder={t('app.name')}
                // placeholderTextColor={Colors.secondary}
                mode={'flat'}
                onChangeText={handleChange('name')}
                value={values?.name}
                error={errors?.name}
                onBlur={handleBlur('name')}
                theme={{ colors: { text: Colors.primary, error: '#B22323', primary: '#595959' }, roundness: 12 }}
            />
            {errors?.name ? <ErrorText error={errors?.name} /> : null}

            <View style={styles.textContainer}>
                <Entypo name={'mobile'} size={15} style={{ marginEnd: 5 }} color={Colors.appWhite} />
                <MyText style={styles.label}>phone</MyText>
            </View>
            <TextInput
                style={styles.input}
                placeholder={'05XXXXXXXX'}
                placeholderTextColor={Colors.secondary}
                mode={'flat'}
                onChangeText={handleChange('username')}
                value={values?.username}
                error={errors?.username}
                onBlur={handleBlur('username')}
                keyboardType="decimal-pad"
                maxLength={10}
                theme={{ colors: { text: Colors.primary, error: '#B22323', primary: '#595959' }, roundness: 12 }}
            />
            {errors?.username ? <ErrorText error={errors?.username} /> : null}

            {isLoading ?
                <View style={styles.registerButton}>
                    <ActivityIndicator size={'large'} color={'white'} />
                </View>
                :
                <TouchableOpacity
                    style={styles.addEmployeeButton}
                    onPress={handleSubmit}>
                    <MyText style={{ fontSize: 18, color: Colors.appWhite, fontFamily: 'bold' }}>addEmployee</MyText>
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
    addEmployeeButton: {
        height: 50,
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    },
    input: {
        width: '100%',
        marginTop: 5,
        justifyContent: 'center',
        backgroundColor: Colors.appWhite,
        fontFamily: 'bold'
    },
    label: {
        color: Colors.appWhite,
        fontFamily: 'bold',
    }
})

const ErrorText = ({ error }) => <MyText style={{ color: '#B22323', fontSize: 12 }}>{error}</MyText>