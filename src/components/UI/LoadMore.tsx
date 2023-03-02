import React from 'react'
import Colors from '../../utils/Colors'
import { StyleSheet } from 'react-native'
import TouchableOpacity from './TouchableOpacity'
import MyText from './MyText'

const LoadMore = ({ loadMore }: { loadMore: () => {} }) => {
     return (
          <TouchableOpacity
               onPress={loadMore}
               style={styles.watchMore}>
               <MyText style={styles.watchMoreText}>loadMore</MyText>
          </TouchableOpacity>
     )
}

const styles = StyleSheet.create({
     watchMore: {
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-end',
          padding: 2,
          borderRadius: 8,
     },
     watchMoreText: {
          fontFamily: 'light',
          fontSize: 12,
          color: Colors.primary,
     },
})

export default LoadMore;