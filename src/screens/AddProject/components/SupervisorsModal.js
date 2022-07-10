import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    StyleSheet,
    Modal,
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
                style={styles.item}
                activeOpacity={0.5}
                onPress={() => onItemPressed(item)}>
                <MyText text={item?.name} />
            </TouchableOpacity>
        )
    }

    const refresh = () => {
        dispatch(fetchSuperVisors())
    }

    const addSupervisor = () => {
        closeModal();
        navigation.navigate('Employees', {
            screen: 'AddEmployeeScreen'
        })
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
                <Animatable.View duration={800} animation='fadeInUp' style={styles.modalView}>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.closeButton} onPress={closeModal}>
                            <AntDesign name={'closecircle'} size={20} color={Colors.buttons} />
                            <MyText>close</MyText>
                        </TouchableOpacity>
                        {reload ?
                            <TouchableOpacity activeOpacity={0.7} style={styles.closeButton} onPress={refresh}>
                                <Ionicons name={'refresh-circle'} size={20} color={'black'} />
                                <MyText>refresh</MyText>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity activeOpacity={0.7} style={styles.addSupervisor} onPress={addSupervisor}>
                                <Entypo name={'add-user'} size={20} color={Colors.buttons} />
                                <MyText style={{ textAlign: 'center', color: Colors.text }}>addSupervisor</MyText>
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
                </Animatable.View>
                <FlashMessage ref={_flashRef} position={'bottom'} />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: '#00000095'
    },
    modalView: {
        width: '100%',
        height: '50%',
        backgroundColor: Colors.primary,
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
    addSupervisor: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
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
        backgroundColor: Colors.secondary,
        borderRadius: 8,
        padding: 5,
        width: '100%',
        marginVertical: 5,
        alignSelf: 'center'
    },
})