import { showMessage as flashShowMessage, Icon, MessageType, MessageOptions } from "react-native-flash-message";
import { StyleProp, TextStyle, ViewStyle, StatusBar } from "react-native";

export const showMessage = (props: {
     message: string;
     type: MessageType;
     icon?: Icon;
     titleStyle?: StyleProp<TextStyle>;
     duration?: number;
     style?: StyleProp<ViewStyle>;
} | MessageOptions) => {
     flashShowMessage({
          message: props.message,
          type: props.type,
          icon: props.icon || 'auto',
          titleStyle: props.titleStyle || { textAlign: 'auto', marginStart: 10 },
          duration: props.duration || 3000,
          style: props.style || { paddingTop: StatusBar.currentHeight, borderBottomStartRadius: 8, borderBottomEndRadius: 8 },
          ...props
     })
}