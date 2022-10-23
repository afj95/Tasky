import React from "react";
import { Text, StyleSheet, View, TextStyle, StyleProp } from "react-native";
import { t } from "../../i18n";
import Colors from '../../utils/Colors';

type MyTextProps = {
  text?: string | undefined;
  style?: StyleProp<TextStyle>;
  hide?: boolean | undefined;
  children?: React.ReactNode;
}

type AllProps = MyTextProps & Text['props']

const MyText = (props: AllProps) => {
  const textStyle = [
    styles.text,
    props.style,
  ]
  // @ts-ignore
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text
        style={textStyle}
        {...props}>
        {props.hide ? '******' :
          props.text === undefined ? t(`app.${props.children}`) : props.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: Colors.text,
    marginVertical: 3,
    textAlign: 'left'
  },
});

export default MyText;
