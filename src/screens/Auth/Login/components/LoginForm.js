import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { AntDesign, Feather } from '@expo/vector-icons';
import MyText from '../../../../components/UI/MyText';
import { t } from '../../../../i18n';
import { useSelector } from 'react-redux';
import Colors from '../../../../utils/Colors';
import TouchableOpacity from '../../../../components/UI/TouchableOpacity';

export const LoginForm = ({ loginProps: { handleChange, values, errors, handleBlur, handleSubmit } }) => {

    const loadings = useSelector((state) => state?.globalReducer?.loadings)
    const [showPass, setShowPass] = useState(false);

    const inputTheme = {
        colors: {
            text: Colors.primary,
            error: '#B22323',
            primary: '#595959'
        },
        roundness: 10
    }

    return (
        <View>
            <View style={styles.textContainer}>
                <AntDesign name={'user'} size={15} style={{ marginEnd: 5 }} color={Colors.appWhite} />
                <MyText style={styles.label}>phone</MyText>
            </View>
            <TextInput
                style={styles.input}
                placeholder={t('app.phone')}
                placeholderTextColor={Colors.secondary}
                mode={'flat'}
                fontFamily={'light'}
                onChangeText={handleChange('phone_number')}
                value={values?.phone_number}
                error={errors?.phone_number}
                autoCapitalize={false}
                onBlur={handleBlur('phone_number')}
                keyboardType={"number-pad"}
                theme={inputTheme}
            />
            {errors?.phone_number ? <ErrorText error={errors?.phone_number} /> : null}

            <View style={[styles.textContainer, { marginTop: 30 }]}>
                <Feather name={'lock'} size={15} style={{ marginEnd: 5 }} color={Colors.appWhite} />
                <MyText style={styles.label}>password</MyText>
            </View>
            <TextInput
                style={styles.input}
                // placeholder={t('app.password')}
                placeholderTextColor={Colors.secondary}
                mode={'flat'}
                onChangeText={handleChange('password')}
                value={values?.password}
                error={errors?.password}
                secureTextEntry={showPass ? false : true}
                onBlur={handleBlur('password')}
                theme={inputTheme}
                right={
                    <TextInput.Icon
                        name={showPass ? 'eye' : 'eye-off'}
                        size={24}
                        color={Colors.secondary}
                        style={{ paddingRight: 10 }}
                        onPress={() => setShowPass(!showPass)}
                    />
                }
            />
            {errors?.password ? <ErrorText error={errors?.password} /> : null}

            <View style={styles.loginButtonContainer}>
                <TouchableOpacity
                    style={styles.loginButton}
                    disabled={loadings?.login}
                    onPress={handleSubmit}
                >
                    {loadings?.login ?
                        <ActivityIndicator size={'large'} color={'white'} />
                        :
                        <MyText style={styles.loginText}>login</MyText>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        color: Colors.appWhite,
        fontFamily: 'bold',
        fontSize: 15
    },
    loginButtonContainer: {
        marginTop: 50
    },
    loginButton: {
        height: 50,
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText: {
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
    forgotPass: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 5
    },
    newHere: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    signupText: {
        color: Colors.lightBlue,
        textDecorationLine: 'underline'
    }
})

const ErrorText = ({ error }) => {
    return (
        <MyText
            style={{
                backgroundColor: 'rgba(153, 0, 0, 0.6)',
                width: '100%',
                borderRadius: 3,
                color: '#ffb3b3',
                fontSize: 12,
                fontFamily: 'bold',
                marginTop: 2,
                textAlign: 'left'
            }}>
            {error}
        </MyText>
    )
}