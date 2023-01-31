import React, { useState, useEffect } from 'react'
import {
     StyleSheet,
     View,
     FlatList,
     ActivityIndicator
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import MyText from '../../components/UI/MyText'
import Colors from '../../utils/Colors'
import { MaterialComponent } from '../ProjectDetails/components'
import { Header } from './components'
import { TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'
import { addMaterials, fetchTaskMaterials } from '../../redux/reducers/Tasks/tasks-actions'

/**
 * TODO: Add floating input at bottom of screen
 * to add new amterial to the task
 * TODO: Fetch task materials on first load screen
 */

export const MaterialsScreen = ({ route: { params: { materials } } }) => {
     const dispatch = useDispatch()

     const task_id = materials[0].task_id;

     const [title, setTitle] = useState('');
     const [quantity, setQuantity] = useState('');

     const loadings = useSelector((state) => state?.globalReducer?.loadings)
     const taskMaterials = useSelector((state) => state?.tasksReducer?.taskMaterials)

     useEffect(() => {
          dispatch(fetchTaskMaterials(task_id))
     }, [])


     const inputTheme = {
          colors: {
               text: Colors.primary,
               error: '#B22323',
               primary: '#595959'
          },
          roundness: 8
     }

     const addNewMaterials = () => {
          dispatch(addMaterials({ title, quantity }, task_id))
          setTitle('');
          setQuantity('')
     }

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

     const onRefresh = () => dispatch(fetchTaskMaterials(task_id));

     return (
          <View style={styles.container}>
               <Header showGoBackButton text={'materials'} />
               <View style={styles.subContainer}>
                    <FlatList
                         keyExtractor={(item, index) => '#' + index}
                         contentContainerStyle={{ paddingBottom: 60 }}
                         style={{ flex: 1 }}
                         data={taskMaterials}
                         onRefresh={onRefresh}
                         refreshing={false}
                         ListHeaderComponent={_listHeaderComponent}
                         renderItem={({ item, index }) => <MaterialComponent material={item} key={index} />}
                    />
               </View>
               <View style={styles.floatingContainer}>
                    <View style={styles.dynamicInputsContainer}>
                         <TextInput
                              style={[styles.input, { width: '60%', marginStart: 0 }]}
                              mode={'flat'}
                              fontFamily={'light'}
                              theme={inputTheme}
                              value={title}
                              onChangeText={setTitle}
                         />
                         <TextInput
                              style={[styles.input, { width: '25%', marginStart: 0 }]}
                              mode={'flat'}
                              fontFamily={'light'}
                              keyboardType={'decimal-pad'}
                              theme={inputTheme}
                              value={quantity}
                              onChangeText={setQuantity}
                         />
                         {loadings?.add_material || loadings?.fetch_materials ?
                              <ActivityIndicator size={25} color={Colors.primary} />
                              :
                              <AntDesign
                                   name={'pluscircleo'}
                                   size={25}
                                   color={Colors.primary}
                                   onPress={addNewMaterials}
                              />
                         }
                    </View>
               </View>
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: Colors.appWhite
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
     dynamicFieldsComponent: {
          paddingTop: 5,
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginHorizontal: 5
     },
     floatingContainer: {
          position: 'absolute',
          bottom: 0,
          height: 50,
          width: '100%',
          backgroundColor: Colors.white,
          paddingHorizontal: 10,
          borderTopWidth: 0.8,
          borderTopColor: Colors.secondary
     },
     dynamicInputsContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
     },
     input: {
          width: 85,
          height: 40,
          marginVertical: 5,
          justifyContent: 'center',
          backgroundColor: Colors.appWhite,
          fontFamily: 'bold',
          borderWidth: 0.5,
          borderColor: Colors.primary,
          borderRadius: 8,
          marginStart: 6,
          overflow: 'hidden'
     },
})