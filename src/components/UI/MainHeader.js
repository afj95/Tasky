import React from 'react'
import {
     StyleSheet,
     View,
     Dimensions,
} from 'react-native';
import MyText from './MyText';
import Colors from '../../utils/Colors';
import { goBack } from '../../navigation/RootNavigation';
import { Appbar as RNAppbar } from 'react-native-paper';

const { height } = Dimensions.get("screen");

export const MainHeader = ({ title, translate = true, showGoBack = false }) => {

     return (
          <View style={styles.container}>
               {showGoBack ?
                    <RNAppbar.BackAction size={25} style={styles.backButton} color={Colors.appWhite} onPress={() => goBack()} />
                    : <View style={{ height: 25, width: 25 }} />}
               {translate == true ? <MyText style={styles.title}>{title}</MyText> : <MyText style={styles.title} text={title} />}
               <View />
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          width: '100%',
          paddingTop: height > 600 ? 55 : 10,
          paddingHorizontal: 10,
          paddingBottom: 12.5,
          backgroundColor: Colors.primary,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomEndRadius: 10,
          borderBottomStartRadius: 10,
     },
     backButton: { padding: 2, margin: 0, height: 25, width: 25 },
     title: {
          fontSize: 20,
          fontFamily: 'bold',
          color: Colors.appWhite,
          alignSelf: 'center'
     },
})