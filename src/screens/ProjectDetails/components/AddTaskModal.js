import React, { useState, useEffect } from 'react';
import {
     StyleSheet,
     View,
     TextInput,
     KeyboardAvoidingView,
     Platform,
     ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { t } from '../../../i18n';
import Colors from '../../../utils/Colors';
import Modal from 'react-native-modal';
import MyText from '../../../components/UI/MyText';
import TouchableOpacity from '../../../components/UI/TouchableOpacity';
import { addNewTask } from '../../../redux/reducers/Tasks/tasks-actions';
import ErrorText from '../../../components/UI/ErrorText';
import { fetchOneProject } from '../../../redux/reducers/Projects/projects-actions';
import { DismissKeyboardView } from '../../../components/UI/DismissKeyboardHOC';

const alphaColors = {
     high: 'rgba(255, 0, 0, 0.5)',
     mid: 'rgba(255, 255, 0, 0.5)',
     low: 'rgba(0, 128, 0, 0.5)'
}
export const AddTaskModal = ({ visible, closeModal, project }) => {
     const dispatch = useDispatch();

     const [currentTask, setTask] = useState('');
     const [numberOfEmployees, setNumberOfEmployees] = useState('0');
     const [showPriorities, setShowPriorities] = useState(false);
     const [priority, setPriority] = useState('');
     const [errorText, setErrorText] = useState('');

     const errors = useSelector((state) => state?.globalReducer?.errors)
     const loadings = useSelector((state) => state?.globalReducer?.loadings)

     const taskAdded = useSelector((state) => state?.tasksReducer?.taskAdded)

     useEffect(() => {
          setErrorText('');
     }, [])

     useEffect(() => {
          if (errors?.add_task) {
               setErrorText('addTaskError');
          } else if (taskAdded) {
               setTask('');
               setNumberOfEmployees('0');
               setPriority('');
          }
     }, [loadings?.add_task])

     const setPriorityFun = priority => {
          setPriority(priority);
          setShowPriorities(false);
     }

     const onAddButtonPressed = () => {
          if (currentTask !== '' || numberOfEmployees !== '0' || priority !== '') {
               dispatch(addNewTask(project.id, {
                    title: currentTask,
                    priority,
                    required_employees_quantity: numberOfEmployees
               }))
               setTask('');
               setNumberOfEmployees('0');
               setPriority('');
               setErrorText('')
          } else {
               setErrorText('pleaseFillAllRequired')
          }
     }

     const closeThisModal = () => {
          setErrorText('');
          closeModal();
          dispatch(fetchOneProject(project.id, true));
     }

     return (
          <Modal
               swipeThreshold={10}
               isVisible={visible}
               style={styles.modal}
               onBackButtonPress={closeThisModal}
               animationIn={'slideInDown'}
               animationInTiming={500}
               useNativeDriver>
               <DismissKeyboardView style={styles.centeredView}>
                    <View style={styles.modalView}>
                         <AntDesign
                              name={'close'}
                              size={20}
                              color={Colors.primary}
                              style={styles.closeButton}
                              onPress={closeThisModal}
                         />
                         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                              <View style={styles.textInputContainer}>
                                   <View style={styles.textContainer}>
                                        <MyText style={styles.label}>taskTitle</MyText><MyText style={{ color: '#B22323' }} text={' * '} />
                                   </View>
                                   <TextInput
                                        style={styles.textInput}
                                        value={currentTask}
                                        onChangeText={setTask}
                                        blurOnSubmit={false}
                                        onSubmitEditing={onAddButtonPressed}
                                        editable={!loadings?.add_task}
                                   />

                                   <View style={styles.textContainer}>
                                        <MyText style={styles.label}>employeesQuantity</MyText><MyText style={{ color: '#B22323' }} text={' * '} />
                                   </View>
                                   <TextInput
                                        style={styles.textInput}
                                        value={numberOfEmployees}
                                        onChangeText={setNumberOfEmployees}
                                        onFocus={() => setNumberOfEmployees(prevState => prevState === '0' ? '' : prevState)}
                                        blurOnSubmit={false}
                                        editable={!loadings?.add_task}
                                        keyboardType={'decimal-pad'}
                                   />

                                   <View>
                                        <TouchableOpacity onPress={() => setShowPriorities(prevState => !prevState)}>
                                             <View style={styles.textContainer}>
                                                  <MyText style={styles.label}>priority</MyText><MyText style={{ color: '#B22323' }} text={' * '} />
                                             </View>
                                             <TextInput
                                                  style={styles.textInput}
                                                  value={!priority ? '' : t(`app.${priority}`)}
                                                  blurOnSubmit={false}
                                                  keyboardType={'decimal-pad'}
                                                  editable={false}
                                                  onPressOut={() => setShowPriorities(prevState => !prevState)}
                                             />
                                        </TouchableOpacity>
                                        {showPriorities &&
                                             <View style={styles.prioritiesContainer}>
                                                  <TouchableOpacity onPress={() => setPriorityFun('high')} style={styles.priorityView}>
                                                       <MyText>high</MyText>
                                                       <Ionicons name={'flag'} color={alphaColors['high']} size={20} />
                                                  </TouchableOpacity>
                                                  <TouchableOpacity onPress={() => setPriorityFun('mid')} style={styles.priorityView}>
                                                       <MyText>mid</MyText>
                                                       <Ionicons name={'flag'} color={alphaColors['mid']} size={20} />
                                                  </TouchableOpacity>
                                                  <TouchableOpacity onPress={() => setPriorityFun('low')} style={styles.priorityView}>
                                                       <MyText>low</MyText>
                                                       <Ionicons name={'flag'} color={alphaColors['low']} size={20} />
                                                  </TouchableOpacity>
                                             </View>
                                        }
                                        <TouchableOpacity onPress={onAddButtonPressed} style={styles.submit}>
                                             {loadings?.add_task ?
                                                  <ActivityIndicator size={'small'} color={Colors.appWhite} />
                                                  :
                                                  <MyText style={styles.submitText}>addNewTask</MyText>
                                             }
                                        </TouchableOpacity>
                                        {errorText && <ErrorText error={errorText} />}
                                   </View>
                              </View>
                         </KeyboardAvoidingView>
                    </View>
               </DismissKeyboardView>
          </Modal>
     )
}

const styles = StyleSheet.create({
     modal: {
          margin: 0,
          justifyContent: 'flex-end'
     },
     centeredView: {
          flex: 1,
          justifyContent: "center",
          alignItems: 'center'
     },
     modalView: {
          width: '90%',
          paddingBottom: 40,
          backgroundColor: Colors.appWhite,
          borderRadius: 20,
          padding: 10,
     },
     closeButton: {
          padding: 10,
          alignSelf: 'flex-end',
     },
     textInputContainer: {
          width: '100%',
     },
     textContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 5,
     },
     label: {
          color: Colors.primary,
          fontFamily: 'bold',
          fontSize: 15
     },
     textInput: {
          borderRadius: 8,
          paddingHorizontal: 10,
          paddingVertical: 5,
          width: '100%',
          height: 40,
          backgroundColor: Colors.white,
          color: Colors.primary,
          fontFamily: 'bold'
     },
     prioritiesContainer: {
          borderWidth: 1,
          borderColor: Colors.secondary,
          borderRadius: 8,
          paddingHorizontal: 5,
          backgroundColor: 'white',
          position: 'absolute',
          end: 0,
          top: -80
     },
     priorityView: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 5
     },
     submit: {
          backgroundColor: Colors.primary,
          height: 40,
          width: 140,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          marginBottom: 10
     },
     submitText: {
          fontFamily: 'light',
          color: Colors.appWhite,
          fontSize: 15
     }
})