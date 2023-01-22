import React, { useRef, useState, useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native';
import MyText from '../../../components/UI/MyText';
import Colors from '../../../utils/Colors';
import Modal from 'react-native-modal';
import { Fontisto } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import moment from 'moment';
import TouchableOpacity from '../../../components/UI/TouchableOpacity';
import { styles } from './TaskDetailsModalStyles';
import { useDispatch, useSelector } from 'react-redux';
import { clearTask, editTask, fetchTask } from '../../../redux/reducers/Tasks/tasks-actions';

export const TaskDetailsModal = ({ task, visible, closeModal, checkLoading, checkTask, project }) => {
    const dispatch = useDispatch()
    const _ref = useRef(null)

    const loadings = useSelector((state) => state?.globalReducer?.loadings)
    const errors = useSelector((state) => state?.globalReducer?.errors)

    const currentTask = useSelector((state) => state?.tasksReducer?.currentTask)

    const [employeesQuantity, setEmployeesQuantity] = useState('');
    const [workProgress, setWorkProgress] = useState('');

    useEffect(() => {
        if (visible) {
            dispatch(fetchTask(task.id))
        }
        return () => clearTask()
    }, [visible])

    // useEffect(() => {
    //     // TODO:  Handle error
    //     if (visible && errors.edit_task) { }
    // }, [loadings?.edit_task])

    const inputTheme = {
        colors: {
            text: Colors.primary,
            error: '#B22323',
            primary: '#595959'
        },
        roundness: 8
    }

    const onSubmitPressed = () => {
        if (employeesQuantity && workProgress) {
            dispatch(editTask(task, {
                employees_quantity: employeesQuantity,
                work_progress: workProgress
            }))
        }

        closeModal()
    }

    return (
        <Modal
            swipeThreshold={10}
            isVisible={visible}
            style={styles.modal}
            onBackButtonPress={closeModal}
            animationIn={'slideInUp'}
            animationInTiming={500}
            animationOutTiming={500}
            useNativeDriver>
            <View style={styles.contentView(loadings?.edit_task || !currentTask)}>
                <View style={styles.header}>
                    <MyText style={{ marginEnd: 5, color: Colors.primary, fontFamily: 'light' }} text={task?.id} />
                    <MyText style={styles.headerText}>taskDetails</MyText>
                    <ActivityIndicator
                        animating={loadings?.edit_task === true}
                        hidesWhenStopped
                        color={Colors.primary}
                        colors={[Colors.primary, Colors.secondary]}
                    />
                </View>
                {/* Content */}
                {loadings?.edit_task || !currentTask ? null :
                    <>
                        <View style={styles.priorityContainer}>
                            <View style={styles.prioritySquare(currentTask)}>
                                <View style={styles.priorityCircle(currentTask)} />
                                <MyText style={styles.priorityText}>{currentTask?.priority}</MyText>
                            </View>
                            <MyText style={styles.dateText} text={moment(currentTask?.date).fromNow()} />
                        </View>
                        <View style={styles.titleContainer}>
                            <MyText style={styles.taskText(currentTask?.checked)} numberOfLines={3} text={`${currentTask?.title}`} />
                            <View style={styles.checkContainer}>
                                {checkLoading ? <ActivityIndicator size={'small'} color={Colors.primary} /> :
                                    project?.status === 'finished' || project?.deleted_at ? null :
                                        <Fontisto
                                            name={currentTask?.checked ? 'checkbox-active' : 'checkbox-passive'}
                                            size={20}
                                            onPress={() => { checkTask(); closeModal(); }}
                                            color={Colors.primary}
                                        />
                                }
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <MyText>employeesQuantity</MyText>
                            <TextInput
                                style={styles.input}
                                mode={'flat'}
                                fontFamily={'light'}
                                keyboardType={"decimal-pad"}
                                theme={inputTheme}
                                defaultValue={currentTask?.employees_quantity + ''}
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
                                    defaultValue={currentTask?.work_progress + ''}
                                    onChangeText={text => setWorkProgress(text)}
                                    disabled={currentTask?.checked}
                                />
                            </View>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity onPress={onSubmitPressed} style={styles.submitButton}>
                                <MyText style={styles.submitText}>updateTask</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
                                <MyText style={styles.cancelText}>cancel</MyText>
                            </TouchableOpacity>
                        </View>
                    </>
                }
            </View>
        </Modal>
    )
}


