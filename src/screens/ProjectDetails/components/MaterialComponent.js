import React, { useEffect } from 'react'
import MyText from '../../../components/UI/MyText';
import Colors from '../../../utils/Colors';
import moment from 'moment';
import '../../../utils/ar-sa-mine';
import { StyleSheet, View, I18nManager } from 'react-native';

export const MaterialComponent = ({ material }) => {

     return (
          <View style={styles.materialContainer}>
               <View>
                    <MyText style={styles.materialText} numberOfLines={3} text={`${material?.title}`} />
                    <MyText style={styles.materialDate} text={moment(material?.date).fromNow()} />
               </View>
               <View style={styles.quantityContainer}>
                    <MyText text={material?.pivot?.quantity} />
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
          fontSize: 15,
          fontFamily: 'light',
          width: '90%'
     },
     materialDate: {
          fontSize: 10,
          textAlign: 'left',
          fontFamily: 'light'
     },
     quantityContainer: {
          alignSelf: 'center',
          marginEnd: 15
     },
})