import React from 'react'
import {
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import { AntDesign, Entypo } from '@expo/vector-icons';
import MyText from '../../../components/UI/MyText';
import { t } from '../../../i18n';
import Colors from '../../../utils/Colors';

export const EditEmpoyeeForm = ({ RegisterProps: { handleChange, values, errors, handleBlur, handleSubmit }, isLoading }) => {
    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
            <View style={styles.formContainer}>
                <View style={styles.textContainer}>
                    <AntDesign name={'user'} size={15} style={{ marginEnd: 5 }} color={Colors.appWhite} />
                    <MyText style={styles.label}>name</MyText>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder={t('app.name')}
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

                {/* <View style={styles.textContainer}>
                    <Entypo name={'mobile'} size={15} style={{ marginEnd: 5 }} color={'#000'} />
                    <MyText>role</MyText>
                </View>
                <TextInput
                    style={styles.input(isLoading)}
                    placeholder={t('app.role')}
                    mode={'flat'}
                    onChangeText={handleChange('role')}
                    value={values?.role}
                    error={errors?.role}
                    onBlur={handleBlur('role')}
                    keyboardType="decimal-pad"
                    maxLength={10}
                    theme={{ colors: { error: '#B22323', primary: '#595959' }, roundness: 12 }}
                />
                {errors?.role ? <ErrorText error={errors?.role}/> : null} */}

                <View style={styles.textContainer}>
                    <Entypo name={'mobile'} size={15} style={{ marginEnd: 5 }} color={Colors.appWhite} />
                    <MyText style={styles.label}>password</MyText>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder={t('app.password')}
                    mode={'flat'}
                    onChangeText={handleChange('password')}
                    value={values?.password}
                    error={errors?.password}
                    onBlur={handleBlur('password')}
                    theme={{ colors: { text: Colors.primary, error: '#B22323', primary: '#595959' }, roundness: 12 }}
                />
                {errors?.password ? <ErrorText error={errors?.password} /> : null}

                {isLoading ?
                    <View
                        style={styles.registerButton}>
                        <ActivityIndicator size={'large'} color={Colors.primary} />
                    </View>
                    :
                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={handleSubmit}>
                        <MyText style={styles.editText}>editEmployee</MyText>
                    </TouchableOpacity>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
    label: {
        fontFamily: 'bold',
        color: Colors.appWhite,
        fontSize: 15
    },
    registerButton: {
        height: 50,
        backgroundColor: Colors.lightBlue,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    editText: {
        color: Colors.appWhite,
        fontSize: 18,
        fontFamily: 'bold'
    },
    input: {
        width: '100%',
        marginTop: 5,
        justifyContent: 'center',
        backgroundColor: Colors.appWhite,
        fontFamily: 'bold'
    },
})

const ErrorText = ({ error }) => <MyText style={{ color: '#B22323', fontSize: 12 }}>{error}</MyText>