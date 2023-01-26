import React from 'react'
import {
     StyleSheet,
     View,
     FlatList,
     ActivityIndicator
} from 'react-native'
import { useSelector } from 'react-redux'
import MyText from '../../components/UI/MyText'
import Colors from '../../utils/Colors'
import { MaterialComponent } from '../ProjectDetails/components'
import { Header } from './components'

/**
 * TODO: Add floating input at bottom of screen
 * to add new amterial to the task
 */

export const MaterialsScreen = ({ route: { params: { materials } } }) => {

     const loadings = useSelector((state) => state?.globalReducer?.loadings)

     const _listHeaderComponent = () => {
          return (
               <View style={styles.materialsLabelContainer}>
                    <MyText style={styles.label}>materials</MyText>
                    <ActivityIndicator
                         animating={loadings?.project === true}
                         hidesWhenStopped
                         color={Colors.primary}
                    />
                    <MyText style={styles.label}>quantity</MyText>
               </View>
          )
     }

     return (
          <View style={styles.container}>
               <Header showGoBackButton text={'materials'} />
               <View style={styles.subContainer}>
                    <FlatList
                         keyExtractor={(item, index) => '#' + index}
                         contentContainerStyle={{ paddingBottom: 20 }}
                         style={{ flex: 1 }}
                         data={materials}
                         ListHeaderComponent={_listHeaderComponent}
                         renderItem={({ item, index }) => <MaterialComponent material={item} key={index} />}
                    />
               </View>
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
     },
     subContainer: {
          flex: 1,
          marginHorizontal: 10,
          marginTop: 5
     },
     materialsLabelContainer: {
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row'
     },
     label: {
          fontFamily: 'bold',
          color: Colors.text
     },
})