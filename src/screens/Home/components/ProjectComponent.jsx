import React from 'react'
import Colors from '../../../utils/Colors'
import {
     View,
     StyleSheet
} from 'react-native'
import TouchableOpacity from '../../../components/UI/TouchableOpacity'
import MyText from '../../../components/UI/MyText'
import { t } from '../../../i18n'
import moment from 'moment'
import { navigate } from '../../../navigation/RootNavigation'

export const ProjectComponent = ({ item }) => {

     const onProjectPressed = () => {
          navigate('ProjectDetailsScreen', {
               id: item.id,
               inProgress: false
          })
     }

     return (
          <TouchableOpacity
               onPress={onProjectPressed}
               activeOpacity={0.85}
               style={styles.projectItem(item?.status)}>
               <View style={{ alignItems: 'center' }}>
                    <MyText style={styles.projectName} text={item?.name} />
                    <MyText style={styles.projectDescription} ellipsizeMode={'tail'} numberOfLines={3} text={item?.description} />
                    <MyText style={styles.projectStatus} text={t(`app.${item?.status}`)} />
                    {item?.start_date &&
                         <>
                              <View style={styles.seperator} />
                              <MyText style={styles.projectStartDate} text={moment(item?.start_date).format('DD/MM/YYYY')} />
                         </>
                    }
               </View>
          </TouchableOpacity>
     )
}

const styles = StyleSheet.create({
     projectItem: status => ({
          backgroundColor: Colors.white,
          width: '100%',
          marginVertical: 5,
          borderWidth: 1,
          borderColor: status === 'finished' ? Colors.red : Colors.secondary,
          alignSelf: 'center',
          borderRadius: 8,
          padding: 5,
     }),
     projectName: {
          fontFamily: 'bold',
          fontSize: 16
     },
     projectDescription: {
          fontFamily: 'light',
          fontSize: 15,
     },
     projectStatus: {
          fontFamily: 'light',
          fontSize: 12,
     },
     seperator: {
          height: StyleSheet.hairlineWidth,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          width: '100%',
          marginTop: 2,
     },
     projectStartDate: {
          fontFamily: 'light',
          textAlign: 'left',
          marginTop: 8,
          fontSize: 10
     },
})