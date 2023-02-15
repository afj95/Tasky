import { showMessage as flashShowMessage, Icon, MessageType, MessageOptions } from "react-native-flash-message";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

export const showMessage = (props: {
     message: string;
     type: MessageType;
     icon?: Icon;
     titleStyle?: StyleProp<TextStyle>;
     duration?: number;
     style?: StyleProp<ViewStyle>;
} | MessageOptions) => {
     const titleMainStyle: StyleProp<TextStyle> = { fontFamily: 'bold', fontSize: 15, textAlign: 'auto', marginStart: 10 };
     const mainStyle: StyleProp<ViewStyle> = { paddingTop: statusBarHeight, borderBottomStartRadius: 8, borderBottomEndRadius: 8 };
     flashShowMessage({
          message: props.message,
          type: props.type,
          icon: props.icon || 'auto',
          titleStyle: props.titleStyle || titleMainStyle,
          duration: props.duration || 3000,
          style: props.style || mainStyle,
          ...props
     })
}