import React from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    I18nManager,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import MyText from '../../../components/UI/MyText';
import _ from 'underscore';
import Colors from '../../../utils/Colors';
import Modal from 'react-native-modal';

export const StatusesModal = ({ modalVisible, onSelect, closeModal }) => {

    const statuses = [
        {
            name_en: 'active',
            name_ar: 'جاري'
        },
        {
            name_en: 'finished',
            name_ar: 'منتهي'
        },
        {
            name_en: 'preparing',
            name_ar: 'تحت التجهيز'
        },
        {
            name_en: 'ready',
            name_ar: 'جاهز للعمل'
        },
    ]

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
                <MyText style={styles.text} text={I18nManager.isRTL ? item.name_ar : item.name_en} />
            </TouchableOpacity>
        )
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
                    <AntDesign
                        name={'close'}
                        size={20}
                        color={Colors.primary}
                        style={styles.closeButton}
                        onPress={closeModal}
                    />
                    <FlatList
                        data={statuses}
                        keyExtractor={(item, index) => '#' + index.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
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
        padding: 10,
        alignSelf: 'flex-end',
    },
    container: {
        padding: 10,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
    },
    text: {
        color: Colors.primary,
        fontFamily: 'light',
        fontSize: 16
    }
})