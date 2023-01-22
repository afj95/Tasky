import { StyleSheet } from 'react-native'
import Colors from '../../../utils/Colors';

const alphaColors = {
     high: 'rgba(255, 0, 0, 0.5)',
     mid: 'rgba(255, 255, 0, 0.5)',
     low: 'rgba(0, 128, 0, 0.5)'
}

const colors = {
     high: 'rgba(255, 0, 0, 1)',
     mid: 'rgba(255, 255, 0, 1)',
     low: 'rgba(0, 128, 0, 1)'
}

export const styles = StyleSheet.create({
     modal: {
          margin: 0,
          justifyContent: 'flex-end'
     },
     contentView: loading => ({
          width: '100%',
          height: loading ? '50%' : undefined,
          backgroundColor: Colors.appWhite,
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
          padding: 10,
          paddingBottom: 15
     }),
     header: {
          height: 40,
          borderBottomWidth: 0.5,
          borderColor: Colors.primary,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
     },
     headerText: {
          fontFamily: 'bold',
          color: Colors.primary,
          fontSize: 18,
     },
     priorityContainer: {
          marginTop: 5,
          backgroundColor: Colors.white,
          flexDirection: 'row-reverse',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 5
     },
     prioritySquare: task => ({
          backgroundColor: alphaColors[task?.priority],
          height: 30,
          width: '30%',
          borderRadius: 4,
          alignItems: 'center',
          paddingHorizontal: 5,
          flexDirection: 'row-reverse',
          alignSelf: 'flex-end'
     }),
     priorityCircle: task => ({
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: colors[task?.priority],
          marginStart: 20
     }),
     priorityText: {
          fontFamily: 'bold',
          fontSize: 16
     },
     dateText: {
          fontFamily: 'bold',
          fontSize: 16,
          color: Colors.primary
     },
     titleContainer: {
          marginTop: 5,
          backgroundColor: Colors.white,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 5,
          paddingHorizontal: 5,
     },
     taskText: (checked) => ({
          textDecorationLine: checked ? 'line-through' : 'none',
          textDecorationColor: Colors.text,
          color: checked ? Colors.primary : Colors.text,
          textDecorationStyle: 'solid',
          width: '80%',
          alignSelf: 'flex-start',
          fontSize: 15,
          fontFamily: 'bold'
     }),
     checkContainer: {
          alignSelf: 'center',
          width: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
     },
     inputContainer: {
          marginTop: 5,
          backgroundColor: Colors.white,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 5,
          paddingHorizontal: 5,
     },
     input: {
          width: 85,
          height: 40,
          marginTop: 5,
          justifyContent: 'center',
          backgroundColor: Colors.appWhite,
          fontFamily: 'bold',
          borderWidth: 0.5,
          borderColor: Colors.primary,
          borderRadius: 8,
          marginStart: 6,
          overflow: 'hidden'
     },
     percentageContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
     },
     percentageText: {
          fontSize: 18,
          color: Colors.primary
     },
     buttonsContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
     },
     submitButton: {
          backgroundColor: Colors.primary,
          height: 40,
          width: 140,
          borderRadius: 8,
          marginTop: 5,
          alignItems: 'center',
          justifyContent: 'center'
     },
     submitText: {
          fontFamily: 'light',
          color: Colors.appWhite,
          fontSize: 15
     },
     cancelButton: {
          backgroundColor: Colors.white,
          height: 40,
          width: 140,
          borderRadius: 8,
          marginTop: 5,
          borderColor: Colors.secondary,
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center'
     },
     cancelText: {
          fontFamily: 'light',
          color: Colors.primary,
          fontSize: 15
     },
});