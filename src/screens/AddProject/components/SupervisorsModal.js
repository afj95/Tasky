import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import MyText from '../../../components/UI/MyText';
import _ from 'underscore';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuperVisors, resetUsersErrors } from '../../../redux/reducers/Users/users-actions';
import Colors from '../../../utils/Colors';
import FlashMessage from 'react-native-flash-message';
import { t } from '../../../i18n';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

export const SupervisorsModal = ({ modalVisible, onSelect, closeModal }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const _flashRef = useRef()

    const [reload, showReload] = useState(false)

    const fetchSupervisorsLoading = useSelector(state => state.usersReducer.fetchSupervisorsLoading);
    const supervisors = useSelector(state => state.usersReducer.supervisors);
    const fetchSupervisorsError = useSelector(state => state.usersReducer.fetchSupervisorsError);

    useEffect(() => {
        dispatch(fetchSuperVisors());
    }, [])

    useEffect(() => {
        if (fetchSupervisorsError) {
            _flashRef?.current?.showMessage({
                message: t('app.errorHappened'),
                type: 'danger',
                duration: 2000,
                autoHide: false
            })
            showReload(true)
        } else {
            showReload(false)
        }
        dispatch(resetUsersErrors());
    }, [fetchSupervisorsLoading])

    const onItemPressed = async (item) => {
        await onSelect(item);
        closeModal();
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                key={index.toString()}
                style={styles.container}
                activeOpacity={0.5}
                onPress={() => onItemPressed(item)}>
                <View style={styles.employeeDetailsContainer}>
                    <View style={styles.imageContainer}>
                        <Ionicons name={'person'} size={20} color={Colors.primary} />
                    </View>
                    <View>
                        <MyText style={styles.text} text={item.name} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const refresh = () => {
        dispatch(fetchSuperVisors())
    }

    const addSupervisor = () => {
        closeModal();
        navigation.navigate('AddEmployeeScreen')
    }

    return (
        <Modal
            swipeThreshold={10}
            isVisible={modalVisible}
            style={styles.modal}
            onBackdropPress={closeModal}
            onSwipeComplete={closeModal}
            onBackButtonPress={closeModal}
            animationIn={'slideInUp'}
            animationInTiming={500}
            animationOutTiming={500}
            swipeDirection={'down'}
            useNativeDriver>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.closeButton} onPress={closeModal}>
                            <AntDesign name={'closecircle'} size={20} color={Colors.primary} />
                            <MyText style={styles.closeText}>close</MyText>
                        </TouchableOpacity>
                        {reload ?
                            <TouchableOpacity activeOpacity={0.7} style={styles.closeButton} onPress={refresh}>
                                <Ionicons name={'refresh-circle'} size={30} color={Colors.primary} />
                                <MyText style={styles.reload}>refresh</MyText>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity activeOpacity={0.7} style={styles.addSupervisor} onPress={addSupervisor}>
                                <Entypo name={'add-user'} size={20} color={Colors.primary} />
                                <MyText style={styles.addSupervisorText}>addSupervisor</MyText>
                            </TouchableOpacity>
                        }
                    </View>
                    {fetchSupervisorsLoading ?
                        <View style={styles.loader}>
                            <ActivityIndicator size={'small'} color={Colors.black} />
                        </View>
                        :
                        <FlatList
                            data={supervisors || []}
                            keyExtractor={(item, index) => '#' + index.toString()}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                        />
                    }
                </View>
                <FlashMessage ref={_flashRef} position={'bottom'} />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
    },
    modalView: {
        width: '100%',
        height: '50%',
        backgroundColor: Colors.appWhite,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        padding: 10,
    },
    closeButton: {
        width: 50,
        height: 50,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeText: {
        fontFamily: 'bold',
        color: Colors.primary
    },
    reload: {
        fontFamily: 'bold'
    },
    addSupervisor: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addSupervisorText: {
        textAlign: 'center',
        color: Colors.primary,
        fontFamily: 'bold'
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchbar: {
        height: 50,
        alignSelf: 'center',
        elevation: 1,
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#999'
    },
    item: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        padding: 5,
        width: '100%',
        marginVertical: 5,
        alignSelf: 'center'
    },

    container: {
        backgroundColor: Colors.white,
        marginBottom: 8,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    employeeDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: Colors.primary,
        width: 30, height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginHorizontal: 5,
    },
    deletedText: {
        color: 'red',
        fontSize: 12,
        fontWeight: 'bold'
    },
    text: {
        color: Colors.black,
        fontFamily: 'light'
    }
})