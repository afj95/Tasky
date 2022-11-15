import { Fontisto, Ionicons } from '@expo/vector-icons';
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
import { fetchingOneProject } from '../../../redux/reducers/Projects/projects-actions';
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
        if (deleteTaskError) {
            showMessage({
                message: t('app.errorHappened'),
                type: 'danger',
                duration: 1500,
            })
        } else if (checkTaskError) {
            showMessage({
                message: t('app.errorHappened'),
                type: 'danger',
                duration: 1500,
            })
        }
        dispatch(resetTasksState())
    }, [fetchingProjectsLoading])

    const deleteTaskPressed = async () => {
        setDeleted(true)
        await dispatch(deleteTask(task._id, project._id))
        setDeleted(false)
    }

    const checkTask = async () => {
        setChecked(true)
        if (task?.checked) {
            await dispatch(unCheckTask(task._id))
        } else {
            await dispatch(checkTaskAction(task._id))
        }
        await dispatch(fetchingOneProject(project._id))
        setChecked(false)
    }

    return (
        <TouchableOpacity
            disabled={!onPress}
            style={styles.taskContainer(index, project?.tasks?.length, task?.checked)}
            activeOpacity={0.6}
            onPress={onPress}>
            {/* onPress={() => openTaskInformationModal(task)} */}
            <MyText style={styles.taskText(task?.checked)} numberOfLines={3} text={`${task?.task}`} />
            <View style={styles.checkContainer}>
                {/* delete task - only if admin */}
                {
                    deleted ? <ActivityIndicator size={'small'} color={task.checked ? Colors.secondary : Colors.primary} />
                        :
                        user?.role === 'admin' && project?.status !== 'finished' && !project?.deleted ?
                            <Ionicons name={'trash-bin'} size={20} color={Colors.red} onPress={deleteTaskPressed} />
                            : <View />
                }
                {checked ? <ActivityIndicator size={'small'} color={task.checked ? Colors.appWhite : Colors.primary} /> :
                    project?.status === 'finished' || project?.deleted ? null :
                        <Fontisto
                            name={task.checked ? 'checkbox-active' : 'checkbox-passive'}
                            size={20}
                            onPress={checkTask}
                            color={task.checked ? Colors.appWhite : Colors.primary}
                        />
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    taskContainer: (index, length, checked) => ({
        backgroundColor: checked ? Colors.secondary : Colors.lightBlue,
        alignItems: 'center',
        borderRadius: 4,
        paddingEnd: 20,
        paddingStart: 10,
        fontSize: 13,
        width: '100%',
        // height: 35,
        paddingVertical: 5,
        borderBottomWidth: index !== length - 1 ? 0.5 : 0,
        marginVertical: 2,
        borderColor: '#ccc',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }),
    taskText: (checked) => ({
        textDecorationLine: checked ? 'line-through' : 'none',
        textDecorationColor: Colors.text,
        color: checked ? Colors.text : Colors.primary,
        textDecorationStyle: 'solid',
        width: '80%',
        alignSelf: 'flex-start',
        fontSize: 15
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