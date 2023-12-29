import React, { useState, useEffect } from 'react'
import {
    ScrollView,
    View,
    StyleSheet,
    Linking,
    RefreshControl,
    I18nManager,
    ActivityIndicator
} from 'react-native';
import TouchableOpacity from '../../components/UI/TouchableOpacity';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { showMessage } from '../../tools';
import { useDispatch, useSelector } from 'react-redux';
import MyText from '../../components/UI/MyText';
import { fetchOneProject, resetProject } from '../../redux/reducers/Projects/projects-actions';
import Colors from '../../utils/Colors';
import { TaskComponent, MaterialComponent, MapComponent, AddTaskModal } from './components';
import ErrorHappened from '../../components/UI/ErrorHappened';
import { clearErrors } from '../../redux/reducers/Global/global-actions';
import { restProjectTasks } from '../../redux/reducers/Tasks/tasks-actions';
import { navigate } from '../../navigation/RootNavigation';
import { t } from '../../i18n';
import LoadMore from '../../components/UI/LoadMore';
import moment from 'moment';
import { MainHeader } from '../../components/UI/MainHeader';
import Errors_codes from '../../../Errors_codes';
// import { Switch } from 'react-native-paper';

export const ProjectDetails = (props) => {
    const dispatch = useDispatch();

    const { id,
        // status,
        // deleted,
        // inProgress
    } = props?.route?.params

    // const [optionsModal, setOptionsModal] = useState(false);
    const [uncheckedHeight, setUncheckedHeight] = useState(false);
    const [checkedHeight, setCheckedHeight] = useState(false);
    const [mapModalVisible, setMapModalVisible] = useState(false);
    const [addTaskModalVisibility, setAddTaskModalVisibility] = useState(false);
    const [switchVal, setSwitchVal] = useState(false);

    const errors = useSelector((state) => state?.globalReducer?.errors)
    const loadings = useSelector((state) => state?.globalReducer?.loadings)

    const user = useSelector((state) => state?.authReducer?.user);
    const project = useSelector((state) => state?.projectsReducer?.project);
    const projectTasks = useSelector((state) => state?.tasksReducer?.projectTasks);
    const projectCheckedTasks = useSelector((state) => state?.tasksReducer?.projectCheckedTasks);
    let projectMaterials = [];
    projectMaterials = project ? project?.materials : [];

    useEffect(() => {
        dispatch(clearErrors());
        dispatch(fetchOneProject(id, false))
        return () => {
            dispatch(resetProject())
            dispatch(restProjectTasks())
        }
    }, [])

    useEffect(() => {
        if (errors?.project) {
            showMessage({
                message: t('app.serverError') + ' ' + Errors_codes.project_details_server_error,
                type: 'danger',
            })
        }
        if (errors?.project_tasks) {
            showMessage({
                message: errors?.project_tasks?.message + '',
                type: 'danger',
            })
        }
    }, [errors?.project, errors?.project_tasks])

    const onRefresh = () => dispatch(fetchOneProject(id, true))

    // const closeOptionsModal = () => {
    //     setOptionsModal(false)
    // }

    // const openOptionsModal = () => {
    //     setOptionsModal(!optionsModal);
    // }

    const onPhoneNumberPressed = phone_number => Linking.openURL(`tel:${phone_number}`)

    const loadMore = () => navigate('MaterialsScreen', { materials: projectMaterials, screen: 'project' })

    const openMapModal = () => setMapModalVisible(true)

    const closeMapModal = () => setMapModalVisible(false)

    const closeAddTaskModal = () => setAddTaskModalVisibility(false);

    // const onToggleSwitch = () => setSwitchVal(!switchVal)

    return (
        <View style={styles.container}>
            <MainHeader
                title={!project?.name ? '' : __DEV__ ? project?.name + ' ' + project?.id : project?.name}
                showGoBack
                translate={false}
            />
            {errors?.project || errors?.project_tasks ? <ErrorHappened /> :
                <>
                    {loadings?.project ?
                        <ActivityIndicator color={Colors.primary} size={'small'} animating={loadings?.project} style={{ flex: 1 }} />
                        :
                        <View style={styles.detailsContainer}>
                            {/* {project?.status === 'finished' && <View style={styles.deleted} />} */}
                            {/* {project?.deleted_at && <View style={styles.status} />} */}
                            <ScrollView
                                scrollEventThrottle={400}
                                contentContainerStyle={styles.scrollContainer}
                                keyboardShouldPersistTaps={'always'}
                                keyboardDismissMode={'on-drag'}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={loadings?.project_refresh === true}
                                        onRefresh={onRefresh}
                                        tintColor={Colors.primary}
                                        colors={[Colors.primary, Colors.secondary, Colors.appWhite]}
                                    />
                                }>
                                {project?.name ?
                                    <View style={styles.nameContainer}>
                                        <View>
                                            <MyText text={project?.name} />
                                            <MyText text={project?.work_type || ''} />
                                            {/* {!project?.latitude && project?.longitude ?
                                                 : null} */}
                                            <MyText
                                                style={styles.projectStartDate}
                                                text={moment(project?.start_date).fromNow()}
                                            />
                                        </View>
                                        {(project?.latitude && project?.longitude) ?
                                            <MaterialCommunityIcons
                                                name={'directions'}
                                                size={20}
                                                color={Colors.primary}
                                                onPress={openMapModal}
                                                style={{ padding: 5 }}
                                            />
                                            : null}
                                    </View> : null}
                                {project?.user ?
                                    <View style={styles.supervisorContainer}>
                                        <MyText style={styles.label}>projectSupervisors</MyText>
                                        <MyText style={styles.supervisor} text={`${project?.user?.name}`} />
                                        {/* supervisor phone_number */}
                                        <TouchableOpacity
                                            disabled={user?.phoneNumber === project?.user?.phone_number}
                                            onPress={() => onPhoneNumberPressed(project?.user?.phone_number)}
                                            style={styles.phoneNumberContainer}>
                                            <MyText style={styles.phoneNumber} text={` ${project?.user?.phone_number} `} />
                                            {user?.phone_number !== project?.user?.phone_number ? <Feather name={'external-link'} size={15} color={Colors.primary} /> : null}
                                        </TouchableOpacity>
                                    </View> : null}
                                {project?.client ?
                                    <View style={styles.supervisorContainer}>
                                        <MyText style={styles.label}>projectClient</MyText>
                                        <MyText style={styles.supervisor} text={`${project?.client?.name}`} />
                                        {/* Client phone_number */}
                                        <TouchableOpacity
                                            onPress={() => onPhoneNumberPressed(project?.client?.phone_number)}
                                            style={styles.phoneNumberContainer}>
                                            <MyText style={styles.phoneNumber} text={` ${project?.client?.phone_number} `} />
                                            {<Feather name={'external-link'} size={15} color={Colors.primary} />}
                                        </TouchableOpacity>
                                    </View> : null}
                                {/* <Switch
                                    value={switchVal}
                                    onValueChange={onToggleSwitch}
                                    color={Colors.primary}
                                    style={{
                                        borderWidth: 1,
                                        backgroundColor: Colors.white,
                                        marginTop: 5
                                    }}
                                />*/}

                                <View style={styles.statusContainer}>
                                    <MyText style={styles.label}>projectStatus</MyText>
                                    <MyText style={styles.description}>{project?.status}</MyText>
                                </View>
                                {!project?.description ? null :
                                    <View style={styles.descriptionContainer}>
                                        <MyText style={styles.label}>projectDescription</MyText>
                                        <MyText style={styles.description} text={`${project?.description}`} />
                                    </View>
                                }
                                {/* {!project || !project?.description ? null :
                                    <TouchableOpacity style={styles.calculationsContainer}
                                        onPress={goToCalculatingScreen}>
                                        <MyText>calculations</MyText>
                                        <MaterialIcons name={'arrow-forward-ios'} size={20} color={Colors.primary} style={styles.arrow} />
                                    </TouchableOpacity>
                                } */}
                                {projectMaterials?.length ?
                                    <View style={styles.materialsContainer}>
                                        <View style={styles.materialsLabelContainer}>
                                            <MyText style={styles.label}>materials</MyText>
                                            <MyText style={styles.label}>quantity</MyText>
                                        </View>
                                        {projectMaterials?.length > 5 ?
                                            projectMaterials?.slice(0, 5).map((item, index) => <MaterialComponent material={item} key={index} />)
                                            :
                                            projectMaterials?.map((item, index) => <MaterialComponent material={item} key={index} />)
                                        }
                                        {projectMaterials?.length ? <LoadMore loadMore={loadMore} /> : null}
                                    </View>
                                    : null
                                }

                                {loadings?.project_tasks ? <ActivityIndicator animating={loadings?.project_tasks} color={Colors.primary} /> :
                                    <>
                                        {projectTasks?.length ?
                                            <View style={styles.tasksContainer}>
                                                <TouchableOpacity
                                                    onPress={() => setUncheckedHeight(!uncheckedHeight)}
                                                    style={styles.tasksLabelContainer}>
                                                    <View style={styles.tasksLabelLengthContainer}>
                                                        <MyText style={styles.label}>unChecked</MyText>
                                                        <MyText style={styles.tasksLength} text={projectTasks?.length} />
                                                    </View>
                                                    <AntDesign name={uncheckedHeight ? 'up' : 'down'} color={Colors.primary} />
                                                </TouchableOpacity>
                                                {!uncheckedHeight && projectTasks?.map((task, index) =>
                                                    <TaskComponent
                                                        task={task}
                                                        project_id={id}
                                                        onPress
                                                        key={index}
                                                        index={index}
                                                    />
                                                )}
                                            </View>
                                            : null}
                                        {projectCheckedTasks?.length ?
                                            <View style={[styles.tasksContainer, { marginTop: 5 }]}>
                                                <TouchableOpacity
                                                    onPress={() => setCheckedHeight(!checkedHeight)}
                                                    style={styles.tasksLabelContainer}>
                                                    <View style={styles.tasksLabelLengthContainer}>
                                                        <MyText style={styles.label}>checked</MyText>
                                                        <MyText style={styles.tasksLength} text={projectCheckedTasks?.length} />
                                                    </View>
                                                    <AntDesign name={checkedHeight ? 'down' : 'up'} color={Colors.primary} />
                                                </TouchableOpacity>
                                                {checkedHeight && projectCheckedTasks?.map((task, index) =>
                                                    <TaskComponent
                                                        task={task}
                                                        project_id={id}
                                                        onPress
                                                        key={index}
                                                        index={index}
                                                    />
                                                )}
                                            </View>
                                            : null}
                                    </>
                                }
                            </ScrollView>
                        </View>
                    }

                    {user?.role === 'admin'
                        && (
                            !loadings?.project
                            && !loadings?.project_refresh
                            && !loadings?.project_tasks
                        ) ?
                        <TouchableOpacity onPress={() => setAddTaskModalVisibility(true)} style={styles.addTaskButton}>
                            <Ionicons name={'add'} size={30} color={Colors.appWhite} />
                        </TouchableOpacity> : null}
                </>
            }
            {/* <ProjectActionsModal
                visible={optionsModal}
                closeModal={closeOptionsModal}
                project={project}
            /> */}

            <AddTaskModal
                visible={addTaskModalVisibility}
                setVisible={setAddTaskModalVisibility}
                closeModal={closeAddTaskModal}
                project={project}
            />
            <MapComponent
                visible={mapModalVisible}
                closeModal={closeMapModal}
                latitude={project?.latitude}
                longitude={project?.longitude}
                location={project?.location}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.appWhite
    },
    detailsContainer: {
        flex: 1,
        paddingTop: 2,
        paddingHorizontal: 10,
    },
    scrollContainer: { paddingBottom: 150 },
    nameContainer: {
        backgroundColor: Colors.white,
        marginTop: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    projectStartDate: {
        fontFamily: 'light',
        textAlign: 'left',
        marginTop: 8,
        fontSize: 10
    },
    supervisorContainer: {
        backgroundColor: Colors.white,
        marginTop: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    supervisor: {
        marginStart: 5,
        fontSize: 13,
        color: Colors.black,
        fontFamily: 'light'
    },
    phoneNumberContainer: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    phoneNumber: {
        marginStart: 5,
        fontSize: 13,
        color: Colors.secondary,
        textDecorationLine: 'underline',
        fontFamily: 'bold'
    },
    statusContainer: {
        marginTop: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
    },
    descriptionContainer: {
        marginTop: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
        borderBottomStartRadius: 8,
        borderBottomEndRadius: 8,
    },
    description: {
        fontSize: 13,
        fontFamily: 'bold',
        color: Colors.black
    },
    calculationsContainer: {
        paddingVertical: 10,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 8,
        marginTop: 1.5,
        marginBottom: 1.5
    },
    arrow: {
        transform: I18nManager.isRTL ?
            [
                { rotateY: "180deg" },
                { rotateZ: "0deg" }
            ]
            :
            [
                { rotateY: "0deg" },
                { rotateZ: "0deg" }
            ]
    },
    materialsContainer: {
        borderRadius: 8,
        marginTop: 5,
        paddingVertical: 5,
        backgroundColor: Colors.white,
    },
    materialsLabelContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    tasksContainer: {
        borderRadius: 8,
        marginTop: 5,
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
        paddingVertical: 5
    },
    tasksLabelContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    tasksLabelLengthContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tasksLength: {
        fontSize: 12,
        fontFamily: 'bold',
        marginStart: 8,
        color: Colors.primary,
        opacity: 0.5
    },
    addTaskButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        start: 20,
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
    },
    label: {
        fontFamily: 'bold',
        color: Colors.primary,
        marginVertical: 5,
    },
    watchMore: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        padding: 2,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
    },
    watchMoreText: {
        fontFamily: 'light',
        fontSize: 12,
        color: Colors.primary,
    },
    noDataContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 20
    },
})