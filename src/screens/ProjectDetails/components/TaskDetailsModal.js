import { AntDesign } from '@expo/vector-icons';
import React from 'react'
import {
    View,
    Modal,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import MyText from '../../../components/UI/MyText';
import Colors from '../../../utils/Colors';

export const TaskDetailsModal = ({ task, visible, closeModal }) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/* Content of modal */}
                        <View style={styles.closeButton}>
                            <AntDesign
                                name={'closecircle'}
                                size={24}
                                color={Colors.black}
                                onPress={() => closeModal()}
                            />
                        </View>
                        <MyText text={`${task?.task}`} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
        backgroundColor: Colors.white,
        backgroundColor: 'red',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        padding: 10,
        height: '60%',
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    closeButton: {
        width: '100%',
    }
});
  