import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import { TouchableOpacity } from '../../../components/UI/TouchableOpacity';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../../utils/Colors';
import { navigate } from '../../../navigation/RootNavigation';
import MyText from '../../../components/UI/MyText';

export const ProjectItem = ({ item, index }) => {

    const onProjectPressed = (item) => {
        navigate('ProjectDetails', {
            screen: 'ProjectDetailsScreen',
            params: {
                project: item,
                status: item.status,
                deleted: item.deleted
            }
        })
    }

    return (
        <TouchableOpacity
            key={index}
            onPress={() => onProjectPressed(item)}
            activeOpacity={0.85}
            style={styles.projectItem}>
            <View style={styles.namesContainer}>
                <MyText numberOfLines={1} text={item?.projectName1} />
                <MyText numberOfLines={1} text={item?.projectName2} />
            </View>
            <View style={styles.tasksContainer}>
                <FontAwesome5 name={'tasks'} color={Colors.primary} />
                <MyText text={item?.tasks?.length} />
            </View>
            {item?.deleted && <View style={styles.finishedIcon} />}
            {item?.status === 'finished' && <View style={styles.deletedIcon} />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    projectItem: {
        width: 100,
        height: 125,
        borderWidth: 0.5,
        borderColor: Colors.primary,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 10,
        // Custom shadow
        elevation: 5,
        shadowColor: Colors.primary,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    namesContainer: {
        alignItems: 'center',
        marginHorizontal: 5
    },
    tasksContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    finishedIcon: {
        height: '100%',
        backgroundColor: 'red',
        width: 10,
        position: 'absolute',
        end: 10,
    },
    deletedIcon: {
        height: '100%',
        backgroundColor: 'green',
        width: 10,
        position: 'absolute',
        end: 25,
    },
})