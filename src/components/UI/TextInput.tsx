import React from 'react'
import Colors from '../../utils/Colors'
import { TextInput as RNTextInput, TextInputProps } from 'react-native-paper';
import { StyleSheet } from 'react-native'

const TextInput = (props: TextInputProps) => {
     const inputTheme = {
          colors: {
               text: Colors.primary,
               error: '#B22323',
               primary: Colors.primary
          },
          roundness: 8
     }

     return (
          <RNTextInput
               style={styles.input}
               mode={'flat'}
               theme={inputTheme}
               underlineColorAndroid='rgba(255, 255, 255, 255)'
               selectionColor={Colors.secondary}
               {...props}
          />
     )
}

const styles = StyleSheet.create({
     input: {
          width: 80,
          height: 40,
          marginVertical: 5,
          justifyContent: 'center',
          backgroundColor: Colors.appWhite,
          fontFamily: 'bold',
          borderWidth: 0.5,
          borderColor: Colors.primary,
          borderRadius: 8,
          overflow: 'hidden',
     },
})

export default TextInput;