import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { t } from '../../../i18n';
import { showMessage } from 'react-native-flash-message';
import { addNewTask, resetTasksState } from '../../../redux/reducers/Tasks/tasks-actions';

export const AddTask = ({ project, _scrollRef }) => {
    const dispatch = useDispatch();

    let textInputRef = null;
    
    const [currentTask, setTask] = useState('');
    const [autoFocus, setAutoFocus] = useState(false);

    const addTaskLoading = useSelector(state => state.tasksReducer.addTaskLoading);
    const addTaskError = useSelector(state => state.tasksReducer.addTaskError);
    const task = useSelector(state => state.tasksReducer.task);

    useEffect(() => {
        if(addTaskError == 500) {
            showMessage({
                message: t('app.errorHappened'),
                type: 'danger',
                duration: 1500
            })
        } else if(addTaskError == 404) {
            showMessage({
                message: t('app.errorHappened'),
                description: t('app.errorCode') + ' ' + addTaskError,
                type: 'danger',
                duration: 1500
            })
        } else if(addTaskError == 400) {
            showMessage({
                message: t('app.wrongData'),
                type: 'danger',
                duration: 1500
            })
        } else {
            setTask('')
            setAutoFocus(true)
            // _scrollRef?.current?.scrollToEnd({ animated: true });
        }
        dispatch(resetTasksState())
    }, [addTaskLoading])

    const onAddButtonPressed = () => {
        if(currentTask !== '') {
            setAutoFocus(false)
            dispatch(addNewTask(project._id, currentTask))
            setTask('')
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.textInputContainer}>
                <TextInput
                    ref={ref => textInputRef = ref}
                    style={styles.textInput}
                    value={currentTask}
                    onChangeText={setTask}
                    autoFocus={autoFocus}
                    placeholder={t('app.AddNewTask')}
                    blurOnSubmit={false}
                    onSubmitEditing={onAddButtonPressed}
                    editable={!addTaskLoading}
                />
                <View style={styles.addStuff} onPress={onAddButtonPressed}>
                    {addTaskLoading ?
                        <ActivityIndicator size={'small'} color={'white'} />
                    :
                        <Ionicons name={'add'} size={30} color={'#fff'} onPress={onAddButtonPressed} />
                    }
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    textInputContainer: {
        width: '100%',
        backgroundColor: '#eee',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 3,
        paddingHorizontal: 2,
        alignItems: 'center'
    },
    textInput: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '90%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff'
    },
    addStuff: {
        width: 32,
        height: 32,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4d4dff'
    },
})