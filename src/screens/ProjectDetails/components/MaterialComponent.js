import React, { useEffect } from 'react'
import MyText from '../../../components/UI/MyText';
import Colors from '../../../utils/Colors';
import moment from 'moment/min/moment-with-locales';
import { StyleSheet, View, I18nManager } from 'react-native';

export const MaterialComponent = ({ material }) => {

     useEffect(() => {
          moment.locale(I18nManager.isRTL ? 'ar' : 'en');
     }, [])

     return (
          <View style={styles.materialContainer}>
               <View>
                    <MyText style={styles.materialText} numberOfLines={3} text={`${material?.title}`} />
                    <MyText style={styles.materialDate} text={moment(material?.date).fromNow()} />
               </View>
               <View style={styles.quantityContainer}>
                    <MyText text={material?.quantity} />
               </View>
          </View>
     )
}

const styles = StyleSheet.create({
     materialContainer: {
          backgroundColor: Colors.white,
          alignItems: 'center',
          paddingHorizontal: 10,
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
          textAlign: 'left',
          alignSelf: 'flex-start',
          fontSize: 15
     },
     materialDate: {
          fontSize: 12,
          textAlign: 'left',
     },
     quantityContainer: {
          alignSelf: 'center',
          marginEnd: 15
     },
})