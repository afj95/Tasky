import React, { useState, useEffect } from 'react'
import { Fontisto } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import MyText from '../../../components/UI/MyText';
import { checkTask as checkTaskAction, unCheckTask } from '../../../redux/reducers/Tasks/tasks-actions';
import Colors from '../../../utils/Colors';
import moment from 'moment';
import '../../../utils/ar-sa-mine';
import 'moment/locale/en-gb';
import { showMessage } from '../../../tools';
import { clearErrors } from '../../../redux/reducers/Global/global-actions';
import TouchableOpacity from '../../../components/UI/TouchableOpacity';
import { TaskDetailsModal } from './TaskDetailsModal';
import { fetchOneProject } from '../../../redux/reducers/Projects/projects-actions';
import { I18nManager, StyleSheet, View } from 'react-native';
import Indicator from '../../../components/UI/Indicator';

export const TaskComponent = ({ task, project_id, onPress }) => {
    const dispatch = useDispatch();

    const errors = useSelector((state) => state?.globalReducer?.errors)
    // const user = useSelector((state) => state?.authReducer?.user)

    const [checkLoading, setCheckLoading] = useState(false);
    // const [deleteLoading, setDeleteLoading] = useState(false);
    const [detailsModal, setDetailsModal] = useState(false);

    useEffect(() => {
        function changeMomentLocale() {
            try {
                moment.locale(I18nManager.isRTL ? 'ar-sa' : 'en');
            } catch (error) {
                alert('error while changing moment locale ' + error)
            }
        }
        changeMomentLocale()
    }, [])

    useEffect(() => {
        if (errors?.project_tasks) {
            showMessage({
                message: errors?.project_tasks + '',
                type: 'danger'
            })
            dispatch(clearErrors())
        }
    }, [errors?.project_tasks])

    // ADMIN
    // const deleteTaskPressed = async () => {
    //     setDeleteLoading(true)
    //     await dispatch(deleteTask(task._id, project?.id))
    //     setDeleteLoading(false)
    // }

    const checkTask = async () => {
        // TODO: Change to local then send it to API
        setCheckLoading(true)
        if (task?.checked) {
            await dispatch(unCheckTask(task.id))
        } else {
            await dispatch(checkTaskAction(task?.id))
        }
        await dispatch(fetchOneProject(project_id, true))
        setCheckLoading(false)
    }

    const openTaskDetailsModal = () => setDetailsModal(true);
    const closeDetailsModal = () => setDetailsModal(false);

    return (
        <TouchableOpacity
            style={styles.taskContainer(task?.priority)}
            onPress={onPress ? openTaskDetailsModal : null}>
            <View>
                <MyText style={styles.taskText(task?.checked)} numberOfLines={3} text={`${task?.title}`} />
                <MyText style={styles.taskDate} text={moment(task?.date).fromNow()} />
            </View>
            <View style={styles.checkContainer}>
                {/* delete task - only if admin */}
                {/* {deleteLoading ? <ActivityIndicator size={'small'} color={Colors.primary} />
                    :
                    user?.role === 'admin' && project?.status !== 'finished' && !project?.deleted ?
                        <Ionicons name={'trash-bin'} size={20} color={Colors.red} onPress={deleteTaskPressed} />
                        : <View />
                } */}
                {checkLoading ? <Indicator margin={0} animating={checkLoading} /> :
                    <Fontisto
                        name={task.checked ? 'checkbox-active' : 'checkbox-passive'}
                        size={20}
                        onPress={checkTask}
                        color={Colors.text}
                    />
                }
            </View>
            <TaskDetailsModal
                task={task}
                visible={detailsModal}
                closeModal={closeDetailsModal}
                checkLoading={checkLoading}
                checkTask={checkTask}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    taskContainer: priority => ({
        backgroundColor: Colors.white,
        alignItems: 'center',
        paddingEnd: 20,
        paddingStart: 10,
        fontSize: 13,
        width: '100%',
        paddingVertical: 5,
        marginTop: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderStartColor: priority === 'high' ? Colors.red : priority === 'mid' ? 'yellow' : 'green',
        borderStartWidth: 5,
    }),
    taskText: (checked) => ({
        textDecorationLine: checked ? 'line-through' : 'none',
        textDecorationColor: Colors.text,
        color: checked ? Colors.primary : Colors.text,
        textDecorationStyle: 'solid',
        width: '80%',
        alignSelf: 'flex-start',
        fontSize: 15
    }),
    taskDate: {
        fontSize: 10,
        fontFamily: 'light'
    },
    checkContainer: {
        alignSelf: 'center',
        width: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    checkbox: {
        alignSelf: "center",
    },
})