import React, { useEffect, useRef } from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import MyText from '../../../components/UI/MyText';
import _ from 'underscore';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../../redux/reducers/Users/users-actions';
import Colors from '../../../utils/Colors';
import FlashMessage from 'react-native-flash-message';
import { t } from '../../../i18n';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

export const SupervisorsModal = ({ modalVisible, onSelect, closeModal }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const _flashRef = useRef()

    const loadings = useSelector((state) => state?.globalReducer?.loadings)
    const errors = useSelector((state) => state?.globalReducer?.errors)

    const foremen = useSelector(state => state?.usersReducer?.foremen);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [])

    useEffect(() => {
        if (errors?.employees) {
            _flashRef?.current?.showMessage({
                message: t('app.errorHappened'),
                type: 'danger',
                duration: 2000,
                autoHide: false
            })
        }
    }, [loadings?.employees])

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

    const refresh = () => dispatch(fetchAllUsers());

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
                    <View style={styles.header}>
                        <AntDesign
                            name={'close'}
                            size={20}
                            color={Colors.primary}
                            style={styles.closeButton}
                            onPress={closeModal}
                        />
                        {loadings?.users ?
                            <View style={styles.closeButton}>
                                <ActivityIndicator size={20} color={Colors.primary} />
                            </View>
                            :
                            <TouchableOpacity disabled={loadings?.users} activeOpacity={0.7} style={styles.closeButton} onPress={refresh}>
                                <AntDesign name={'reload1'} size={20} color={Colors.primary} />
                            </TouchableOpacity>
                        }
                    </View>
                    <FlatList
                        data={loadings?.users ? [] : foremen}
                        keyExtractor={(item, index) => '#' + index.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    />
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
    header: {
        flexDirection: 'row-reverse',
        width: '100%',
        justifyContent: 'space-between'
    },
    closeButton: {
        padding: 10,
        alignSelf: 'flex-end',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        padding: 10,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
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
    text: {
        color: Colors.black,
        fontFamily: 'light'
    }
})