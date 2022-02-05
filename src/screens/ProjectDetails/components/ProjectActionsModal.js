import React, { useEffect, useRef } from 'react'
import {
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import MyText from '../../../components/UI/MyText';
import { deleteProject, fetchingOneProject, fetchingProjects, finishProject, resetProjectsErrors } from '../../../redux/reducers/Projects/projects-actions';
import Colors from '../../../utils/Colors';
import FlashMessage, { showMessage } from 'react-native-flash-message';

export const ProjectActionsModal = ({ visible, closeModal, project }) => {
    const dispatch = useDispatch();
    const flash = useRef();

    const projectActionsLoading = useSelector(state => state.projectsReducer.projectActionsLoading)
    const finishProjectSuccess = useSelector(state => state.projectsReducer.finishProjectSuccess)
    const finishProjectFailed = useSelector(state => state.projectsReducer.finishProjectFailed)
    const currentProject = useSelector((state) => state?.projectsReducer?.project);
    const deleteProjectSuccess = useSelector(state => state.projectsReducer.deleteProjectSuccess)
    const deleteProjectFailed = useSelector(state => state.projectsReducer.deleteProjectFailed)

    useEffect(() => {
        if(finishProjectSuccess) {
            flash.current.showMessage({
                message: 'success finish',
                type: 'success',
                duration: 1500,
            })
        }
        if(finishProjectFailed) {
            flash.current.showMessage({
                message: 'failed finish',
                type: 'danger',
                duration: 1500,
            })
        }
        if(deleteProjectSuccess) {
            flash.current.showMessage({
                message: 'success delete',
                type: 'success',
                duration: 1500,
            })
        }
        if(deleteProjectFailed) {
            flash.current.showMessage({
                message: 'failed delete',
                type: 'danger',
                duration: 1500,
            })
        }
        dispatch(resetProjectsErrors());
    }, [projectActionsLoading])

    const onFinishProjectPressed = () => {
        dispatch(finishProject(currentProject?._id))
        dispatch(fetchingOneProject(currentProject?._id))
    }
    
    const onDeleteProjectPressed = () => {
        dispatch(deleteProject(currentProject?._id))
        dispatch(fetchingOneProject(currentProject?._id))
    }

    return (
        <View>
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={visible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.closeButton}>
                            <AntDesign
                                name={'closecircle'}
                                size={24}
                                color={Colors.black}
                                onPress={closeModal}
                                style={{ alignSelf: 'center' }}
                            />
                            {projectActionsLoading && <ActivityIndicator size={'small'} color={Colors.black} /> }
                        </View>
                            <TouchableOpacity disabled activeOpacity={0.5} style={styles.editProject}>
                                <MyText>editProejct</MyText>
                                <MyText style={{ fontSize: 10 }}>editProejctDisabled</MyText>
                            </TouchableOpacity>
                        {currentProject?.status !== 'finished' &&
                            <TouchableOpacity onPress={onFinishProjectPressed} activeOpacity={0.5} style={styles.finishProject(currentProject?.deleted)}>
                                <MyText>finishProject</MyText>
                            </TouchableOpacity>
                        }
                        {!currentProject?.deleted &&
                            <TouchableOpacity onPress={onDeleteProjectPressed} activeOpacity={0.5} style={styles.deleteProject}>
                                <MyText style={{ color: 'red' }}>deleteProject</MyText>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <FlashMessage ref={flash} position={'bottom'} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        height: '100%',
        backgroundColor: "#00000070",
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalView: {
        backgroundColor: Colors.white,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        padding: 10,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    closeButton: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        width: '100%'
    },
    editProject: {
        borderBottomWidth: 0.6,
        padding: 10,
    },
    finishProject: (deleted) => ({
        borderBottomWidth: deleted ? 0 : 0.6,
        padding: 10,
    }),
    deleteProject: {
        padding: 10,
    },
});
  