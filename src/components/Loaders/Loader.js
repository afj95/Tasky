import React from "react";
import { View, Dimensions } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../../utils/Colors";

const { width, height } = Dimensions.get("window");

const Loader = (props) => {
  return (
    <View
      style={{
        position: "absolute",
        flex: 1,
        width,
        height: props.height || height,
        backgroundColor: props.bg || "rgba(128, 129, 130, 0.2)",
        zIndex: 1001,
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  );
};

export default Loader;
