import React from 'react'
import {
     StyleSheet,
     View
} from 'react-native'
import MyText from '../../../components/UI/MyText'
import Colors from '../../../utils/Colors'

export const EmptyChart = () => {
     return (
          <View style={styles.container}>
               <MyText style={styles.emptyText}>noData</MyText>
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          borderWidth: 0.5,
          borderColor: Colors.primary,
          borderRadius: 10,
          height: 200,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
     },
     emptyText: {
          fontFamily: 'bold',
          fontSize: 18,
          color: Colors.primary
     }
})