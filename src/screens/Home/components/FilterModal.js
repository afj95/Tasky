import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../../../utils/Colors';
import MyText from '../../../components/UI/MyText';
import { TouchableOpacity } from '../../../components/UI/TouchableOpacity';
import { Fontisto } from '@expo/vector-icons';

export const FilterModal = ({ visible, close, status, setStatus, deleted, setDeleted }) => {

    const changeBackColor = (type, number) => {
        return {
            marginVertical: 10,
            backgroundColor: type === number ? Colors.secondary : Colors.appWhite,
            borderRadius: 3,
            padding: 5
        }
    }

    const changeStatus = () => {
        setStatus(status === 'active' ? 'finished' : 'active')
        close()
    }

    const changeDeleted = () => {
        setDeleted(!deleted)
        close()
    }

    const withoutDeleted = () => changeDeleted()

    return (
        <Modal
            swipeThreshold={10}
            isVisible={visible}
            style={styles.modal}
            onBackdropPress={close}
            onSwipeComplete={close}
            onBackButtonPress={close}
            animationIn={'slideInUp'}
            animationInTiming={500}
            animationOutTiming={500}
            swipeDirection={'down'}
            useNativeDriver>
            <View style={styles.contentView}>
                <View style={styles.header}>
                    <MyText style={styles.headerText}>projectsFilter</MyText>
                </View>
                <View style={styles.undeletedContainer}>
                    <Fontisto
                        name={deleted ? 'checkbox-passive' : 'checkbox-active'}
                        size={20}
                        onPress={withoutDeleted}
                        color={Colors.primary}
                    />
                    <MyText style={styles.undeletedText}>notDeletedSupervisors</MyText>
                </View>
                <TouchableOpacity
                    style={changeBackColor(status === 'active' ? 1 : 2, 1)}
                    onPress={changeStatus}>
                    <MyText style={styles.filterItemText}>
                        active
                    </MyText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={changeBackColor(status === 'active' ? 2 : 1, 1)}
                    onPress={changeStatus}>
                    <MyText style={styles.filterItemText}>
                        finished
                    </MyText>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    style={changeBackColor(deleted === true ? 2 : 1, 2)}
                    onPress={changeDeleted}>
                    <MyText style={styles.filterItemText}>deleted</MyText>
                </TouchableOpacity> */}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: 'flex-end'
    },
    contentView: {
        width: '100%',
        backgroundColor: Colors.appWhite,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        padding: 10,
        paddingBottom: 25
    },
    header: {
        height: 40,
        borderBottomWidth: 0.5,
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontFamily: 'bold',
        color: Colors.primary,
        fontSize: 18,
    },
    undeletedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    undeletedText: {
        fontFamily: 'bold',
        color: Colors.primary,
        marginStart: 5
    },
    filterItem: {
        marginVertical: 10,
    },
    filterItemText: {
        fontFamily: 'bold'
    }
})