import React, { useState, useEffect } from 'react'
import {
     StyleSheet,
     View,
     FlatList,
     ActivityIndicator,
     KeyboardAvoidingView,
     Platform
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
 * @param {materials} param0 The materials to show.
 * This will be shown if the previous screen is 'project' otherwise will fetch materials from API depends on 'task.id'
 * 
 * @param {screen} param1 What is the previous screen.
 * If TaskDetailsModal should be 'task' otherwise 'project'
 * 
 * @param {task} param2 Task will not be null if the previous screen was 'TaskDetailsModal' otherwise null
*/
export const MaterialsScreen = ({ route: { params: { materials, screen, task } } }) => {
     const dispatch = useDispatch()

     const [title, setTitle] = useState('');
     const [quantity, setQuantity] = useState('');

     const loadings = useSelector((state) => state?.globalReducer?.loadings)
     const taskMaterials = useSelector((state) => state?.tasksReducer?.taskMaterials)

     useEffect(() => {
          if (screen === 'task') {
               dispatch(fetchTaskMaterials(task.id))
          }
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
          if (title !== '' && quantity !== '') {
               dispatch(addMaterials({ title, quantity }, task.id))
               setTitle('');
               setQuantity('')
          }
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

     const onRefresh = () => dispatch(fetchTaskMaterials(task.id));

     return (
          <KeyboardAvoidingView
               behavior={Platform.OS === "ios" ? "padding" : null}
               style={{ flex: 1 }}>
               <View style={styles.container}>
                    <Header showGoBackButton text={'materials'} />
                    <View style={styles.subContainer}>
                         <FlatList
                              keyExtractor={(item, index) => '#' + index}
                              contentContainerStyle={{ paddingBottom: 60 }}
                              style={{ flex: 1 }}
                              data={screen === 'task' ? taskMaterials : materials}
                              onRefresh={screen === 'task' ? onRefresh : null}
                              refreshing={false}
                              ListHeaderComponent={_listHeaderComponent}
                              renderItem={({ item, index }) => <MaterialComponent material={item} key={index} />}
                         />
                    </View>
                    {screen === 'task' ?
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
                         </View> : null
                    }
               </View>
          </KeyboardAvoidingView>
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
          color: Colors.primary
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