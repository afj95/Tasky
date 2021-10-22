import React from "react";
import { View, Dimensions } from "react-native";
import { ActivityIndicator } from "react-native-paper";

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
      <ActivityIndicator size='large' color={'#000'} />
    </View>
  );
};

export default Loader;
