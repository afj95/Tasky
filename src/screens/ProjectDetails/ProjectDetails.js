import React, { useState, useEffect, useRef } from 'react'
import {
    ScrollView,
    View,
    StyleSheet,
    Linking,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import TouchableOpacity from '../../components/UI/TouchableOpacity';
import { AntDesign, Feather } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import MyText from '../../components/UI/MyText';
import { fetchOneProject, fetchProjects, resetProject } from '../../redux/reducers/Projects/projects-actions';
import Colors from '../../utils/Colors';
import { TaskComponent, Header, ProjectActionsModal, AddTask, MaterialComponent } from './components';
import ErrorHappened from '../../components/UI/ErrorHappened';
import { clearErrors } from '../../redux/reducers/Global/global-actions';
import { addMaterials, restProjectTasks } from '../../redux/reducers/Tasks/tasks-actions';
import { TextInput } from 'react-native-paper';
import { navigate } from '../../navigation/RootNavigation';

export const ProjectDetails = (props) => {
    const dispatch = useDispatch();
    const _scroll = useRef(null);

    const { id, status, deleted } = props?.route?.params

    const [optionsModal, setOptionsModal] = useState(false);
    const [scrolledToBottom, setScrolledToBottom] = useState(false);

    const loadings = useSelector((state) => state?.globalReducer?.loadings)
    const errors = useSelector((state) => state?.globalReducer?.errors)

    const user = useSelector((state) => state?.authReducer?.user);
    const project = useSelector((state) => state?.projectsReducer?.project);
    const projectTasks = useSelector((state) => state?.tasksReducer?.projectTasks);
    let projectMaterials = [];
    projectMaterials = project ? project?.materials : [];
    const projectCheckedTasks = useSelector((state) => state?.tasksReducer?.projectCheckedTasks);

    useEffect(() => {
        dispatch(fetchOneProject(id))
        return () => {
            dispatch(fetchProjects(status, deleted))
            dispatch(resetProject())
            dispatch(restProjectTasks())
        }
    }, [])

    useEffect(() => {
        if (errors?.project) {
            showMessage({
                message: errors?.project + '',
                type: 'danger',
            })
        }
        if (errors?.project_tasks) {
            showMessage({
                message: errors?.project_tasks + '',
                type: 'danger',
            })
        }
        dispatch(clearErrors());
    }, [errors?.project, errors?.project_tasks])

    const onRefresh = () => dispatch(fetchOneProject(id))

    const closeOptionsModal = () => {
        setOptionsModal(false)
    }

    const openOptionsModal = () => {
        setOptionsModal(!optionsModal);
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    const scrollToTop = () => {
        _scroll.current.scrollTo({ x: 0, y: 0, animated: true });
        setScrolledToBottom(false)
    }

    const onScroll = ({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
            setScrolledToBottom(true)
        }
    }

    const onPhoneNumberPressed = () => Linking.openURL(`tel:${project?.user?.phone_number}`)

    const loadMore = () => navigate('MaterialsScreen', { materials: projectMaterials })

    return (
        <View style={styles.container}>
            <Header
                user={user}
                showModal={openOptionsModal}
                showGoBackButton
                onRefresh={onRefresh}
                fetchingProjectsLoading={loadings?.project}
                text={!project?.name ? '' : project?.name}
            />
            {errors?.project || errors?.project_tasks ? <ErrorHappened /> :
                <>
                    <View style={styles.detailsContainer}>
                        {project?.status === 'finished' && <View style={styles.deleted} />}
                        {project?.deleted_at && <View style={styles.status} />}
                        {!project ? <ActivityIndicator size={'large'} color={Colors.secondary} style={{ marginTop: 20 }} /> :
                            <ScrollView
                                ref={_scroll}
                                onScroll={onScroll}
                                scrollEventThrottle={400}
                                contentContainerStyle={styles.scrollContainer}
                                keyboardShouldPersistTaps={'always'}
                                keyboardDismissMode={'on-drag'}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={false}
                                        onRefresh={onRefresh}
                                        colors={[Colors.primary, Colors.secondary, Colors.appWhite]}
                                    />
                                }>
                                {project?.name ? <View style={styles.nameContainer}>
                                    <MyText text={`${project?.name}`} />
                                </View> : null}
                                {project?.user ?
                                    <View style={styles.supervisorContainer}>
                                        <MyText style={styles.label}>projectSupervisors</MyText>
                                        <MyText style={styles.supervisor} text={`${project?.user?.name}`} />
                                        <TouchableOpacity
                                            disabled={user.phoneNumber === project?.user?.phone_number}
                                            activeOpacity={0.6}
                                            onPress={user.phone_number !== project?.user?.phone_number ? onPhoneNumberPressed : null}
                                            style={styles.phoneNumberContainer}>
                                            <MyText style={styles.phoneNumber} text={`${project?.user?.phone_number}`} />
                                            {user.phone_number !== project?.user?.phone_number ? <Feather name={'external-link'} size={15} color={Colors.black} /> : null}
                                        </TouchableOpacity>
                                    </View> : null}
                                {project?.description ? <View style={styles.descriptionContainer}>
                                    <MyText style={styles.label}>projectDescription</MyText>
                                    <MyText style={styles.description} text={`${project?.description}`} />
                                </View> : null}
                                {projectMaterials?.length ?
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
                                        {projectMaterials?.length > 5 ?
                                            projectMaterials?.slice(0, 5).map((item, index) => <MaterialComponent material={item} key={index} />)
                                            :
                                            projectMaterials?.map((item, index) => <MaterialComponent material={item} key={index} />)
                                        }
                                        {projectMaterials?.length > 5 ?
                                            <View style={styles.watchMore}>
                                                <AntDesign
                                                    name={'pluscircleo'}
                                                    size={20}
                                                    color={Colors.primary}
                                                    onPress={loadMore}
                                                />
                                                <MyText>loadMore</MyText>
                                            </View> : null}
                                    </View>
                                    : null}

                                {projectTasks?.length ?
                                    <View style={styles.tasksContainer}>
                                        <View style={styles.tasksLabelContainer}>
                                            <MyText style={styles.label}>tasks</MyText>
                                            <ActivityIndicator
                                                animating={loadings?.project_tasks === true}
                                                hidesWhenStopped
                                                size={15}
                                                color={Colors.primary}
                                            />
                                        </View>
                                        {projectTasks?.map((task, index) =>
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
                                    <View style={[styles.tasksContainer, { marginTop: 20 }]}>
                                        <View style={styles.tasksLabelContainer}>
                                            <MyText style={styles.label}>checkedTasks</MyText>
                                            <ActivityIndicator
                                                animating={loadings?.project_tasks === true}
                                                hidesWhenStopped
                                                size={15}
                                                color={Colors.primary}
                                            />
                                        </View>
                                        {projectCheckedTasks?.map((task, index) =>
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
                            </ScrollView>
                        }
                    </View>
                    {scrolledToBottom ?
                        <TouchableOpacity style={styles.scrollToTopButton}
                            onPress={scrollToTop}>
                            <AntDesign name={'totop'} size={20} color={Colors.appWhite} onPress={scrollToTop} />
                        </TouchableOpacity> : null}
                    {user?.role === 'admin' && project?.status !== 'finished' && !project?.deleted ?
                        <AddTask project={project} _scrollRef={_scroll} />
                        : null}
                </>
            }
            <ProjectActionsModal visible={optionsModal} closeModal={closeOptionsModal} project={project} />
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
    },
    scrollContainer: { paddingBottom: 120 },
    status: {
        width: '100%',
        height: 20,
        backgroundColor: '#FA8072'
    },
    deleted: {
        width: '100%',
        height: 20,
        backgroundColor: 'green',
    },
    nameContainer: {
        backgroundColor: Colors.white,
        width: '95%',
        alignSelf: 'center',
        marginBottom: 1.5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopEndRadius: 8,
        borderTopStartRadius: 8
    },
    supervisorContainer: {
        backgroundColor: Colors.white,
        width: '95%',
        alignSelf: 'center',
        marginVertical: 1.5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    supervisor: {
        marginHorizontal: 5,
        fontSize: 13,
        color: Colors.primary,
        fontFamily: 'light'
    },
    phoneNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8
    },
    phoneNumber: {
        paddingHorizontal: 5,
        fontSize: 13,
        color: Colors.secondary,
        textDecorationLine: 'underline',
        fontFamily: 'bold'
    },
    descriptionContainer: {
        marginVertical: 1.5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
        width: '95%',
        alignSelf: 'center',
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
    },
    description: {
        paddingHorizontal: 5,
        fontSize: 13,
        fontFamily: 'bold',
        color: Colors.primary
    },
    addMaterialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderRadius: 8,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    submitButton: {
        backgroundColor: Colors.primary,
        height: 40,
        width: 140,
        borderRadius: 8,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitText: {
        fontFamily: 'light',
        color: Colors.appWhite,
        fontSize: 15
    },
    tasksContainer: {
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        marginVertical: 1.5,
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
        width: '95%',
        alignSelf: 'center',
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8,
        paddingBottom: 8
    },
    tasksLabelContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    materialsContainer: {
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        marginVertical: 1.5,
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
        width: '95%',
        alignSelf: 'center',
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8,
        paddingBottom: 8
    },
    materialsLabelContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    label: {
        fontFamily: 'bold',
        color: Colors.text
    },
    watchMore: {
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 2
    },
    scrollToTopButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: Colors.primary,
        position: 'absolute',
        bottom: 20,
        start: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dynamicFieldsComponent: {
        paddingTop: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginHorizontal: 5
    },
    dynamicInputsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    input: {
        width: 85,
        height: 40,
        marginVertical: 5,
        justifyContent: 'center',
        backgroundColor: Colors.appWhite,
        fontFamily: 'bold',
        borderWidth: 0.5,
        borderColor: Colors.primary,
        borderRadius: 8,
        marginStart: 6,
        overflow: 'hidden'
    },
})