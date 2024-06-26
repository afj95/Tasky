import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, View, ActivityIndicator, ScrollView } from 'react-native';
import MyText from '../../components/UI/MyText';
import Colors from '../../utils/Colors';
import { TextInput } from 'react-native-paper';
import { styles } from '../ProjectDetails/components/TaskDetailsModalStyles';
import moment from 'moment';
import { MaterialComponent } from '../ProjectDetails/components/MaterialComponent';
import { useDispatch, useSelector } from 'react-redux';
import { TaskComponent } from '../ProjectDetails/components';
import TouchableOpacity from '../../components/UI/TouchableOpacity';
import { editTask } from '../../redux/reducers/Tasks/tasks-actions';
import { navigate } from '../../navigation/RootNavigation';
import LoadMore from '../../components/UI/LoadMore';
import { AntDesign } from '@expo/vector-icons';
import { MainHeader } from '../../components/UI/MainHeader';

export const EditTaskScreen = () => {
     const dispatch = useDispatch();

     const loadings = useSelector((state) => state?.globalReducer?.loadings)
     const errors = useSelector((state) => state?.globalReducer?.errors)
     const currentTask = useSelector((state) => state?.tasksReducer?.currentTask)

     const [employeesQuantity, setEmployeesQuantity] = useState(currentTask?.current_employees_quantity);
     const [workProgress, setWorkProgress] = useState(currentTask?.work_progress || '0');

     const inputTheme = {
          colors: {
               text: Colors.primary,
               error: '#B22323',
               primary: '#595959'
          },
          roundness: 8
     }

     const editTaskButton = () => {
          if (employeesQuantity !== '0' || workProgress !== '0') {
               let current_employees_quantity = Number(employeesQuantity), work_progress = Number(workProgress);
               dispatch(editTask(currentTask, {
                    current_employees_quantity,
                    work_progress
               }))
          }
     }

     const loadMore = () => navigate('MaterialsScreen', { materials: currentTask?.materials, screen: 'task', task: currentTask })

     return (
          <KeyboardAvoidingView
               behavior={Platform.OS === 'ios' ? 'height' : null}
               style={styles.editTaskContainer}>
               <MainHeader showGoBack title={'updateTask'} />
               <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                    <View style={{ paddingHorizontal: 10 }}>
                         <View style={styles.priorityContainer}>
                              <View style={styles.prioritySquare(currentTask)}>
                                   <View style={styles.priorityCircle(currentTask)} />
                                   <MyText style={styles.priorityText}>{currentTask?.priority}</MyText>
                              </View>
                              <MyText style={styles.dateText} text={moment(currentTask?.date).fromNow()} />
                         </View>
                         <TaskComponent
                              task={currentTask}
                              project_id={currentTask?.project_id}
                         />
                         {currentTask?.materials?.length ?
                              <View style={styles.materialsContainer}>
                                   <View style={styles.materialsLabelContainer}>
                                        <MyText style={styles.label}>materials</MyText>
                                        <ActivityIndicator
                                             animating={loadings?.project === true}
                                             hidesWhenStopped
                                             size={15}
                                             color={Colors.primary}
                                        />
                                        <MyText style={styles.label}>quantity</MyText>
                                   </View>
                                   {currentTask?.materials?.length > 5 ?
                                        currentTask?.materials?.slice(0, 5).map((item, index) => <MaterialComponent material={item} key={index} />)
                                        :
                                        currentTask?.materials?.map((item, index) => <MaterialComponent material={item} key={index} />)
                                   }
                                   {currentTask?.materials?.length ? <LoadMore loadMore={loadMore} /> : null}
                              </View>
                              :
                              <TouchableOpacity onPress={loadMore} style={styles.addNewMaterialContainer}>
                                   <AntDesign name={'pluscircleo'} size={20} color={Colors.primary} />
                                   <MyText>addNewMaterial</MyText>
                              </TouchableOpacity>
                         }
                         <View style={styles.inputContainer}>
                              <MyText>employeesQuantityAdmin</MyText>
                              <MyText text={currentTask?.required_employees_quantity + ''} />
                         </View>
                         <View style={styles.inputContainer}>
                              <MyText>employeesQuantity</MyText>
                              <TextInput
                                   style={styles.input}
                                   mode={'flat'}
                                   fontFamily={'light'}
                                   keyboardType={"decimal-pad"}
                                   theme={inputTheme}
                                   defaultValue={employeesQuantity + ''}
                                   value={employeesQuantity + ''}
                                   onChangeText={text => setEmployeesQuantity(text)}
                                   disabled={currentTask?.checked}
                              />
                         </View>
                         <View style={styles.inputContainer}>
                              <MyText>workProgress</MyText>
                              <View style={styles.percentageContainer}>
                                   <MyText style={styles.percentageText} text={'%'} />
                                   <TextInput
                                        style={styles.input}
                                        mode={'flat'}
                                        fontFamily={'light'}
                                        keyboardType={"decimal-pad"}
                                        theme={inputTheme}
                                        defaultValue={workProgress + ''}
                                        onChangeText={text => setWorkProgress(text)}
                                        disabled={currentTask?.checked}
                                   />
                              </View>
                         </View>
                         <View style={styles.buttonsContainer}>
                              <TouchableOpacity
                                   onPress={editTaskButton}
                                   style={styles.submitButton}
                                   disabled={loadings?.edit_task}>
                                   {loadings?.edit_task ? <ActivityIndicator color={Colors.appWhite} size={'small'} /> :
                                        <MyText style={styles.submitText}>updateTask</MyText>}
                              </TouchableOpacity>
                         </View>
                    </View>
               </ScrollView>
          </KeyboardAvoidingView>
     )
}