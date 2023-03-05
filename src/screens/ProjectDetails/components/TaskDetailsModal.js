import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator, ScrollView, I18nManager } from 'react-native';
import MyText from '../../../components/UI/MyText';
import Colors from '../../../utils/Colors';
import Modal from 'react-native-modal';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import moment from 'moment';
import '../../../utils/ar-sa-mine';
import { styles } from './TaskDetailsModalStyles';
import { useDispatch, useSelector } from 'react-redux';
import { clearTask, fetchTask } from '../../../redux/reducers/Tasks/tasks-actions';
import { MaterialComponent } from './MaterialComponent';
import { navigate } from '../../../navigation/RootNavigation';
import Indicator from '../../../components/UI/Indicator';
import LoadMore from '../../../components/UI/LoadMore';

export const TaskDetailsModal = ({ task, visible, closeModal, checkLoading, checkTask }) => {
    const dispatch = useDispatch()

    // const [materialsFields, setMaterialsFields] = useState([]);

    const loadings = useSelector((state) => state?.globalReducer?.loadings)

    const currentTask = useSelector((state) => state?.tasksReducer?.currentTask)
    let taskMaterials = [];
    taskMaterials = currentTask ? currentTask?.materials : [];

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

    const EditTaskButton = () => {
        navigate('EditTaskScreen')
        closeModal()
    }

    // const onExtraFieldPressed = () => {
    //     const _materialsFields = [...materialsFields];
    //     _materialsFields.push({ title: '', quantity: '' });
    //     setMaterialsFields(_materialsFields);
    // }

    // const deleteInput = (key) => {
    //     const _materialsFields = materialsFields.filter((input, index) => index != key)
    //     setMaterialsFields(_materialsFields)
    // }

    // const materialInput = (text, key) => {
    //     const _inputs = [...materialsFields];
    //     _inputs[key].title = text || "";
    //     setMaterialsFields(_inputs);
    // }

    // const materialQuantityInput = (text, key) => {
    //     const _inputs = [...materialsFields];
    //     _inputs[key].quantity = text || 0;
    //     setMaterialsFields(_inputs);
    // }

    // const addNewMaterials = () => {
    //     dispatch(addMaterials(materialsFields, task?.id))
    //     setMaterialsFields([]);
    // }

    const loadMore = () => {
        navigate('MaterialsScreen', { materials: taskMaterials, screen: 'task', task })
        closeModal();
    }

    return (
        <Modal
            swipeThreshold={10}
            isVisible={visible}
            style={styles.modal}
            onSwipeComplete={closeModal}
            onBackdropPress={closeModal}
            onBackButtonPress={closeModal}
            animationIn={'slideInUp'}
            animationInTiming={500}
            animationOutTiming={500}
            useNativeDriver>
            <View style={styles.contentView}>
                {loadings?.edit_task ? <Indicator margin={10} animating={loadings?.edit_task} /> :
                    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                        <View style={styles.header}>
                            <AntDesign onPress={closeModal} name="closecircleo" size={20} color={Colors.primary} />
                            <MyText style={styles.headerText}>taskDetails</MyText>
                            {loadings?.edit_task ? <View /> : <AntDesign name={'edit'} onPress={EditTaskButton} size={20} color={Colors.primary} />}
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
                                            <Fontisto
                                                name={currentTask?.checked ? 'checkbox-active' : 'checkbox-passive'}
                                                size={20}
                                                onPress={() => { checkTask(); closeModal(); }}
                                                color={Colors.primary}
                                            />
                                        }
                                    </View>
                                </View>
                                {taskMaterials?.length ?
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
                                        {taskMaterials?.length > 5 ?
                                            taskMaterials?.slice(0, 5).map((item, index) => <MaterialComponent material={item} key={index} />)
                                            :
                                            taskMaterials?.map((item, index) => <MaterialComponent material={item} key={index} />)
                                        }
                                        {/* <View style={styles.dynamicFieldsComponent}>
                                        {materialsFields.map((field, index) => {
                                            return (
                                                <View key={index} style={styles.dynamicInputsContainer}>
                                                    <TextInput
                                                        style={[styles.input, { width: '60%', marginStart: 0 }]}
                                                        mode={'flat'}
                                                        fontFamily={'light'}
                                                        theme={inputTheme}
                                                        value={field.material}
                                                        onChangeText={text => materialInput(text, index)}
                                                    />
                                                    <TextInput
                                                        style={[styles.input, { width: '25%', marginStart: 0 }]}
                                                        mode={'flat'}
                                                        fontFamily={'light'}
                                                        keyboardType={'decimal-pad'}
                                                        theme={inputTheme}
                                                        value={field.quantity}
                                                        onChangeText={text => materialQuantityInput(text, index)}
                                                    />
                                                    <AntDesign
                                                        name={'closecircleo'}
                                                        size={20}
                                                        color={'rgba(255, 0, 0, 0.75)'}
                                                        onPress={() => deleteInput(index)}
                                                    />
                                                </View>
                                            )
                                        })}
                                    </View> */}
                                        {taskMaterials?.length ? <LoadMore loadMore={loadMore} /> : null}
                                    </View>
                                    : null}
                                {/* <View style={styles.addMaterialContainer}>
                                <TouchableOpacity onPress={onExtraFieldPressed}>
                                    <AntDesign
                                        name={'pluscircleo'}
                                        size={20}
                                        color={Colors.primary}
                                        style={{ marginTop: 5, alignSelf: 'flex-start' }}
                                        onPress={onExtraFieldPressed}
                                    />
                                    <MyText>addMaterialHelper</MyText>
                                </TouchableOpacity>
                                {materialsFields.length && materialsFields[0].title !== "" ?
                                    <View style={styles.buttonsContainer}>
                                        {loadings?.add_material ? <Indicator animating={loadings?.add_material} /> :
                                            <TouchableOpacity onPress={addNewMaterials} style={styles.submitButton}>
                                                <MyText style={styles.submitText}>addMaterials</MyText>
                                            </TouchableOpacity>}
                                    </View>
                                    :
                                    null
                                }
                            </View> */}
                                <View style={styles.inputContainer}>
                                    <MyText>employeesQuantity</MyText>
                                    <MyText text={currentTask?.required_employees_quantity + ''} />
                                </View>
                            </>
                        }
                    </ScrollView>}
            </View>
        </Modal>
    )
}


