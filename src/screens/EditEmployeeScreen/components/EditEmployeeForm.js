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

export const EditEmpoyeeForm = ({ RegisterProps: { handleChange, values, errors, handleBlur, handleSubmit }, isLoading }) => {
    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
            <View style={styles.textContainer}>
                <AntDesign name={'user'} size={15} style={{ marginEnd: 5 }} color={'#000'} />
                <MyText>name</MyText>
            </View>
            <TextInput
                style={styles.input(isLoading)}
                placeholder={t('app.name')}
                mode={'flat'}
                onChangeText={handleChange('name')}
                value={values?.name}
                error={errors?.name}
                onBlur={handleBlur('name')}
                theme={{ colors: { error: '#B22323', primary: '#595959' }, roundness: 12 }}
            />
            {errors?.name ? <ErrorText error={errors?.name}/> : null}

            <View style={styles.textContainer}>
                <Entypo name={'mobile'} size={15} style={{ marginEnd: 5 }} color={'#000'} />
                <MyText>phone</MyText>
            </View>
            <TextInput
                style={styles.input(isLoading)}
                placeholder={'05XXXXXXXX'}
                mode={'flat'}
                onChangeText={handleChange('username')}
                value={values?.username}
                error={errors?.username}
                onBlur={handleBlur('username')}
                keyboardType="decimal-pad"
                maxLength={10}
                theme={{ colors: { error: '#B22323', primary: '#595959' }, roundness: 12 }}
            />
            {errors?.username ? <ErrorText error={errors?.username}/> : null}

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
                <Entypo name={'mobile'} size={15} style={{ marginEnd: 5 }} color={'#000'} />
                <MyText>password</MyText>
            </View>
            <TextInput
                style={styles.input(isLoading)}
                placeholder={t('app.password')}
                mode={'flat'}
                onChangeText={handleChange('password')}
                value={values?.password}
                error={errors?.password}
                onBlur={handleBlur('password')}
                theme={{ colors: { error: '#B22323', primary: '#595959' }, roundness: 12 }}
            />
            {errors?.password ? <ErrorText error={errors?.password}/> : null}
            
            {isLoading ?
                <View 
                    style={styles.registerButton}>
                    <ActivityIndicator size={'large'} color={'white'} />
                </View>
            :
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={handleSubmit}>
                    <MyText style={{ color: 'white', fontSize: 18 }}>editEmployee</MyText>
                </TouchableOpacity>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
    registerButton: {
        height: 50,
        backgroundColor: 'black',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        // shadow
        shadowColor: '#888888',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    input: (isLoading) => ({
        width: '100%',
        justifyContent: 'center',
        backgroundColor: isLoading ? '#f2f2f2' : 'white',
    })
})

const ErrorText = ({ error }) => <MyText style={{ color: '#B22323', fontSize: 12 }}>{error}</MyText>