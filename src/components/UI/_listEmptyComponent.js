import React from 'react'
import Colors from '../../utils/Colors'
import {
     View,
     StyleSheet,
     Image
} from 'react-native'
import MyText from './MyText'

export const _listEmptyComponent = ({ }) => {
     return (
          <View style={styles.emptyContainer}>
               <Image source={require('../../../assets/images/no_data.gif')} />
               <MyText style={styles.emptyText}>noData</MyText>
          </View>
     )
}

const styles = StyleSheet.create({
     emptyContainer: {
          flex: 1,
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
     },
     emptyText: {
          fontFamily: 'bold',
          color: Colors.primary,
          fontSize: 18
     },
})