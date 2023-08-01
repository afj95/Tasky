import React from 'react'
import Colors from '../../utils/Colors'
import {
     View,
     StyleSheet
} from 'react-native'
import { MainHeader } from '../../components/UI/MainHeader'
import { ScrollView } from 'react-native-gesture-handler'
import { Item } from './components'

export const EmployeeDetailsScreen = ({ route: { params: { employee } } }) => {

     return (
          <View style={styles.container}>
               <MainHeader showGoBack title={'employeeDetails'} translate />
               <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <ScrollView>
                         <Item
                              label={'nameAr'}
                              text={employee?.name}
                         />
                         <Item
                              label={'nameEn'}
                              text={employee?.name_en}
                         />
                         <Item
                              label={'email'}
                              text={employee?.email}
                         />
                         <Item
                              label={'phone'}
                              text={employee?.phone_number}
                         />
                         <Item
                              label={'nationalId'}
                              text={employee?.national_id}
                         />
                         <Item
                              label={'idStartDate'}
                              text={employee?.id_start_date}
                              date
                         />
                         <Item
                              label={'idExpiryDate'}
                              text={employee?.id_expiry_date}
                              date
                         />
                         <Item
                              label={'idStartDateHijri'}
                              text={employee?.id_start_date_hijri}
                         />
                         <Item
                              label={'idExpiryDateHijri'}
                              text={employee?.id_expiry_date_hijri}
                         />
                         <Item
                              label={'idImage'} // pdf
                              text={employee?.id_image}
                              image
                         />
                         <Item
                              label={'licenseId'}
                              text={employee?.license_id}
                         />
                         <Item
                              label={'licenseImage'} // pdf
                              text={employee?.license_image}
                         />
                         <Item
                              label={'familyStatus'}
                              text={employee?.family_status}
                         />
                         <Item
                              label={'gender'}
                              text={employee?.gender}
                         />
                         <Item
                              label={'educated'}
                              text={employee?.educated}
                         />
                         <Item
                              label={'bankAccount'}
                              text={employee?.bank_account}
                         />
                         <Item
                              label={'nationality'}
                              text={employee?.nationality}
                         />
                         <Item
                              label={'insuranceNumber'}
                              text={employee?.insurance_number}
                         />
                         <Item
                              label={'workOfficeNumber'}
                              text={employee?.work_office_number}
                         />
                         <Item
                              label={'orgNumber'}
                              text={employee?.org_number}
                         />
                         <Item
                              label={'position'}
                              text={employee?.position}
                         />
                         <Item
                              label={'birthdate'} // date
                              text={employee?.birthdate}
                              date
                         />
                         <Item
                              label={'joiningDate'} // date
                              text={employee?.joining_date}
                              date
                         />
                         <Item
                              label={'salary'}
                              text={employee?.salary}
                         />
                         <Item
                              label={'contractNumber'}
                              text={employee?.contract_number}
                         />
                         <Item
                              label={'contractImage'} // pdf
                              text={employee?.contract_image}
                         />
                         <Item
                              label={'passportNumber'}
                              text={employee?.passport_number}
                         />
                         <Item
                              label={'passportImage'} // pdf
                              text={employee?.passport_image}
                         />
                         <Item
                              label={'passportExpiryDate'}
                              text={employee?.passport_expiry_date}
                              date
                         />
                         {employee?.clearance ?
                              <>
                                   <Item
                                        label={'clearance'}
                                        text={employee?.clearance}
                                   />
                                   <Item
                                        label={'clearanceDate'} // date
                                        text={employee?.clearance_date}
                                        date
                                   />
                              </> : null}
                    </ScrollView>
               </View>
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: Colors.appWhite
     }
})