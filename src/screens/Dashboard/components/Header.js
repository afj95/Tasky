import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image
} from 'react-native';
import MyText from '../../../components/UI/MyText';
import Colors from '../../../utils/Colors';

export const Header = ({ user }) => {
    return (
        <>
            <View style={styles.header}>
                <View style={styles.profileContainer}>
                    {user?.image ?
                        <Image
                            source={{ uri: user?.image }}
                            style={styles.profile}
                        />
                        :
                        <Ionicons name={'person'} color={Colors.primary} size={35} />
                    }
                </View>
                <View>
                    <MyText style={styles.name} text={user?.name} />
                    <MyText style={styles.title}>dashboardScreen</MyText>
                </View>
            </View>
            <View style={styles.seperator} />
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8,
        flexDirection: 'row-reverse'
    },
    profileContainer: {
        borderWidth: 2,
        borderColor: Colors.primary,
        width: 50, height: 50,
        borderRadius: 25,
        padding: 5,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile: { width: '100%', height: '100%' },
    name: {
        color: Colors.primary,
        fontSize: 15
    },
    title: {
        fontSize: 18,
        fontFamily: 'bold'
    },
    seperator: {
        height: 0.5,
        backgroundColor: Colors.secondary,
        width: '95%',
        alignSelf: 'center'
    }
})