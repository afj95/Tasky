import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'
import {
    ActivityIndicator,
    CheckBox,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import MyText from '../../../components/UI/MyText';
import { deleteTask, checkTask as checkTaskAction, resetTasksState, unCheckTask } from '../../../redux/reducers/Tasks/tasks-actions';
import Colors from '../../../utils/Colors';

export const TaskComponent = ({ project, index, task, onPress }) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state?.authReducer?.user)
    const deleteTaskError = useSelector((state) => state?.tasksReducer?.deleteTaskError)
    const checkTaskError = useSelector((state) => state?.tasksReducer?.checkTaskError)
    const fetchingProjectsLoading = useSelector((state) => state?.projectsReducer?.fetchingProjectsLoading)
    
    const [checked, setChecked] = useState(false);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        if(deleteTaskError) {
            showMessage({
                message: t('app.errorHappened'),
                type: 'danger',
                duration: 1500,
            })
        } else if(checkTaskError) {
            showMessage({
                message: t('app.errorHappened'),
                type: 'danger',
                duration: 1500,
            })
        }
        dispatch(resetTasksState())
    }, [fetchingProjectsLoading])

    const deleteTaskPressed = async() => {
        setDeleted(true)
        await dispatch(deleteTask(task._id, project._id))
        setDeleted(false)
    }

    const checkTask = async () => {
        setChecked(true)
        if(!task?.checked) {
            await dispatch(checkTaskAction(task._id, project._id))
        } else {
            await dispatch(unCheckTask(task._id, project._id))
        }
        setChecked(false)
    }

    return (
        <TouchableOpacity
            disabled={!onPress}
            style={styles.taskContainer(index, project?.tasks?.length, task?.checked)}
            activeOpacity={0.6}
            onPress={onPress}>
            {/* onPress={() => openTaskInformationModal(task)} */}
            <MyText style={styles.taskText(task?.checked)} text={`${task?.task}`} />
            <View style={styles.checkContainer}>
                {/* delete task - only if admin */}
                {
                    deleted ? <ActivityIndicator size={'small'} color={Colors.black} />
                    :
                    user?.role === 'admin' && project?.status !== 'finished' && !project?.deleted ?
                        <Ionicons name={'trash-bin'} size={20} color={Colors.red} onPress={deleteTaskPressed} />
                    : <View />
                }
                {checked ? <ActivityIndicator size={'small'} color={Colors.black} /> :
                    project?.status === 'finished' || project?.deleted ? null :
                    <CheckBox
                        value={task?.checked}
                        onValueChange={checkTask}
                        tintColors={{ true: Colors.black, false: Colors.white }}
                        style={styles.checkbox}
                    />
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    taskContainer: (index, length, checked) => ({
        backgroundColor: checked ? '#ddd' : Colors.white,
        borderRadius: 4,
        paddingHorizontal: 5,
        fontSize: 13,
        width: '100%',
        height: 35,
        borderBottomWidth: index !== length - 1 ? 0.5 : 0,
        borderColor: '#ccc',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }),
    taskText: (checked) => ({
        textDecorationLine: checked ? 'line-through' : 'none'
    }),
    checkContainer: {
        width: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    checkbox: {
        alignSelf: "center",
    },
})