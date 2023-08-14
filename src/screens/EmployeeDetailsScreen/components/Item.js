import React from 'react'
import Colors from '../../../utils/Colors'
import {
     View,
     StyleSheet,
     Image
} from 'react-native'
import MyText from '../../../components/UI/MyText'
import moment from 'moment'

export const Item = ({ label, text: data, date, image }) => {
     return (
          <View style={styles.itemContainer}>
               <MyText style={styles.label}>{label}</MyText>
               {data ?
                    date && !image ?
                         <MyText selectable style={styles.data} text={moment(data).format('yyyy/MM/DD')} />
                         :
                         image && !date ?
                              <Image source={{ uri: data }} style={styles.image} />
                              :
                              <MyText selectable style={styles.data} text={data ? data : '-'} />
                    :
                    <MyText text={'-'} />
               }
          </View>
     )
}

const styles = StyleSheet.create({
     itemContainer: {
          backgroundColor: Colors.white,
          borderBottomWidth: 0.7,
          borderBottomColor: '#bcbcbc',
     },
     label: { fontFamily: 'bold' },
     data: {
          marginStart: 10,
          fontFamily: 'light',
     },
     image: {
          width: 50,
          height: 50,
          borderRadius: 4,
          resizeMode: 'contain',
          marginVertical: 5,
          marginStart: 10
     },
})