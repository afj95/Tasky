import React, { useState } from 'react'
import {
     I18nManager,
     StyleSheet,
     View
} from 'react-native'
import Modal from 'react-native-modal';
import MyText from '../../../components/UI/MyText';
import Colors from '../../../utils/Colors';
import { TextInput } from 'react-native-paper';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { editProfile } from '../../../redux/reducers/Users/users-actions';
import { fetchProfile } from '../../../redux/reducers/Auth/auth-actions';
import About from './About';

export const ProfileModal = ({ visible, closeModal, label, value, user }) => {
     const dispatch = useDispatch()

     const [text, setText] = useState('');
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
               let params = { ...user };
               switch (label) {
                    case 'name': {
                         params = { ...params, name: text }
                    }
                         break;
                    case 'phone': {
                         params = { ...params, phone: text }
                    }
                         break;
                    case 'email': {
                         params = { ...params, email: text }
                    }
                         break;
                    case 'password': {
                         params = { ...params, password: text }
                    }
                         break;
               }

               dispatch(editProfile(user.id, params))
               dispatch(fetchProfile())
          }
          closeModal()
     }

     const AboutComponent = () => <MyText text={I18nManager.isRTL ? new About().about_ar : new About().about_en} />

     return (
          <Modal
               swipeThreshold={10}
               isVisible={visible}
               style={styles.modal}
               onBackButtonPress={closeModal}
               onBackdropPress={closeModal}
               animationIn={'slideInUp'}
               animationInTiming={500}
               animationOutTiming={500}
               useNativeDriver>
               <View style={styles.contentView}>
                    <View style={styles.header}>
                         <View />
                         <MyText style={styles.headerText}>editProfile</MyText>
                         <AntDesign
                              name={'checkcircleo'}
                              size={30}
                              color={Colors.primary}
                              onPress={edit}
                         />
                    </View>
                    <MyText style={styles.headerText}>{label}</MyText>
                    {label === 'about' ? <AboutComponent /> :
                         <>
                              <>
                                   <TextInput
                                        style={styles.input}
                                        defaultValue={value}
                                        placeholderTextColor={Colors.secondary}
                                        mode={'flat'}
                                        fontFamily={'light'}
                                        theme={inputTheme}
                                        onChangeText={validateValue}
                                        secureTextEntry={label === 'password'}
                                   />
                                   {error && label !== 'password' ? <ErrorText error={error} /> : null}
                              </>
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
                         </>
                    }
               </View>
          </Modal>
     )
}

const styles = StyleSheet.create({
     modal: {
          margin: 0,
          justifyContent: 'flex-end'
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
          fontSize: 18,
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