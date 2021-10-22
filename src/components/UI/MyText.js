import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { t } from "../../i18n";
import Colors from '../../utils/Colors';

const MyText = (props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text
        selectable={props.selectable}
        style={{ ...styles.text, ...props.style }}
      >
        {props.hide ? '******' :
        props.text === undefined ? t(`app.${props.children}`) : t(`app.${props.text}`)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: Colors.text,
  },
});

export default MyText;
