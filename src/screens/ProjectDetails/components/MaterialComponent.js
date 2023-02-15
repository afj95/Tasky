import React from 'react'
import MyText from '../../../components/UI/MyText';
import Colors from '../../../utils/Colors';
import moment from 'moment';
import 'moment/locale/en-gb';
import {
     I18nManager,
     StyleSheet,
     View
} from 'react-native';

export const MaterialComponent = ({ material }) => {
     return (
          <View style={styles.materialContainer}>
               <View>
                    <MyText style={styles.materialText} numberOfLines={3} text={`${material?.title}`} />
                    <MyText style={styles.materialDate} text={moment(material?.date).fromNow()} />
               </View>
               <View style={styles.checkContainer}>
                    <MyText text={material?.quantity} />
               </View>
          </View>
     )
}

const styles = StyleSheet.create({
     materialContainer: {
          backgroundColor: Colors.white,
          alignItems: 'center',
          paddingEnd: 20,
          paddingStart: 10,
          fontSize: 13,
          width: '100%',
          paddingVertical: 5,
          marginVertical: 2,
          justifyContent: 'space-between',
          flexDirection: 'row'
     },
     materialText: {
          color: Colors.text,
          textDecorationStyle: 'solid',
          width: '90%',
          textAlign: 'left',
          alignSelf: 'flex-start',
          fontSize: 15
     },
     materialDate: {
          fontSize: 12,
          width: '90%',
          textAlign: 'left',
     },
     checkContainer: {
          alignSelf: 'center',
          width: '10%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end'
     },
})