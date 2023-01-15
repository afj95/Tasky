import React, { useRef, useState, useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native';
import MyText from '../../../components/UI/MyText';
import Colors from '../../../utils/Colors';
import Modal from 'react-native-modal';
import { Fontisto } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import moment from 'moment';
import { TouchableOpacity } from '../../../components/UI/TouchableOpacity';
import { styles } from './TaskDetailsModalStyles';
import { useDispatch, useSelector } from 'react-redux';
import { editTask } from '../../../redux/reducers/Tasks/tasks-actions';

export const TaskDetailsModal = ({ task, visible, closeModal, checkLoading, checkTask, project }) => {
    const dispatch = useDispatch()
    const _ref = useRef(null)

    const loadings = useSelector((state) => state?.globalReducer?.loadings)
    const errors = useSelector((state) => state?.globalReducer?.errors)

    const [employeesQuantity, setEmployeesQuantity] = useState('0');
    const [workProgress, setWorkProgress] = useState('0');

    useEffect(() => {
        if (visible && errors.edit_task) { }
    }, [loadings?.edit_task])

    const inputTheme = {
        colors: {
            text: Colors.primary,
            error: '#B22323',
            primary: '#595959'
        },
        roundness: 5
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
            <View style={styles.contentView}>
                <View style={styles.header}>
                    <View />
                    <MyText style={styles.headerText}>taskDetails</MyText>
                    <ActivityIndicator
                        animating={loadings?.edit_task === true}
                        hidesWhenStopped
                        color={Colors.primary}
                        colors={[Colors.primary, Colors.secondary]}
                    />
                </View>
                {/* Content */}
                <View style={styles.priorityContainer}>
                    <View style={styles.prioritySquare(task)}>
                        <View style={styles.priorityCircle(task)} />
                        <MyText style={styles.priorityText}>{task?.priority}</MyText>
                    </View>
                    <MyText style={styles.dateText} text={moment(task?.date).fromNow()} />
                </View>
                <View style={styles.titleContainer}>
                    <MyText style={styles.taskText(task?.checked)} numberOfLines={3} text={`${task?.title}`} />
                    <View style={styles.checkContainer}>
                        {checkLoading ? <ActivityIndicator size={'small'} color={Colors.primary} /> :
                            project?.status === 'finished' || project?.deleted_at ? null :
                                <Fontisto
                                    name={task.checked ? 'checkbox-active' : 'checkbox-passive'}
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
                        defaultValue={'0'}
                        placeholderTextColor={Colors.secondary}
                        mode={'flat'}
                        fontFamily={'light'}
                        keyboardType={"decimal-pad"}
                        theme={inputTheme}
                        onChangeText={setEmployeesQuantity}
                        value={employeesQuantity}
                        disabled={task?.checked}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <MyText>workProgress</MyText>
                    <TextInput
                        style={styles.input}
                        defaultValue={'0'}
                        placeholderTextColor={Colors.secondary}
                        mode={'flat'}
                        fontFamily={'light'}
                        keyboardType={"decimal-pad"}
                        theme={inputTheme}
                        onChangeText={setWorkProgress}
                        value={workProgress}
                        disabled={task?.checked}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={onSubmitPressed} style={styles.submitButton}>
                        <MyText style={styles.submitText}>updateTask</MyText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
                        <MyText style={styles.cancelText}>cancel</MyText>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}


