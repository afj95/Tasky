import React, { useState, useEffect, useRef } from 'react'
import {
    ScrollView,
    View,
    StyleSheet,
    TouchableOpacity,
    Linking,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import MyText from '../../components/UI/MyText';
import { fetchingOneProject, fetchingProjects, resetProjectsErrors } from '../../redux/reducers/Projects/projects-actions';
import Colors from '../../utils/Colors';
import { TaskComponent, Header, ProjectActionsModal, AddTask } from './components';
import { t } from '../../i18n';
import ErrorHappened from '../../components/UI/ErrorHappened';

export const ProjectDetails = ({ route: { params: { project, status, deleted } } }) => {
    const dispatch = useDispatch();
    const _scroll = useRef(null);

    const user = useSelector((state) => state?.authReducer?.user);
    const currentProject = useSelector((state) => state?.projectsReducer?.project);
    const fetchingProjectsLoading = useSelector((state) => state?.projectsReducer?.fetchingProjectsLoading);
    const fetchingProjectError = useSelector((state) => state?.projectsReducer?.fetchingProjectError);

    const [optionsModal, setOptionsModal] = useState(false);

    useEffect(() => {
        dispatch(fetchingOneProject(project?._id))
        return () => {
            dispatch(fetchingProjects(status, deleted))
            dispatch(resetProjectsErrors());
        }
    }, [])

    useEffect(() => {
        if (fetchingProjectError == 500) {
            showMessage({
                message: t('app.errorHappened'),
                type: 'danger',
                duration: 1500,
            })
        } else if (fetchingProjectError == 400) {
            showMessage({
                message: t('app.wrongData'),
                type: 'danger',
                duration: 1500,
            })
        }
    }, [fetchingProjectsLoading])

    const onRefresh = () => dispatch(fetchingOneProject(project?._id))

    const closeOptionsModal = () => {
        setOptionsModal(false)
    }

    const openOptionsModal = () => {
        setOptionsModal(!optionsModal);
    }

    const onPhoneNumberPressed = () => Linking.openURL(`tel:${project?.projectSupervisors?.phoneNumber}`)

    return (
        <View style={styles.container}>
            <Header
                user={user}
                showModal={openOptionsModal}
                showGoBackButton
                onRefresh={onRefresh}
                fetchingProjectsLoading={fetchingProjectsLoading}
                text={!currentProject?.projectName1 ? '' : currentProject?.projectName1}
            />
            {fetchingProjectError ? <ErrorHappened /> :
                <>
                    <View style={styles.detailsContainer}>
                        {currentProject?.status === 'finished' && <View style={styles.deleted} />}
                        {currentProject?.deleted && <View style={styles.status} />}
                        {!currentProject ? <ActivityIndicator size={'large'} color={Colors.secondary} style={{ marginTop: 20 }} /> :
                            <ScrollView
                                ref={_scroll}
                                contentContainerStyle={styles.scrollContainer}
                                keyboardShouldPersistTaps={'always'}
                                keyboardDismissMode={'on-drag'}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={false}
                                        onRefresh={onRefresh}
                                        colors={[Colors.primary, Colors.secondary, Colors.lightBlue]}
                                    />
                                }>
                                <View style={styles.nameContainer}>
                                    <MyText text={`${currentProject?.projectName1}`} />
                                    <MyText text={`${currentProject?.projectName2}`} />
                                </View>
                                {currentProject?.projectSupervisors ?
                                    <View style={styles.supervisorContainer}>
                                        <MyText style={styles.label}>projectSupervisors</MyText>
                                        <MyText style={styles.supervisor} text={`${currentProject?.projectSupervisors?.name}`} />
                                        <TouchableOpacity
                                            disabled={user.phoneNumber === currentProject?.projectSupervisors?.phoneNumber}
                                            activeOpacity={0.6}
                                            onPress={onPhoneNumberPressed}
                                            style={styles.phoneNumberContainer}>
                                            <MyText style={styles.phoneNumber} text={`${currentProject?.projectSupervisors?.phoneNumber}`} />
                                            {user.phoneNumber !== currentProject?.projectSupervisors?.phoneNumber ? <Feather name={'external-link'} size={15} color={Colors.black} /> : null}
                                        </TouchableOpacity>
                                    </View> : null}
                                <View style={styles.descriptionContainer}>
                                    <MyText style={styles.label}>projectDescription</MyText>
                                    <MyText style={styles.description} text={`${currentProject?.projectDescription}`} />
                                </View>
                                <View style={styles.tasksContainer}>
                                    {currentProject?.tasks?.length > 0 && <MyText style={styles.label}>tasks</MyText>}
                                    {currentProject?.tasks?.map((task, index) =>
                                        <TaskComponent
                                            task={task}
                                            key={index}
                                            index={index}
                                            project={currentProject}
                                        // TODO: Show taskDetailsModal
                                        // onPress={() => openTaskInformationModal(task)}
                                        />
                                    )}
                                </View>
                            </ScrollView>}
                    </View>
                    {user?.role === 'admin' && currentProject?.status !== 'finished' && !currentProject?.deleted ?
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
        backgroundColor: Colors.primary,
    },
    detailsContainer: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingTop: 15
    },
    scrollContainer: { paddingBottom: 120 },
    status: {
        width: '100%',
        height: 20,
        backgroundColor: '#FA8072'
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleted: {
        width: '100%',
        height: 20,
        backgroundColor: 'green',
    },
    nameContainer: {
        backgroundColor: Colors.secondary,
        marginBottom: 2.5,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    supervisorContainer: {
        backgroundColor: Colors.secondary,
        marginVertical: 2.5,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    supervisor: {
        paddingHorizontal: 5,
        fontSize: 13,
        color: Colors.text
    },
    phoneNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    phoneNumber: {
        paddingHorizontal: 5,
        fontSize: 13,
        color: 'blue',
        textDecorationLine: 'underline'
    },
    descriptionContainer: {
        marginVertical: 2.5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: Colors.secondary,
    },
    description: {
        paddingHorizontal: 5,
        fontSize: 13,
        color: Colors.text
    },
    tasksContainer: {
        marginVertical: 2.5,
        paddingHorizontal: 10,
        backgroundColor: Colors.secondary,
    },
    label: {
        fontWeight: 'bold',
        color: Colors.text
    },
    checkbox: {
        alignSelf: "center",
    },
})