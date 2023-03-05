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
     editTaskContainer: {
          flex: 1,
          backgroundColor: Colors.appWhite
     },
     container: {
          flex: 1
     },
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
          paddingBottom: 15,
          maxHeight: '75%',
     },
     header: {
          paddingVertical: 8,
          borderBottomWidth: 0.5,
          borderColor: Colors.primary,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
     },
     taskId: { marginEnd: 5, color: Colors.primary, fontFamily: 'light' },
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
          padding: 5,
          borderRadius: 8
     },
     prioritySquare: task => ({
          backgroundColor: alphaColors[task?.priority],
          height: 30,
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
          borderRadius: 8
     },
     taskText: (checked) => ({
          textAlign: 'left',
          textDecorationLine: checked ? 'line-through' : 'none',
          textDecorationColor: Colors.text,
          color: checked ? Colors.primary : Colors.text,
          textDecorationStyle: 'solid',
          alignSelf: 'flex-start',
          fontSize: 15,
          fontFamily: 'light'
     }),
     checkContainer: {
          alignSelf: 'center',
          width: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          borderRadius: 8
     },
     materialsContainer: {
          borderRadius: 8,
          marginTop: 5,
          backgroundColor: Colors.white,
          width: '100%',
          alignSelf: 'center',
          paddingBottom: 8,
          paddingTop: 5,
     },
     materialsLabelContainer: {
          paddingHorizontal: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row'
     },
     label: {
          fontFamily: 'bold',
          color: Colors.primary
     },
     dynamicFieldsComponent: {
          paddingTop: 5,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginHorizontal: 5
     },
     dynamicInputsContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
     },
     watchMore: {
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-end',
          padding: 2,
          borderWidth: 1,
          borderColor: Colors.primary,
          borderRadius: 8,
     },
     watchMoreText: {
          fontFamily: 'light',
          fontSize: 12,
          color: Colors.primary,
     },
     addMaterialContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
          marginHorizontal: 10,
          borderRadius: 8,
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
     inputContainer: {
          marginTop: 5,
          backgroundColor: Colors.white,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 5,
          paddingHorizontal: 5,
          borderRadius: 8
     },
     input: {
          width: 85,
          height: 40,
          marginVertical: 5,
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
     }
});