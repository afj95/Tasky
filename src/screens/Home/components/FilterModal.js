import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../../../utils/Colors';
import MyText from '../../../components/UI/MyText';
import { TouchableOpacity } from '../../../components/UI/TouchableOpacity';

export const FilterModal = ({ visible, close, status, setStatus, deleted, setDeleted }) => {

    const changeStatus = () => {
        setStatus(status === 'active' ? 'finished' : 'active')
        close()
    }

    const changeDeleted = () => {
        setDeleted(!deleted)
        close()
    }

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
                <TouchableOpacity
                    style={styles.filterItem}
                    onPress={changeStatus}>
                    <MyText style={styles.filterItemText}>
                        {status === 'active' ? 'finished' : 'active'}
                    </MyText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.filterItem}
                    onPress={changeDeleted}>
                    <MyText style={styles.filterItemText}>deleted</MyText>
                </TouchableOpacity>
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
    filterItem: {
        marginVertical: 10,
    },
    filterItemText: {
        fontFamily: 'bold'
    }
})