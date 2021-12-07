import React, { useState, useCallback } from 'react'
import {
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Text,
    FlatList
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { Searchbar } from 'react-native-paper';
import MyText from '../../../components/UI/MyText';
import _ from 'underscore';

const supervisors = [
    {
        name: "Ahmad"
    },
    {
        name: "Mohammed"
    },
]

export const SupervisorsModal = ({ modalVisible, onSelect, closeModal }) => {

    // const closeModal = () => setModalVisible(!modalVisible)

    // const onChangeText = useCallback((value) => {
    //     const debounce = _.debounce(() => {
    //         // dispatch(searchMember(value));
    //         return;
    //     }, 200)
    //     if(value == '') {
    //         // dispatch(resetSearchList());
    //     } else {
    //         debounce();
    //     }
    // }, [])

    const onItemPressed = async (item) => {
        await onSelect(item);
        closeModal();
    }

    const renderItem = useCallback(({ item, index }) => {
        return (
            <TouchableOpacity
                key={index.toString()}
                style={styles.item}
                activeOpacity={0.5}
                onPress={() => onItemPressed(item)}>
                <MyText text={item?.name} />
            </TouchableOpacity>
        )
    }, [])

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}>
        <View style={styles.centeredView}>
          <Animatable.View duration={800} animation='fadeInUp' style={styles.modalView}>
            <TouchableOpacity activeOpacity={0.7} style={styles.closeButton} onPress={closeModal}>
                <AntDesign name={'closecircle'} size={20} color={'black'} />
                <MyText>close</MyText>
            </TouchableOpacity>
                <FlatList
                    data={supervisors || []}
                    keyExtractor={(item, index) => '#' + index.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
          </Animatable.View>
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
        backgroundColor: 'white',
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
        borderBottomWidth: 1,
        borderColor: '#a1a1a1',
        width: '100%',
        height: 30,
        marginVertical: 10,
        alignSelf: 'center'
    },
})