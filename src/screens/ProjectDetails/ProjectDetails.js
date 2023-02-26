import React, { useEffect } from 'react'
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
import { Feather } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import MyText from '../../components/UI/MyText';
import { fetchOneProject, fetchProjects, resetProject } from '../../redux/reducers/Projects/projects-actions';
import Colors from '../../utils/Colors';
import { TaskComponent, Header, MaterialComponent } from './components';
import ErrorHappened from '../../components/UI/ErrorHappened';
import { clearErrors } from '../../redux/reducers/Global/global-actions';
import { restProjectTasks } from '../../redux/reducers/Tasks/tasks-actions';
import { navigate } from '../../navigation/RootNavigation';
import { t } from '../../i18n';
import Indicator from '../../components/UI/Indicator';
import LoadMore from '../../components/UI/LoadMore';
import moment from 'moment';

export const ProjectDetails = (props) => {
    const dispatch = useDispatch();

    const { id, status, deleted } = props?.route?.params

    // const [optionsModal, setOptionsModal] = useState(false);

    const errors = useSelector((state) => state?.globalReducer?.errors)
    const loadings = useSelector((state) => state?.globalReducer?.loadings)

    const user = useSelector((state) => state?.authReducer?.user);
    const project = useSelector((state) => state?.projectsReducer?.project);
    const projectTasks = useSelector((state) => state?.tasksReducer?.projectTasks);
    const projectCheckedTasks = useSelector((state) => state?.tasksReducer?.projectCheckedTasks);
    let projectMaterials = [];
    projectMaterials = project ? project?.materials : [];

    useEffect(() => {
        if (errors?.project) {
            showMessage({
                message: t('app.serverError'),
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

    useEffect(() => {
        dispatch(clearErrors());
        dispatch(fetchOneProject(id, false))
        return () => {
            dispatch(fetchProjects(status, deleted, false, 1, 5, true))
            dispatch(resetProject())
            dispatch(restProjectTasks())
        }
    }, [])

    const onRefresh = () => dispatch(fetchOneProject(id, true))

    // const closeOptionsModal = () => {
    //     setOptionsModal(false)
    // }

    // const openOptionsModal = () => {
    //     setOptionsModal(!optionsModal);
    // }

    const onPhoneNumberPressed = () => Linking.openURL(`tel:${project?.user?.phone_number}`)

    const loadMore = () => navigate('MaterialsScreen', { materials: projectMaterials, screen: 'project' })

    // const goToCalculatingScreen = () => navigate('CalcualtionsScreen')

    return (
        <View style={styles.container}>
            <Header
                // user={user}
                // showModal={openOptionsModal}
                showGoBackButton
                text={!project?.name ? '' : project?.name}
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
                                {project?.name ? <View style={styles.nameContainer}>
                                    <MyText text={project?.name} />
                                    <MyText style={styles.projectStartDate} text={moment(project?.start_date).fromNow()} />
                                </View> : null}
                                {project?.user ?
                                    <View style={styles.supervisorContainer}>
                                        <MyText style={styles.label}>projectSupervisors</MyText>
                                        <MyText style={styles.supervisor} text={`${project?.user?.name}`} />
                                        <TouchableOpacity
                                            disabled={user?.phoneNumber === project?.user?.phone_number}
                                            onPress={user?.phone_number !== project?.user?.phone_number ? onPhoneNumberPressed : null}
                                            style={styles.phoneNumberContainer}>
                                            <MyText style={styles.phoneNumber} text={`${project?.user?.phone_number}`} />
                                            {user?.phone_number !== project?.user?.phone_number ? <Feather name={'external-link'} size={15} color={Colors.primary} /> : null}
                                        </TouchableOpacity>
                                    </View> : null}
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

                                {loadings?.project_tasks ? <Indicator animating={loadings?.project_tasks} /> :
                                    <>
                                        {projectTasks?.length ?
                                            <View style={styles.tasksContainer}>
                                                <View style={styles.tasksLabelContainer}>
                                                    <MyText style={styles.label}>tasks</MyText>
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
                                    </>
                                }
                            </ScrollView>
                        </View>
                    }

                    {/* {user?.role === 'admin' && project?.status !== 'finished' && !project?.deleted ?
                        <AddTask project={project} _scrollRef={_scroll} />
                        : null} */}
                </>
            }
            {/* <ProjectActionsModal visible={optionsModal} closeModal={closeOptionsModal} project={project} /> */}
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
    label: {
        fontFamily: 'bold',
        color: Colors.primary
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