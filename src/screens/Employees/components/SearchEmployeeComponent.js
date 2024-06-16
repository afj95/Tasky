import React from 'react'
import Colors from '../../../utils/Colors'
import {
     View,
     StyleSheet,
     ActivityIndicator
} from 'react-native'
import TextInput from '../../../components/UI/TextInput'
import { AntDesign, Entypo } from '@expo/vector-icons'
import _ from 'underscore'
import { t } from '../../../i18n'

export const SearchEmployeeComponent = ({
     employeeName,
     setEmployeeName,
     searchEmployee,
     loadings,
     refresh
}) => {

     const inputTheme = {
          colors: {
               text: Colors.primary,
               error: '#B22323',
               primary: '#595959'
          },
          roundness: 8
     }

     const onChangeText = text => {
          setEmployeeName(text); // Setting the value

          let debounce_fn = _.debounce(async () => {
               searchEmployee();
          }, 250)

          if (text === '')
               refresh();

          if (text.length > 2)
               debounce_fn();
     }

     const clearText = () => {
          if (employeeName !== '') {
               setEmployeeName('');
               refresh();
          }
     }

     return (
          <View style={styles.container}>
               <View style={styles.textInputContainer}>
                    {loadings?.employees_refresh ?
                         <ActivityIndicator size={'small'} color={Colors.primary} style={styles.loading} />
                         :
                         <AntDesign name={'search1'} size={20} color={Colors.primary} onPress={searchEmployee} />
                    }
                    <TextInput
                         style={styles.input}
                         placeholder={t('app.employeeNameSearch')}
                         placeholderTextColor={'#b9b9b9'}
                         mode={'flat'}
                         fontFamily={'light'}
                         onChangeText={onChangeText}
                         value={employeeName}
                         onSubmitEditing={searchEmployee}
                         enablesReturnKeyAutomatically
                         autoCapitalize={'none'}
                         theme={inputTheme}
                    />
                    {employeeName &&
                         <Entypo
                              name={'cross'}
                              size={22}
                              color={Colors.primary}
                              onPress={clearText}
                         />
                    }
               </View>
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          backgroundColor: Colors.appWhite,
          marginHorizontal: 22,
          marginTop: 5,
     },
     textInputContainer: {
          backgroundColor: Colors.white,
          width: '100%',
          height: 45,
          overflow: 'hidden',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          borderRadius: 8,
          marginBottom: 5,
     },
     input: {
          width: '88%',
          justifyContent: 'center',
          backgroundColor: Colors.white,
          fontFamily: 'bold',
          height: 52,
          borderRadius: 8,
     },
})