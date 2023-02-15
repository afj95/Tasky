import React, { useEffect, useState } from 'react'
import {
     I18nManager,
     StyleSheet,
     View,
     KeyboardAvoidingView,
     Platform
} from 'react-native'
import Modal from 'react-native-modal';
import MyText from '../../../components/UI/MyText';
import Colors from '../../../utils/Colors';
import { TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile, resetUserErrors } from '../../../redux/reducers/Users/users-actions';
import About from './About';
import { showMessage } from '../../../tools';
import { t } from '../../../i18n';

export const ProfileModal = ({ visible, closeModal, label, value, user }) => {
     const dispatch = useDispatch()

     const errors = useSelector((state) => state?.globalReducer?.errors)
     const profile_updated = useSelector((state) => state.usersReducer.profile_updated);

     const [text, setText] = useState('');
     // password validation error
     const [confirmError, setConfirmError] = useState('');
     const [error, setError] = useState('');

     const inputTheme = {
          colors: {
               text: Colors.primary,
               error: '#B22323',
               primary: '#595959'
          },
          roundness: 5
     }

     useEffect(() => {
          dispatch(resetUserErrors())
     }, [])

     useEffect(() => {
          if (errors?.edit_profile) {
               showMessage({
                    message: errors?.edit_profile,
                    type: 'danger'
               })
          }
          if (profile_updated) {
               showMessage({
                    message: t('app.successOperation'),
                    type: 'success',
                    duration: 1500
               })
               dispatch(resetUserErrors())
          }
     }, [errors?.edit_profile, profile_updated])


     const checkPhone = input => {
          if (isNaN(input)) {
               setError('phoneNumbersOnlyNums')
          } else if (input?.charAt(0) !== '0') {
               setError('phonneNumstart')
          } else if (input?.length < 10) {
               setError('phoneNumlength')
          } else {
               setError('')
          }
     }

     const checkEmail = (input) => {
          // Add regExp to check valid email
     }

     const validateValue = input => {
          switch (label) {
               case 'phone': checkPhone(input)
                    break
               case 'email': checkEmail(input)
                    break
          }
          setText(input)
     }

     const validateConfirm = input => {
          if (input !== text) {
               setConfirmError('notMatched')
          } else {
               setConfirmError('')
          }
     }

     const edit = () => {
          if (label !== 'about' && text && (!confirmError && !error)) {
               // TODO: Validate 
               let params = { ...user };
               switch (label) {
                    case 'name': {
                         params = { ...user, name: text }
                    }
                         break;
                    case 'phone': {
                         params = { ...user, phone_number: text }
                    }
                         break;
                    case 'email': {
                         params = { ...user, email: text }
                    }
                         break;
                    case 'password': {
                         params = { ...user, password: text }
                    }
                         break;
               }

               dispatch(editProfile(user.id, params))
          }
          closeModal()
     }

     const AboutComponent = () => <MyText text={I18nManager.isRTL ? new About().about_ar : new About().about_en} />

     const close = () => {
          if (error) {
               setError(null)
          }
          closeModal()
     }

     return (
          <Modal
               swipeThreshold={10}
               isVisible={visible}
               style={styles.modal}
               onBackButtonPress={close}
               onBackdropPress={close}
               animationIn={'slideInUp'}
               animationInTiming={500}
               animationOutTiming={500}
               useNativeDriver
               avoidKeyboard>
               <View style={styles.contentView}>
                    <View style={styles.header}>
                         <View />
                         <MyText style={styles.headerText}>editProfile</MyText>
                         <AntDesign
                              name="check"
                              size={22}
                              color={Colors.primary}
                              onPress={edit}
                         />
                    </View>
                    <MyText style={styles.headerText}>{label}</MyText>
                    {label === 'about' ? <AboutComponent /> :
                         <View>
                              <View>
                                   <TextInput
                                        style={styles.input}
                                        defaultValue={value}
                                        placeholderTextColor={Colors.secondary}
                                        mode={'flat'}
                                        fontFamily={'light'}
                                        theme={inputTheme}
                                        onChangeText={validateValue}
                                        keyboardType={label === 'email' ? 'email-address' : label === 'phone' ? 'decimal-pad' : 'default'}
                                        secureTextEntry={label === 'password'}
                                   />
                                   {error && label !== 'password' ? <ErrorText error={error} /> : null}
                              </View>
                              {label === 'password' ?
                                   <>
                                        <TextInput
                                             style={styles.input}
                                             placeholderTextColor={Colors.secondary}
                                             mode={'flat'}
                                             fontFamily={'light'}
                                             theme={inputTheme}
                                             onChangeText={validateConfirm}
                                             secureTextEntry={label === 'password'}
                                             error={confirmError}
                                        />
                                        {confirmError ? <ErrorText error={confirmError} /> : null}
                                   </>
                                   : null
                              }
                         </View>
                    }
               </View>
          </Modal>
     )
}

const styles = StyleSheet.create({
     modal: {
          margin: 0,
          justifyContent: 'flex-end',
          flex: 1,
     },
     contentView: {
          width: '100%',
          backgroundColor: Colors.appWhite,
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
          padding: 10,
          paddingBottom: 20
     },
     header: {
          height: 40,
          borderBottomWidth: 0.5,
          borderColor: Colors.primary,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row'
     },
     headerText: {
          fontFamily: 'bold',
          color: Colors.primary,
          marginTop: 8,
          marginBottom: 2
     },
     input: {
          width: '95%',
          height: 50,
          marginTop: 5,
          justifyContent: 'center',
          backgroundColor: Colors.white,
          fontFamily: 'bold'
     }
})

const ErrorText = ({ error }) => <MyText style={{ color: '#B22323', fontSize: 12, fontFamily: 'bold' }}>{error}</MyText>